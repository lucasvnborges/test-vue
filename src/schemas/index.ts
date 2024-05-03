import { z } from 'zod'

export const StudentSchema = z.object({
  name: z
    .string({ required_error: 'O nome completo é obrigatório' })
    .min(5, { message: 'O nome completo deve ter no mínimo 5 caracteres' }),
  motherName: z
    .string({ required_error: 'O nome da mãe é obrigatório' })
    .min(5, { message: 'O nome da mãe deve ter no mínimo 5 caracteres' }),
  birthdate: z.string({
    required_error: 'A data de nascimento do aluno é obrigatória'
  }),
  enrollmentPeriod: z.string({
    required_error: 'A data de ingresso na instituição é obrigatória'
  })
})
