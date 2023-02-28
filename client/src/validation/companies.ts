import z from 'zod';
import { COMPANY_NAME_LENGTH, COORDINATES } from '../consts/validation';

const updateSchema = z.object({
  name: z.string().min(COMPANY_NAME_LENGTH.min).max(COMPANY_NAME_LENGTH.max),
  email: z.string().email(),
  latitude: z.number().min(COORDINATES.min).max(COORDINATES.max),
  longitude: z.number().min(COORDINATES.min).max(COORDINATES.max),
});

export { updateSchema };
export type IUpdate = z.infer<typeof updateSchema>;
