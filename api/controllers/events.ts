import { Event } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import ClientError from '../types/error';
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
  const companyId = Number(req.params.id);

  await checkUniqueEventName(data.name);
  await checkEventFormatExists(data.formatId);
  await checkEventThemeExists(data.themeId);

  const newEvent = await event.create({
    data: {
      ...data,
      companyId,
    },
  });

  res.status(201).json(newEvent);
};

const checkUniqueEventName = async (name: string) => {
  const exists = await event.findUnique({ where: { name } });
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

  const event: Event = await findEventIfExist(eventId);

  res.status(200).json(event);
};

const findEventIfExist = async (id: number) => {
  let found: Event;

  try {
    found = await event.findUniqueOrThrow({
      where: { id },
      include: { format: true, theme: true },
    });
  } catch (_e) {
    throw new ClientError("The event doesn't exist!", 400);
  }

  return found;
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
  const eventId = Number(req.params.eventId);

  await checkUniqueEventName(data.name);
  await checkEventFormatExists(data.formatId);
  await checkEventThemeExists(data.themeId);

  const updatedEvent = await updateEventIfExist(eventId, data);

  res.json(updatedEvent);
};

const updateEventIfExist = async (id: number, data: any) => {
  let updatedEvent: Event;

  try {
    updatedEvent = await event.update({
      where: { id },
      data,
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
    deletedEvent = await event.delete({
      where: { id },
      include: { format: true, theme: true },
    });
  } catch (_e) {
    throw new ClientError("The event doesn't exist!", 400);
  }

  return deletedEvent;
};

export { createEvent, getOneEventById, getManyEvents, updateEvent, deleteEvent };
