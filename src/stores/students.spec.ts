import { describe, test, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useStudentStore } from './students'
import { mockStudentData } from '@/mocks/data'

describe('Store de estudantes', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Espera que a lista de estudantes esteja vazia', () => {
    const { students } = useStudentStore()
    expect(students.length).toBe(0)
  })

  test('Espera que a lista de estudantes contenha um novo aluno', () => {
    const { students, create } = useStudentStore()
    create(mockStudentData)
    expect(students.length).toBe(1)
  })

  test('Espera que a busca por id encontre um novo aluno', () => {
    const { create, findById } = useStudentStore()
    const newStudent = create(mockStudentData)
    const foundStudent = findById(newStudent.id)

    if (foundStudent !== undefined) {
      expect(foundStudent.id).toBe(newStudent.id)
    }
  })

  test('Espera que os dados de um aluno sejam atualizados corretamente', () => {
    const { create, findById, update } = useStudentStore()
    const newStudent = create(mockStudentData)
    const modifiedData = { ...newStudent, birthdate: '20-05-1995' }
    const updateStudent = update(modifiedData)

    expect(updateStudent).toBeTruthy()
    const foundStudent = findById(newStudent.id)

    if (foundStudent !== undefined) {
      expect(foundStudent.birthdate).toBe(modifiedData.birthdate)
    }
  })

  test('Espera excluir um aluno da lista corretamente', () => {
    const { create, findById, exclude } = useStudentStore()
    const newStudent = create(mockStudentData)
    const foundStudent = findById(newStudent.id)

    if (foundStudent !== undefined) {
      expect(foundStudent.id).toBe(newStudent.id)
    }
    const excludeStudent = exclude(newStudent.id)
    expect(excludeStudent).toBeTruthy()
  })
})
