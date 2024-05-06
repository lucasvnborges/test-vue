import { setupServer } from 'msw/node'
import { describe, test, expect, beforeEach, beforeAll, afterAll } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { handlers } from '@/mocks/handlers'
import { useStudentStore } from '@/stores/students'
import { mockStudentData } from '@/mocks/data'

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe('Gerenciamento de estado dos estudantes', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Espera que a lista de estudantes seja um objeto', () => {
    const { students } = useStudentStore()
    expect(students).toBeTypeOf('object')
  })

  test('Espera que a lista de estudantes esteja vazia', () => {
    const { students } = useStudentStore()
    expect(students.value.length).toBe(0)
  })

  test('Espera que a lista de estudantes esteja vazia ao resetar o state', async () => {
    const { students, create, resetStore } = useStudentStore()

    await create(mockStudentData)
    expect(students.value.length).toBe(1)
    resetStore()
    expect(students.value.length).toBe(0)
  })

  test('Espera que a lista de estudantes contenha um novo aluno', async () => {
    const { students, create } = useStudentStore()

    await create(mockStudentData)
    expect(students.value.length).toBe(1)
  })

  test('Espera que a busca por id encontre um aluno cadastrado', async () => {
    const { create, getById } = useStudentStore()
    const newStudent = await create(mockStudentData)
    const foundStudent = await getById(newStudent.id)

    expect(foundStudent).toEqual(newStudent)
  })

  test('Espera que os dados de um aluno sejam atualizados corretamente', async () => {
    const { create, update, getById } = useStudentStore()
    const newStudent = await create(mockStudentData)
    const modifiedData = { ...newStudent, birthdate: '20-05-1995' }
    const updateStudent = await update(modifiedData)
    const foundStudent = await getById(newStudent.id)

    expect(updateStudent).toBeTruthy()
    expect(foundStudent.birthdate).toEqual(modifiedData.birthdate)
  })

  test('Espera excluir um aluno da lista corretamente', async () => {
    const { create, getById, exclude } = useStudentStore()
    const newStudent = await create(mockStudentData)
    const foundStudent = await getById(newStudent.id)

    expect(foundStudent).toEqual(newStudent)

    const excludeStudent = await exclude(newStudent.id)
    expect(excludeStudent).toBeTruthy()
  })
})
