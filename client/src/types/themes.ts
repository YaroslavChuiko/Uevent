import { Order } from './order';

export type Theme = {
  id: number;
  name: string;
};

export type ThemesResponse = {
  themes: Theme[];
  totalCount: number;
};

export type ThemesParam = {
  _start: number;
  _end: number;
  _sort?: string;
  _order?: Order;
  id?: number;
  q?: string;
};
