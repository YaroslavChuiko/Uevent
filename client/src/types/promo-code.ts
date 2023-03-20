import { Order } from './order';

export type PromoCode = {
  id: number;
  promoCode: string;
  discount: number;
  eventId: number;
};

export type PromoCodesResponse = {
  promoCodes: PromoCode[];
  totalCount: number;
};

export type PromoCodesParam = {
  _start: number;
  _end: number;
  _sort?: string;
  _order?: Order;
  id?: number;
  eventId?: number;
  q?: string;
};

export type CreatePromoCodesPayload = {
  promoCode: string;
  discount: number;
  eventId: number;
};
