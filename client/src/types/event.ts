import { Order } from './order';

export type Event = {
  id: number;
  name: string;
  description: string;
  picturePath: string;
  latitude: number;
  longitude: number;
  price: number;
  ticketsAvailable: number;
  date: string;
  publishDate: string;
  isPublic: boolean;
  isNotificationsOn: boolean;
  companyId: number;
  formatId: number;
  themeId: number;
  format: {
    id: number;
    name: string;
  };
  theme: {
    id: number;
    name: string;
  };
};

export type EventsResponse = {
  events: Event[];
  totalCount: number;
};

export type EventsParam = {
  _start?: number;
  _end?: number;
  _sort?: string;
  _order?: Order;
  id?: number;
  upcoming?: boolean;
  notPublished?: boolean;
  companyId?: number;
  formatId?: number;
  themeId?: number;
  userId?: number;
  dateFrom?: string;
  dateTo?: string;
  q?: string;
};

export type SubscriptionResponse = {
  sessionId: number;
};
