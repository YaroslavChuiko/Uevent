import z from 'zod';
import { LOGIN_LENGTH, FULL_NAME_LENGTH } from '../consts/validation';

export const updateSchema = z.object({
  login: z.string().min(LOGIN_LENGTH.min).max(LOGIN_LENGTH.max),
  email: z.string().email(),
  fullName: z.string().min(FULL_NAME_LENGTH.min).max(FULL_NAME_LENGTH.max),
});

export const avatarResponse = z.object({
  picturePath: z.string(),
});

export type IAvatarUpdate = z.infer<typeof avatarResponse>;
export type IUpdate = z.infer<typeof updateSchema>;
