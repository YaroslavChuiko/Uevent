import { Request, Response } from 'express';
import { scheduleCompanySubscribersNotification } from '../jobs/company-subscribers-notification';
import prisma from '../lib/prisma';
import ClientError from '../types/error';
import { compareDates } from '../utils/date';
import {
  getEventsSortOptions,
  getEventsWhereOptions,
  getPageOptions,
} from '../utils/query-options';

const event = prisma.event;
const eventFormat = prisma.eventFormat;
const eventTheme = prisma.eventTheme;

const createEvent = async (req: Request, res: Response) => {
  const data = req.body;
  const { publishDate } = data;
  const companyId = Number(req.params.id);

  await Promise.all([
    checkUniqueEventName(data.name),
    checkEventFormatExists(data.formatId),
    checkEventThemeExists(data.themeId),
  ]);

  const newEvent = await event.create({
    data: {
      ...data,
      companyId,
    },
  });

  scheduleCompanySubscribersNotification(new Date(publishDate), newEvent.id, companyId);

  res.status(201).json(newEvent);
};

const checkUniqueEventName = async (name: string, notId: number = 0) => {
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
};

const checkEventFormatExists = async (formatId: number) => {
  try {
    await eventFormat.findUniqueOrThrow({ where: { id: formatId } });
  } catch (_e) {
    throw new ClientError("The event format doesn't exist!", 400);
  }
};

const checkEventThemeExists = async (themeId: number) => {
  try {
    await eventTheme.findUniqueOrThrow({ where: { id: themeId } });
  } catch (_e) {
    throw new ClientError("The event theme doesn't exist!", 400);
  }
};

const getOneEventById = async (req: Request, res: Response) => {
  const eventId: number = Number(req.params.id);

  const event = await findEventIfExists(eventId);

  res.status(200).json(event);
};

const getManyEvents = async (req: Request, res: Response) => {
  const where = getEventsWhereOptions(req.query);
  const pagination = getPageOptions(req.query);
  const sort = getEventsSortOptions(req.query, 'id');

  const [events, count] = await prisma.$transaction([
    event.findMany({
      where,
      ...pagination,
      ...sort,
      include: { format: true, theme: true },
    }),
    event.count({ where }),
  ]);

  res.setHeader('X-Total-Count', count);
  res.status(200).json(events);
};

const updateEvent = async (req: Request, res: Response) => {
  const data = req.body;
  const { publishDate } = data;
  const eventId = Number(req.params.id);

  const [oldEvent] = await Promise.all([
    findEventIfExists(eventId),
    checkUniqueEventName(data.name, eventId),
    checkEventFormatExists(data.formatId),
    checkEventThemeExists(data.themeId),
  ]);

  const updatedEvent = await event.update({
    where: { id: eventId },
    data,
    include: { format: true, theme: true },
  });

  if (compareDates(new Date(publishDate), oldEvent.publishDate)) {
    scheduleCompanySubscribersNotification(new Date(publishDate), eventId, updatedEvent.companyId);
  }

  res.json(updatedEvent);
};

const findEventIfExists = async (eventId: number) => {
  try {
    return await event.findUniqueOrThrow({
      where: { id: eventId },
      include: { format: true, theme: true },
    });
  } catch (_e) {
    throw new ClientError("The event doesn't exist!", 404);
  }
};

const deleteEvent = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);

  const deletedEvent = await event.delete({
    where: { id: eventId },
    include: { format: true, theme: true },
  });

  res.json(deletedEvent);
};

const updatePoster = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);
  const picturePath = (req.file as Express.Multer.File).filename;

  const updatedEvent = await event.update({
    where: {
      id: eventId,
    },
    data: {
      picturePath,
    },
  });

  res.json(updatedEvent);
};

const deletePoster = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);

  const updatedEvent = await event.update({
    where: {
      id: eventId,
    },
    data: {
      picturePath: null,
    },
  });

  res.json(updatedEvent);
};

export {
  createEvent,
  getOneEventById,
  getManyEvents,
  updateEvent,
  deleteEvent,
  updatePoster,
  deletePoster,
};
