import { setupServer } from 'msw/node'
import { handlers } from '@/mocks/handlers'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import {
  getStudentsService,
  createStudentService,
  updateStudentService,
  deleteStudentService
} from './students'
import type { IStudent } from '@/types'
import { mockStudentData, mockStudentResponse } from '@/mocks/data'

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe('Listagem de estudantes', () => {
  let response: Response
  let body: IStudent[]

  beforeAll(async () => {
    response = await getStudentsService()
    body = await response.json()
  }, 30000)

  test('Espera o status de resposta 200', async () => {
    expect(response.status).toBe(200)
  })

  test('Espera que o content-type seja application/json', () => {
    expect(response.headers.get('Content-Type')).toBe('application/json')
  })

  test('Espera um objeto como resposta', () => {
    expect(body).toBeTypeOf('object')
  })
})

describe('Criação de estudante', () => {
  let response: Response
  let body: IStudent

  beforeAll(async () => {
    response = await createStudentService(mockStudentData)
    body = await response.json()
  }, 30000)

  test('Espera o status de resposta 201', async () => {
    expect(response.status).toBe(201)
  })

  test('Espera que o content-type seja application/json', () => {
    expect(response.headers.get('Content-Type')).toBe('application/json')
  })

  test('Espera um objeto de estudante como resposta', () => {
    for (const key in mockStudentResponse) {
      expect(body).toHaveProperty(key)
    }
  })
})

describe('Atualização de estudante', () => {
  let newStudentBody: IStudent
  let response: Response
  let body: IStudent

  beforeAll(async () => {
    const newStudentResponse = await createStudentService(mockStudentData)
    newStudentBody = await newStudentResponse.json()
    response = await updateStudentService({ ...newStudentBody, birthdate: '05-04-1996' })
    body = await response.json()
  }, 30000)

  test('Espera o status de resposta 200', async () => {
    expect(response.status).toBe(200)
  })

  test('Espera que o content-type seja application/json', () => {
    expect(response.headers.get('Content-Type')).toBe('application/json')
  })

  test('Espera uma atualização com sucesso dos dados de um estudante', () => {
    expect(newStudentBody.birthdate).not.toBe(body.birthdate)
    expect(body.birthdate).toBe('05-04-1996')
  })
})

describe('Exclusão de estudante', () => {
  let response: Response

  beforeAll(async () => {
    const newStudentResponse = await createStudentService(mockStudentData)
    const newStudentBody = await newStudentResponse.json()

    if (newStudentBody && newStudentBody.id) {
      response = await deleteStudentService(newStudentBody.id)
    }
  }, 30000)

  test('Espera o status de resposta 200', async () => {
    expect(response.status).toBe(200)
  })
})
