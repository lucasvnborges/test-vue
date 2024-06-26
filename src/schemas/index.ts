import { z } from 'zod'

const dateRegex = /^\d{4}-\d{2}-\d{2}$/

export const StudentSchema = z.object({
  name: z
    .string({ required_error: 'O campo deve ser preenchido' })
    .min(5, { message: 'O nome completo deve ter no mínimo 5 caracteres' }),
  motherName: z
    .string({ required_error: 'O campo deve ser preenchido' })
    .min(5, { message: 'O nome da mãe deve ter no mínimo 5 caracteres' }),
  birthdate: z
    .string({ required_error: 'O campo deve ser preenchido' })
    .refine((value) => dateRegex.test(value), {
      message: 'Informe uma data de nascimento válida'
    }),
  enrollmentPeriod: z
    .string({ required_error: 'O campo deve ser preenchido' })
    .refine((value) => dateRegex.test(value), {
      message: 'Informe uma data de ingresso válida'
    })
})
