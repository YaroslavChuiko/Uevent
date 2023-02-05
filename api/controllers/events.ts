import { Event } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import ClientError from '../types/error';

const createEvent = async (req: Request, res: Response) => {
  const data = req.body;
  const companyId = Number(req.params.id);

  await checkUniqueEventName(data.name);
  await checkEventFormatExists(data.formatId);
  await checkEventThemeExists(data.themeId);

  const newEvent = await prisma.event.create({
    data: {
      ...data,
      picturePath: req.file?.filename,
      companyId,
    },
  });

  res.status(201).json(newEvent);
};

const checkUniqueEventName = async (name: string) => {
  const exists = await prisma.event.findUnique({ where: { name } });
  if (exists) {
    throw new ClientError('The event with this name already exists.', 400);
  }
};

//! two same functions mb try to optimize them
const checkEventFormatExists = async (formatId: number) => {
  try {
    await prisma.eventFormat.findUniqueOrThrow({ where: { id: formatId } });
  } catch (_e) {
    throw new ClientError("The event format doesn't exist!", 400);
  }
};

const checkEventThemeExists = async (themeId: number) => {
  try {
    await prisma.eventTheme.findUniqueOrThrow({ where: { id: themeId } });
  } catch (_e) {
    throw new ClientError("The event theme doesn't exist!", 400);
  }
};

const getOneEventById = async (req: Request, res: Response) => {
  const eventId: number = Number(req.params.id);

  const event: Event = await findEventIfExist(eventId);

  res.status(200).json(event);
};

const findEventIfExist = async (id: number) => {
  let event: Event;

  try {
    event = await prisma.event.findUniqueOrThrow({
      where: { id },
      include: { format: true, theme: true },
    });
  } catch (_e) {
    throw new ClientError("The event doesn't exist!", 400);
  }

  return event;
};

const getManyEvents = async (req: Request, res: Response) => {
  const where = buildWhereOption(req.query);
  const pagination = buildPaginationOption(req.query);
  const sorting = buildSortingOption(req.query);

  const [events, count] = await prisma.$transaction([
    prisma.event.findMany({
      ...where,
      ...pagination,
      ...sorting,
      include: { format: true, theme: true },
    }),
    prisma.event.count({ ...where }),
  ]);

  res.setHeader('X-Total-Count', count);
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  res.status(200).json(events);
};

const buildWhereOption = (queryParams: any) => {
  const format = convertQueryParamToNumArr(queryParams.format);
  const theme = convertQueryParamToNumArr(queryParams.theme);

  return buildWhereOptionFromAttributes({ format, theme });
};

const convertQueryParamToNumArr = (param: string): number[] => {
  let arr: number[] = [];

  if (param) {
    arr = param.split(',').map((item) => Number(item));
  }

  return arr;
};

type WhereOptionAttributes = {
  format: number[];
  theme: number[];
};

const buildWhereOptionFromAttributes = (attributes: WhereOptionAttributes) => {
  const option = { where: {} };

  for (const key in attributes) {
    (option.where as any)[`${key}Id`] = { in: (attributes as any)[key] };
  }

  return option;
};

const buildPaginationOption = (queryParams: any) => {
  const limit = Number(queryParams.limit);
  const cursor = Number(queryParams.cursor);

  // first request without cursor
  if (cursor) {
    return {
      take: limit,
      skip: 1,
      cursor: {
        id: cursor,
      },
    };
  }

  return {
    take: limit,
  };
};

const buildSortingOption = (queryParams: any): any => {
  // doesn't work without :any
  const sort = (queryParams.sort as string) || 'id';
  const order = (queryParams.order as string) || 'asc';

  // sort by properties of a relation
  if (sort === 'format' || sort === 'theme') {
    return {
      orderBy: {
        [sort]: {
          name: order.toLowerCase(),
        },
      },
    };
  }

  return {
    orderBy: {
      [sort]: order.toLowerCase(),
    },
  };
};

const updateEvent = async (req: Request, res: Response) => {
  const data = req.body;
  const eventId = Number(req.params.eventId);

  await checkUniqueEventName(data.name);
  await checkEventFormatExists(data.formatId);
  await checkEventThemeExists(data.themeId);

  const updatedEvent = await updateEventIfExist(eventId, data, req.file?.filename);

  res.json(updatedEvent);
};

const updateEventIfExist = async (id: number, data: any, filename?: string) => {
  let updatedEvent: Event;

  let { deleteAvatar, ...eventData } = data;

  deleteAvatar = deleteAvatar ? null : undefined;

  try {
    updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        ...eventData,
        picturePath: filename || deleteAvatar,
      },
      include: { format: true, theme: true },
    });
  } catch (_e) {
    throw new ClientError("The event doesn't exist!", 400);
  }

  return updatedEvent;
};

const deleteEvent = async (req: Request, res: Response) => {
  const eventId = Number(req.params.eventId);

  const deletedEvent = await deleteEventIfExist(eventId);

  res.json(deletedEvent);
};

const deleteEventIfExist = async (id: number) => {
  let deletedEvent: Event;

  try {
    deletedEvent = await prisma.event.delete({
      where: { id },
      include: { format: true, theme: true },
    });
  } catch (_e) {
    throw new ClientError("The event doesn't exist!", 400);
  }

  return deletedEvent;
};

export { createEvent, getOneEventById, getManyEvents, updateEvent, deleteEvent };
