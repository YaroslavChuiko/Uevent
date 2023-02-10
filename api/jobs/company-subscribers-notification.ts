import { User } from '@prisma/client';
import { CronJob } from 'cron';
import templates from '../consts/email';
import prisma from '../lib/prisma';
import { Email } from '../services';
import { compareDates } from '../utils/date';

const scheduleCompanySubscribersNotification = (
  tickDate: Date,
  eventId: number,
  companyId: number,
) => {
  console.log('tickDate', tickDate.toString());

  new CronJob(
    tickDate,
    async () => {
      const [event, subscriptions] = await Promise.all([
        prisma.event.findUnique({
          where: { id: eventId },
          select: { publishDate: true, name: true },
        }),
        prisma.subscriptionToCompany.findMany({
          where: { companyId },
          include: { user: true, company: true },
        }),
      ]);

      if (!event || !subscriptions.length) {
        return;
      }

      const { publishDate, name: eventName } = event;
      const companyName = subscriptions[0].company.name;
      const subscribers = subscriptions.map((subscription) => subscription.user);

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
