import { ROLE_ENUM } from '~/consts/validation';

export type User = {
  id: number;
  login: string;
  email: string;
  fullName: string;
  isConfirmed: boolean;
  picturePath?: string;
  role: typeof ROLE_ENUM;
};
