import { describe, expect, test } from 'vitest'
import { StudentSchema } from '@/schemas'

describe('Schema do estudante', () => {
  test('Deve retornar um erro se o nome completo estiver vazio', () => {
    const result = StudentSchema.safeParse({
      name: '',
      motherName: 'Maria',
      birthdate: '2000-01-01',
      enrollmentPeriod: '2024-05-05'
    })

    expect(result.error?.errors[0].code).toBe('too_small')
  })

  test('Deve retornar um erro se o nome completo tiver menos de 5 caracteres', () => {
    const result = StudentSchema.safeParse({
      name: 'João',
      motherName: 'Maria',
      birthdate: '2000-01-01',
      enrollmentPeriod: '2024-05-05'
    })

    expect(result.error?.errors[0].code).toBe('too_small')
  })

  test('Deve retornar um erro se o nome da mãe estiver vazio', () => {
    const result = StudentSchema.safeParse({
      name: 'João Silva',
      motherName: '',
      birthdate: '2000-01-01',
      enrollmentPeriod: '2024-05-05'
    })

    expect(result.error?.errors[0].code).toBe('too_small')
  })

  test('Deve retornar um erro se o nome da mãe tiver menos de 5 caracteres', () => {
    const result = StudentSchema.safeParse({
      name: 'João Silva',
      motherName: 'Ana',
      birthdate: '2000-01-01',
      enrollmentPeriod: '2024-05-05'
    })

    expect(result.error?.errors[0].code).toBe('too_small')
  })

  test('Deve retornar um erro se a data de nascimento estiver em formato inválido', () => {
    const result = StudentSchema.safeParse({
      name: 'João Silva',
      motherName: 'Maria',
      birthdate: '01/01/2000',
      enrollmentPeriod: '2024-05-05'
    })

    expect(result.error?.errors[0].message).toBe(
      'Informe uma data de nascimento válida'
    )
  })

  test('Deve retornar um erro se a data de ingresso estiver em formato inválido', () => {
    const result = StudentSchema.safeParse({
      name: 'João Silva',
      motherName: 'Maria',
      birthdate: '2000-01-01',
      enrollmentPeriod: '2024/05/05'
    })

    expect(result.error?.errors[0].message).toBe(
      'Informe uma data de ingresso válida'
    )
  })

  test('Deve aceitar dados válidos', () => {
    const data = {
      name: 'João Silva',
      motherName: 'Maria Silva',
      birthdate: '2000-01-01',
      enrollmentPeriod: '2024-05-05'
    }
    const result = StudentSchema.safeParse(data)

    expect(result.success).toBe(true)
  })
})
