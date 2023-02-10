import { Prisma } from '@prisma/client';
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
  q?: string;
};

const convertQueryParamToNumArr = (param: string | string[]): number[] => {
  return Array.isArray(param) ? param.map((item) => Number(item)) : [Number(param)];
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
    const { id, companyId, themeId, formatId, q } = queryParams;

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
    if (q) {
      where.name = { contains: q };
    }

    return where;
  },
};

export default EventService;
