import z from 'zod';

export const subscribeSchema = z.object({
  isVisible: z.boolean(),
  promoCode: z.string().optional(),
});

export type ISubscribe = z.infer<typeof subscribeSchema>;
