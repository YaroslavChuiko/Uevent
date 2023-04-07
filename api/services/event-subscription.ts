import { UserEvent, Event } from '@prisma/client';
import templates from '../consts/email';
import { TICKETS_UNLIMITED } from '../consts/payment';
import prisma from '../lib/prisma';
import ClientError from '../types/error';
import Email from './email';
import EventService, { getEventDate } from './event';
import UserService from './user';

const events = prisma.event;
const eventUsers = prisma.userEvent;

export interface IEventMeta {
  metadata: {
    eventId: string;
    userId: string;
    isVisible: string;
  };
}

const eventObjectToUserEvent = ({ metadata: m }: IEventMeta): UserEvent => ({
  eventId: JSON.parse(m.eventId),
  userId: JSON.parse(m.userId),
  isVisible: JSON.parse(m.isVisible),
});

const EventSubscription = {
  async check(eventId: number, userId: number) {
    await this.checkIfConnected(eventId, userId);
    await this.checkTicketAvailability(eventId);
  },

  async handleWith(eventMeta: IEventMeta) {
    const data = eventObjectToUserEvent(eventMeta);

    await this.connectUser(data);

    const [event, visitor] = await Promise.all([
      this.getEventCreator(data.eventId),
      UserService.findOrThrow(data.userId),
    ]);
    const creator = event.company;

    if (event.ticketsAvailable !== TICKETS_UNLIMITED) {
      await this.updateEventTickets(event.id, event.ticketsAvailable - 1);
    }

    const mailToCreator = Email.sendMail(creator.email, templates.NEW_EVENT_VISITOR, {
      eventName: event.name,
      visitorName: visitor.fullName,
      eventId: event.id,
    });

    const mailToVisitor = Email.sendMail(visitor.email, templates.EVENT_SUBSCRIPTION, {
      eventName: event.name,
      eventDate: getEventDate(event.date),
      eventId: event.id,
    });

    await Promise.all([mailToCreator, mailToVisitor]);
  },

  async getEventCreator(eventId: number) {
    const event = await events.findUnique({
      where: { id: eventId },
      include: {
        company: true,
      },
    });
    if (!event) {
      throw new ClientError('The event was not found.', 404);
    }
    return event;
  },

  async checkIfConnected(eventId: number, userId: number) {
    const exists = await eventUsers.findUnique({
      where: {
        userId_eventId: { userId, eventId },
      },
    });
    if (exists) {
      throw new ClientError('You are already subscribed to this event.', 400);
    }
  },

  async checkTicketAvailability(eventId: number) {
    const event = await EventService.findEventIfExists(eventId);
    const tickets = event.ticketsAvailable;

    if (tickets <= 0 && tickets !== TICKETS_UNLIMITED) {
      throw new ClientError('No tickets are available for this event', 403);
    }
  },

  async updateEventTickets(eventId: number, ticketsAvailable: number) {
    await events.update({
      where: { id: eventId },
      data: { ticketsAvailable },
    });
  },

  async connectUser(data: UserEvent) {
    const { eventId: id, userId, isVisible } = data;

    await events.update({
      where: { id },
      data: {
        visitors: {
          create: { userId, isVisible },
        },
      },
    });
  },
};

export default EventSubscription;
