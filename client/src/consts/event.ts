import { Event } from '~/types/event';
import { AVATAR_PATH } from './avatar';

export const STRIPE_API_KEY = import.meta.env.VITE_STRIPE_API_KEY;

export const PRICE_FORMAT_OPTIONS = {
  style: 'currency',
  currency: 'USD',
} as const;

export const DATE_OPTIONS = {
  month: 'long',
  day: '2-digit',
} as const;

export const DateFormatOptions = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
} as const;

export const GET_DISPLAY_EVENT = (e: Event) => {
  const initialDate = new Date(e.date);
  const date = new Intl.DateTimeFormat('en-US', DateFormatOptions).format(initialDate);
  const tickets = e.ticketsAvailable;
  return {
    ...e,
    picturePath: AVATAR_PATH(e.picturePath),
    date,
    shortDate: initialDate.toLocaleString('default', DATE_OPTIONS),
    price: Number(e.price) ? new Intl.NumberFormat('en-US', PRICE_FORMAT_OPTIONS).format(e.price) : 'free',
    availability: tickets ? `${tickets} tickets` : 'Not available',
    tickets,
  };
};

export const FALLBACK_POSTER = '/assets/event-poster.png';
