import { setupServer } from 'msw/node'
import { handlers } from '@/mocks/handlers'
import { describe, test, expect, beforeEach, beforeAll, afterAll } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useStudentStore } from './students'
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
    expect(students.length).toBe(0)
  })

  test('Espera que a lista de estudantes contenha um novo aluno', async () => {
    const { students, create } = useStudentStore()
    await create(mockStudentData)
    expect(students.length).toBe(1)
  })

  test('Espera que a busca por id encontre um novo aluno', async () => {
    const { create, findById } = useStudentStore()
    const newStudent = await create(mockStudentData)

    let foundStudent
    if (newStudent.id) foundStudent = findById(newStudent.id)

    if (foundStudent !== undefined) expect(foundStudent.id).toBe(newStudent.id)
  })

  test('Espera que os dados de um aluno sejam atualizados corretamente', async () => {
    const { create, findById, update } = useStudentStore()
    const newStudent = await create(mockStudentData)
    const modifiedData = { ...newStudent, birthdate: '20-05-1995' }
    const updateStudent = await update(modifiedData)

    expect(updateStudent).toBeTruthy()

    let foundStudent
    if (newStudent.id) foundStudent = findById(newStudent.id)

    if (foundStudent !== undefined)
      expect(foundStudent.birthdate).toBe(modifiedData.birthdate)
  })

  test('Espera excluir um aluno da lista corretamente', async () => {
    const { create, findById, exclude } = useStudentStore()
    const newStudent = await create(mockStudentData)

    let foundStudent
    if (newStudent.id) foundStudent = findById(newStudent.id)

    if (foundStudent !== undefined) expect(foundStudent.id).toBe(newStudent.id)

    if (newStudent.id) {
      const excludeStudent = exclude(newStudent.id)
      expect(excludeStudent).toBeTruthy()
    }
  })
})
