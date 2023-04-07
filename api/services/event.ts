import { Prisma } from '@prisma/client';
import { DateFormatOptions } from '../consts/default';
import logger from '../lib/logger';
import prisma from '../lib/prisma';
import ClientError from '../types/error';
import { DEFAULT_SORT_OPTIONS, getSortOptions, QueryParams } from '../utils/query-options';

const event = prisma.event;
const eventFormat = prisma.eventFormat;
const eventTheme = prisma.eventTheme;

type FilterAttributes = {
  id?: string | string[];
  companyId?: string | string[];
  formatId?: string | string[];
  themeId?: string | string[];
  userId?: string;
  upcoming?: boolean;
  notPublished?: boolean;
  dateFrom?: string;
  dateTo?: string;
  q?: string;
};

const convertQueryParamToNumArr = (param: string | string[]): number[] => {
  return Array.isArray(param) ? param.map((item) => Number(item)) : [Number(param)];
};

export const getEventDate = (initialDate: Date) => {
  const date = new Date(initialDate);
  return new Intl.DateTimeFormat('en-US', DateFormatOptions).format(date);
};

const EventService = {
  async findEventIfExists(eventId: number) {
    try {
      return await event.findUniqueOrThrow({
        where: { id: eventId },
        include: { format: true, theme: true },
      });
    } catch (_e) {
      throw new ClientError("The event doesn't exist!", 404);
    }
  },

  async isUsersQueryAllowed(eventId: number, userId: number | undefined) {
    const e = await event.findFirst({
      where: {
        id: eventId,
        OR: [
          {
            visitors: {
              some: {
                userId: userId || -1,
              },
            },
          },
          { isPublic: true },
        ],
      },
    });

    const isAllowed = e !== null;
    !isAllowed && logger.warn("You are not allowed to view the event's visitors");

    return isAllowed;
  },

  async checkUniqueEventName(name: string, notId: number = 0) {
    const exists = await event.findFirst({
      where: {
        name,
        NOT: {
          id: notId,
        },
      },
    });
    if (exists) {
      throw new ClientError('The event with this name already exists.', 400);
    }
  },

  async checkEventFormatExists(formatId: number) {
    try {
      await eventFormat.findUniqueOrThrow({ where: { id: formatId } });
    } catch (_e) {
      throw new ClientError("The event format doesn't exist!", 400);
    }
  },

  async checkEventThemeExists(themeId: number) {
    try {
      await eventTheme.findUniqueOrThrow({ where: { id: themeId } });
    } catch (_e) {
      throw new ClientError("The event theme doesn't exist!", 400);
    }
  },

  getEventsSortOptions(params: QueryParams, defaultSort: string): any {
    const { _sort, _order } = params;
    const relationProperties: string[] = ['theme', 'format'];

    if (!_sort || !_order) {
      return DEFAULT_SORT_OPTIONS(defaultSort);
    }

    if (relationProperties.includes(_sort)) {
      return {
        orderBy: {
          [_sort]: {
            name: _order.toLowerCase(),
          },
        },
      };
    }

    return getSortOptions(params, defaultSort);
  },

  getEventsWhereOptions(queryParams: FilterAttributes) {
    const where: Prisma.EventWhereInput = {};
    const {
      userId,
      id,
      companyId,
      themeId,
      formatId,
      q,
      upcoming,
      dateFrom,
      dateTo,
      notPublished,
    } = queryParams;

    if (id) {
      where.id = { in: convertQueryParamToNumArr(id) };
    }
    if (companyId) {
      where.companyId = Number(companyId);
    }
    if (formatId) {
      where.formatId = Number(formatId);
    }
    if (themeId) {
      where.themeId = Number(themeId);
    }
    if (userId) {
      where.visitors = {
        some: { userId: Number(userId) },
      };
    }
    if (q) {
      where.name = { contains: q };
    }
    if ((dateFrom && dateTo) || upcoming) {
      where.publishDate = {
        lte: new Date().toISOString(),
      };
    }
    if (dateFrom && dateTo) {
      where.date = {
        gte: new Date(dateFrom).toISOString(),
        lte: new Date(dateTo).toISOString(),
      };
    } else if (upcoming) {
      where.date = { gte: new Date().toISOString() };
    }
    if (notPublished) {
      where.publishDate = {
        gte: new Date().toISOString(),
      };
    }

    return where;
  },
};

export default EventService;
