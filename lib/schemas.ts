import * as z from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: 'Неверный формат почты' }),
  password: z.string().min(8, 'Минимальная длина пароля 8 символов').max(30, 'Макимальная длина пароля 30 символов'),
  confirmPassword: z.string().min(8, 'Минимальная длина пароля 8 символов').max(30, 'Макимальная длина пароля 30 символов')
}).refine(
  (values) => values.password === values.confirmPassword,
  {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  }
);

export const loginSchema = z.object({
  email: z.string().email({ message: 'Неверный формат почты' }),
  password: z.string().min(8, 'Минимальная длина пароля 8 символов').max(30, 'Макимальная длина пароля 30 символов') }
);
