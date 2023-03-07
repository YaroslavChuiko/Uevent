import { ROLE_ENUM } from '~/consts/validation';
import { Order } from './order';

export type User = {
  id: number;
  login: string;
  email: string;
  fullName: string;
  isConfirmed: boolean;
  picturePath?: string;
  role: typeof ROLE_ENUM;
};

export type UsersResponse = {
  users: User[];
  totalCount: number;
};

export type UsersParam = {
  _start?: number;
  _end?: number;
  _sort?: string;
  _order?: Order;
  companyId?: number;
  eventId?: number;
  q?: string;
};
