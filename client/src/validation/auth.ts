import z from 'zod';

const loginSchema = z.object({
  login: z.string().min(1),
  password: z.string().min(1),
});

export { loginSchema };
export type ILogin = z.infer<typeof loginSchema>;
