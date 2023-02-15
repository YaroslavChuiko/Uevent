import { UserEvent } from '@prisma/client';
import prisma from '../lib/prisma';
import ClientError from '../types/error';

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

  async check(eventId: number, userId: number) {
    await this.checkIfConnected(eventId, userId);
  },

  async handleWith(eventMeta: IEventMeta) {
    const data = eventObjectToUserEvent(eventMeta);

    await this.connectUser(data);

    // send email
  },
};

export default EventSubscription;
