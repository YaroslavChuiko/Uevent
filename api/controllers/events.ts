import { Request, Response } from 'express';
import { scheduleCompanySubscribersNotification } from '../jobs/company-subscribers-notification';
import prisma from '../lib/prisma';
import EventService from '../services/event';
import { compareDates } from '../utils/date';
import { getPageOptions } from '../utils/query-options';

const event = prisma.event;

const createEvent = async (req: Request, res: Response) => {
  const data = req.body;
  const { publishDate } = data;
  const companyId = Number(req.params.id);

  await Promise.all([
    EventService.checkUniqueEventName(data.name),
    EventService.checkEventFormatExists(data.formatId),
    EventService.checkEventThemeExists(data.themeId),
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

const getOneEventById = async (req: Request, res: Response) => {
  const eventId: number = Number(req.params.id);

  const event = await EventService.findEventIfExists(eventId);

  res.status(200).json(event);
};

const getManyEvents = async (req: Request, res: Response) => {
  const where = EventService.getEventsWhereOptions(req.query);
  const sort = EventService.getEventsSortOptions(req.query, 'id');
  const pagination = getPageOptions(req.query);

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
    EventService.findEventIfExists(eventId),
    EventService.checkUniqueEventName(data.name, eventId),
    EventService.checkEventFormatExists(data.formatId),
    EventService.checkEventThemeExists(data.themeId),
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
