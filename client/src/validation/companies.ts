import z from 'zod';
import { COMPANY_NAME_LENGTH, LATITUDE, LONGITUDE } from '../consts/validation';

const createSchema = z.object({
  name: z.string().min(COMPANY_NAME_LENGTH.min).max(COMPANY_NAME_LENGTH.max),
  email: z.string().email(),
  latitude: z.number().min(LATITUDE.min).max(LATITUDE.max),
  longitude: z.number().min(LONGITUDE.min).max(LONGITUDE.max),
});

const updateSchema = z.object({
  name: z.string().min(COMPANY_NAME_LENGTH.min).max(COMPANY_NAME_LENGTH.max),
  email: z.string().email(),
  latitude: z.number().min(LATITUDE.min).max(LATITUDE.max),
  longitude: z.number().min(LONGITUDE.min).max(LONGITUDE.max),
});

export { createSchema, updateSchema };
export type ICreate = z.infer<typeof createSchema>;
export type IUpdate = z.infer<typeof updateSchema>;
