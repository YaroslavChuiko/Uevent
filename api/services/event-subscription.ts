import { UserEvent, Event } from '@prisma/client';
import templates from '../consts/email';
import { TICKETS_UNLIMITED } from '../consts/payment';
import prisma from '../lib/prisma';
import ClientError from '../types/error';
import Email from './email';
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
  async check(event: Event, userId: number) {
    await this.checkIfConnected(event.id, userId);
    this.checkTicketAvailability(event);
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

    await Email.sendMail(creator.email, templates.NEW_EVENT_VISITOR, {
      eventName: event.name,
      visitorName: visitor.fullName,
    });

    await Email.sendMail(visitor.email, templates.EVENT_SUBSCRIPTION, {
      eventName: event.name,
      eventDate: new Date(event.date).toDateString(),
    });
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

  checkTicketAvailability(event: Event) {
    const tickets = event.ticketsAvailable;

    if (tickets <= 0 && tickets !== TICKETS_UNLIMITED) {
      throw new ClientError('No tickets are available for this event', 403);
    }
  },

  async updateEventTickets(eventId: number, tickets: number) {
    await events.update({
      where: { id: eventId },
      data: { ticketsAvailable: tickets },
    });
  },

  async connectUser(data: UserEvent) {
    const { eventId: id, userId, isVisible } = data;

    await events.update({
      where: { id },
      data: {
        users: {
          create: { userId, isVisible },
        },
      },
    });
  },
};

export default EventSubscription;
