import z from 'zod';
import { LOGIN_LENGTH, FULL_NAME_LENGTH, PASSWORD_LENGTH } from '../consts/validation';

const loginSchema = z.object({
  login: z.string().min(1),
  password: z.string().min(1),
});

const registerSchema = z
  .object({
    login: z.string().min(LOGIN_LENGTH.min).max(LOGIN_LENGTH.max),
    email: z.string().email(),
    password: z.string().min(PASSWORD_LENGTH.min).max(PASSWORD_LENGTH.max),
    passwordConfirm: z.string(),
    fullName: z.string().min(FULL_NAME_LENGTH.min).max(FULL_NAME_LENGTH.max),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

const sendPasswordConfirmationSchema = z.object({
  email: z.string().email(),
});

const resetPasswordSchema = z
  .object({
    password: z.string().min(PASSWORD_LENGTH.min).max(PASSWORD_LENGTH.max),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

export { loginSchema, registerSchema, sendPasswordConfirmationSchema, resetPasswordSchema };
export type ILogin = z.infer<typeof loginSchema>;
export type IRegister = z.infer<typeof registerSchema>;
export type ISendPasswordConfirmation = z.infer<typeof sendPasswordConfirmationSchema>;
export type IResetPassword = z.infer<typeof resetPasswordSchema>;
