import z from 'zod';
import { PROMO_CODE_LENGTH, DISCOUNT } from '../consts/validation';

const createSchema = z.object({
  promoCode: z.string().min(PROMO_CODE_LENGTH.min).max(PROMO_CODE_LENGTH.max),
  discount: z.number({ invalid_type_error: 'Input discount' }).min(DISCOUNT.min).max(DISCOUNT.max),
});

const updateSchema = z.object({
  promoCode: z.string().min(PROMO_CODE_LENGTH.min).max(PROMO_CODE_LENGTH.max),
  discount: z.number({ invalid_type_error: 'Input discount' }).min(DISCOUNT.min).max(DISCOUNT.max),
});

export { createSchema, updateSchema };
export type ICreate = z.infer<typeof createSchema>;
export type IUpdate = z.infer<typeof updateSchema>;
