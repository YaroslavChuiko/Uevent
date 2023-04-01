import { Request, Response } from 'express';
import { scheduleCompanySubscribersNotification } from '../jobs/company-subscribers-notification';
import prisma from '../lib/prisma';
import EventService from '../services/event';
import { compareDates } from '../utils/compare-dates';
import { getPageOptions } from '../utils/query-options';
import Avatar from '../services/avatar';
import { scheduleEventReminder } from '../jobs/event-reminder';
import subtractHours from '../utils/subtract-hours';
import { HOURS_BEFORE_EVENT } from '../consts/default';
import wait from '../utils/wait';
import ClientError from '../types/error';
import CompanyService from '../services/company';

const event = prisma.event;

const createEvent = async (req: Request, res: Response) => {
  const data = req.body;
  const { publishDate, date } = data;

  if (data.price !== 0) {
    const stripeId = await CompanyService.isStripeConnected(Number(data.companyId));
    await CompanyService.checkAccountOrThrow(stripeId);
  }

  await Promise.all([
    EventService.checkUniqueEventName(data.name),
    EventService.checkEventFormatExists(data.formatId),
    EventService.checkEventThemeExists(data.themeId),
  ]);

  const newEvent = await event.create({
    data,
    include: { format: true, theme: true },
  });

  scheduleCompanySubscribersNotification(new Date(publishDate), newEvent.id);
  scheduleEventReminder(subtractHours(date, HOURS_BEFORE_EVENT), newEvent.id);

  res.status(201).json(newEvent);
};

const getOneEventById = async (req: Request, res: Response) => {
  const eventId: number = Number(req.params.id);

  const event = await EventService.findEventIfExists(eventId);

  res.status(200).json(event);
};

const getManyEvents = async (req: Request, res: Response) => {
  if (req.query.userId && req.user?.id !== Number(req.query.userId)) {
    throw new ClientError('You cannot view these events', 403);
  }

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

  await wait(2000);

  res.setHeader('X-Total-Count', count);
  res.status(200).json(events);
};

const updateEvent = async (req: Request, res: Response) => {
  const data = req.body;
  const { publishDate, date } = data;
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
    scheduleCompanySubscribersNotification(new Date(publishDate), eventId);
  }

  if (compareDates(new Date(date), oldEvent.date)) {
    scheduleEventReminder(subtractHours(date, HOURS_BEFORE_EVENT), eventId);
  }

  res.json(updatedEvent);
};

const deleteEvent = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);

  const toUpdate = await event.findUnique({ where: { id: eventId } });
  await Avatar.removeFrom(toUpdate);

  const deletedEvent = await event.delete({
    where: { id: eventId },
    include: { format: true, theme: true },
  });

  res.json(deletedEvent);
};

const updatePoster = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);
  const picturePath = (req.file as Express.Multer.File).filename;

  const toUpdate = await event.findUnique({ where: { id: eventId } });
  await Avatar.removeFrom(toUpdate);

  const updatedEvent = await event.update({
    where: {
      id: eventId,
    },
    data: {
      picturePath,
    },
    include: { format: true, theme: true },
  });

  res.json(updatedEvent);
};

const deletePoster = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);

  const toUpdate = await event.findUnique({ where: { id: eventId } });
  await Avatar.removeFrom(toUpdate);

  const updatedEvent = await event.update({
    where: {
      id: eventId,
    },
    data: {
      picturePath: null,
    },
    include: { format: true, theme: true },
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
