import { Order } from './order';

export type Company = {
  id: number;
  name: string;
  email: string;
  picturePath: string;
  latitude: number;
  longitude: number;
  userId: number;
  stripeId: string | null;
  isAccountCompleted: boolean | null;
};

export type StripeLink = {
  url: string;
};

export type CompaniesResponse = {
  companies: Company[];
  totalCount: number;
};

export type CompaniesParam = {
  _start: number;
  _end: number;
  _sort?: string;
  _order?: Order;
  id?: number;
  creatorId?: number;
  subscriberId?: number;
  q?: string;
};

export type SubscriptionResponse = {
  companyId: number;
};
