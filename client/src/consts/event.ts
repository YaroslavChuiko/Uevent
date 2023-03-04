import { Event } from '~/types/event';
import { AVATAR_PATH } from './avatar';

export const PRICE_FORMAT_OPTIONS = {
  style: 'currency',
  currency: 'USD',
} as const;

export const DATE_OPTIONS = {
  month: 'long',
  day: '2-digit',
} as const;

export const GET_DISPLAY_EVENT = (e: Event) => {
  const date = new Date(e.date);
  const tickets = e.ticketsAvailable;
  return {
    ...e,
    picturePath: AVATAR_PATH(e.picturePath),
    date,
    shortDate: date.toLocaleString('default', DATE_OPTIONS),
    price: e.price ? new Intl.NumberFormat('en-US', PRICE_FORMAT_OPTIONS).format(e.price) : 'free',
    availability: tickets ? `${tickets} tickets` : 'Not available',
    tickets,
  };
};
