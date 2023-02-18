import { User } from '@prisma/client';
import { CronJob } from 'cron';
import templates from '../consts/email';
import prisma from '../lib/prisma';
import { Email } from '../services';
import { compareDates } from '../utils/compare-dates';

const scheduleCompanySubscribersNotification = (tickDate: Date, eventId: number) => {
  console.log('tickDate', tickDate.toString());

  new CronJob(
    tickDate,
    async () => {
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { company: { include: { subscribers: { include: { user: true } } } } },
      });

      if (!event || !event.company.subscribers.length) {
        return;
      }

      const { publishDate, name: eventName } = event;
      const companyName = event.company.name;
      const subscribers = event.company.subscribers.map((subscriber) => subscriber.user);

      if (!compareDates(tickDate, publishDate)) {
        notifyCompanySubscribers(companyName, eventName, subscribers);
      }
    },
    null,
    true,
  );
};

const notifyCompanySubscribers = async (
  companyName: string,
  eventName: string,
  subscribers: User[],
) => {
  subscribers.forEach((subscriber) => {
    Email.sendMail(subscriber.email, templates.EVENT_PUBLISHED, {
      eventName,
      companyName,
    });
  });
};

export { scheduleCompanySubscribersNotification };
