import { z } from 'zod';
import { CATEGORY } from '../constants/category';

export const userValidation = z
  .object({
    username: z
      .string()
      .min(3, {
        message: 'El usuario debe tener al menos 3 caracteres.',
      })
      .max(200, {
        message: 'El usuario debe tener menos de 200 caracteres.',
      }),
    email: z.string().email({
      message: 'Introduzca un correo valido',
    }),
    password: z.string().min(6, {
      message: 'La contraseña debe de ser de al menos 6 caracteres.',
    }),
    confirmPassword: z.string().min(6, {
      message: 'Al repetir contraseña debe de ser de al menos 6 caracteres.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas tienen que ser iguales.',
    path: ['confirmPassword'],
  });

export const productValidation = z.object({
  title: z
    .string()
    .min(5, {
      message: 'El producto debe tener al menos 5 caracteres.',
    })
    .max(200, {
      message: 'El producto debe tener menos de 200 caracteres.',
    }),
  desc: z
    .string()
    .min(10, {
      message: 'El producto debe tener al menos 10 caracteres.',
    })
    .max(200, {
      message: 'El producto debe tener menos de 200 caracteres.',
    }),
  category: z.enum(CATEGORY, {
    message: 'Debe seleccionar una categoría',
  }),
  variants: z
    .object({
      size: z.string(),
      price: z.string().refine((price) => (parseFloat(price)), {
        message: 'El precio debe ser un numero',
      }),
      stock: z.string().refine((stock) => (parseFloat(stock)), {
        message: 'El stock debe ser un numero',
      }),
      img: z.string().optional(),
    })
    .array()
    .nonempty({
      message: 'Debe al menos crear una variante',
    }),
});
