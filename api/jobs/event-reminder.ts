import { User } from '@prisma/client';
import { CronJob } from 'cron';
import { HOURS_BEFORE_EVENT } from '../consts/default';
import templates from '../consts/email';
import prisma from '../lib/prisma';
import { Email } from '../services';
import { getEventDate } from '../services/event';
import { compareDates } from '../utils/compare-dates';
import subtractHours from '../utils/subtract-hours';

const scheduleEventReminder = (tickDate: Date, eventId: number) => {
  new CronJob(
    tickDate,
    async () => {
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { visitors: { include: { user: true } }, company: true },
      });

      if (!event || !event.visitors.length) {
        return;
      }

      const { date: eventDate, name: eventName } = event;
      const visitors = event.visitors.map((visitor) => visitor.user);

      const sendRemindersDate = subtractHours(eventDate, HOURS_BEFORE_EVENT);

      if (!compareDates(tickDate, sendRemindersDate)) {
        sendReminders(eventName, getEventDate(eventDate), eventId, visitors);
      }
    },
    null,
    true,
  );
};

const sendReminders = async (
  eventName: string,
  eventDate: string,
  eventId: number,
  visitors: User[],
) => {
  visitors.forEach((visitor) => {
    Email.sendMail(visitor.email, templates.EVENT_REMINDER, {
      eventName,
      eventDate,
      hoursBeforeEvent: HOURS_BEFORE_EVENT,
      eventId,
    });
  });
};

export { scheduleEventReminder };
