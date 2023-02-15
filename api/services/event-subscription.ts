import { UserEvent } from '@prisma/client';
import templates from '../consts/email';
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
  async check(eventId: number, userId: number) {
    await this.checkIfConnected(eventId, userId);
  },

  async handleWith(eventMeta: IEventMeta) {
    const data = eventObjectToUserEvent(eventMeta);

    await this.connectUser(data);

    const [event, visitor] = await Promise.all([
      this.getEventCreator(data.eventId),
      UserService.findOrThrow(data.userId),
    ]);
    const creator = event.company;

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
