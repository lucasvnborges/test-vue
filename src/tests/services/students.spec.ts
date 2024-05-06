import { setupServer } from 'msw/node'
import { handlers } from '@/mocks/handlers'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import {
  getStudentsService,
  createStudentService,
  updateStudentService,
  deleteStudentService,
  getStudentByIdService
} from '@/services/students'
import type { IStudent } from '@/types'
import { mockStudentData, mockStudentResponse } from '@/mocks/data'

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe('Listar estudantes', () => {
  let response: Response
  let body: IStudent[]

  beforeAll(async () => {
    await createStudentService(mockStudentData)
    response = await getStudentsService()
    body = await response.json()
  }, 30000)

  test('Espera o status 200 como resposta', async () => {
    expect(response.status).toBe(200)
  })

  test('Espera que o content-type seja application/json', () => {
    expect(response.headers.get('Content-Type')).toBe('application/json')
  })

  test('Espera uma lista de estudantes como resposta', () => {
    expect(body).toBeTypeOf('object')
    expect(body.length).toBeGreaterThan(0)
  })
})

describe('Buscar estudante', () => {
  let newStudentBody: IStudent
  let response: Response
  let body: IStudent

  beforeAll(async () => {
    const newStudentResponse = await createStudentService(mockStudentData)

    newStudentBody = await newStudentResponse.json()
    if (newStudentBody.id) {
      response = await getStudentByIdService(newStudentBody.id)
      body = await response.json()
    }
  }, 30000)

  test('Espera o status 200 como resposta', async () => {
    expect(response.status).toBe(200)
  })

  test('Espera que o content-type seja application/json', () => {
    expect(response.headers.get('Content-Type')).toBe('application/json')
  })

  test('Espera encontrar com sucesso os dados de um estudante', () => {
    expect(body).toEqual(newStudentBody)
  })
})

describe('Criar estudante', () => {
  let response: Response
  let body: IStudent

  beforeAll(async () => {
    response = await createStudentService(mockStudentData)
    body = await response.json()
  }, 30000)

  test('Espera o status 201 como resposta', async () => {
    expect(response.status).toBe(201)
  })

  test('Espera que o content-type seja application/json', () => {
    expect(response.headers.get('Content-Type')).toBe('application/json')
  })

  test('Espera que a resposta esteja de acordo com o schema de estudante', () => {
    for (const key in mockStudentResponse) {
      expect(body).toHaveProperty(key)
    }
  })

  test('Espera um objeto de estudante com todos os valores preenchidos', () => {
    const verifyValues = Object.values(body).every(
      (value) => value !== null && value !== undefined
    )

    expect(verifyValues).toBeTruthy()
  })
})

describe('Atualizar estudante', () => {
  let newStudentBody: IStudent
  let response: Response
  let body: IStudent

  beforeAll(async () => {
    const newStudentResponse = await createStudentService(mockStudentData)

    newStudentBody = await newStudentResponse.json()
    response = await updateStudentService({
      ...newStudentBody,
      birthdate: '05-04-1996'
    })
    body = await response.json()
  }, 30000)

  test('Espera o status 200 como resposta', async () => {
    expect(response.status).toBe(200)
  })

  test('Espera que o content-type seja application/json', () => {
    expect(response.headers.get('Content-Type')).toEqual('application/json')
  })

  test('Espera uma atualização com sucesso dos dados de um estudante', () => {
    expect(body.birthdate).not.toBe(newStudentBody.birthdate)
    expect(body.birthdate).toBe('05-04-1996')
  })
})

describe('Excluir estudante', () => {
  let response: Response

  beforeAll(async () => {
    const newStudentResponse = await createStudentService(mockStudentData)
    const newStudentBody = await newStudentResponse.json()

    response = await deleteStudentService(newStudentBody.id)
  }, 30000)

  test('Espera o status 200 como resposta', async () => {
    expect(response.status).toBe(200)
  })
})
