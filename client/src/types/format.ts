import { Order } from './order';

export type Format = {
  id: number;
  name: string;
};

export type FormatsResponse = {
  formats: Format[];
  totalCount: number;
};

export type FormatsParam = {
  _start: number;
  _end: number;
  _sort?: string;
  _order?: Order;
  id?: number;
  q?: string;
};
