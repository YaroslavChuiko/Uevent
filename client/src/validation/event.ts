import z from 'zod';

export const subscribeSchema = z.object({ isVisible: z.boolean() });

export type ISubscribe = z.infer<typeof subscribeSchema>;
