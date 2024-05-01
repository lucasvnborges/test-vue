import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useStudentStore } from './student'

const student_mock = {
  name: 'Marcio',
  birthdate: '26-05-1995',
  motherName: 'Maria',
  enrollmentPeriod: '01-05-2024'
}

describe('Students Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Espera que a lista de estudantes esteja vazia', () => {
    const { students } = useStudentStore()
    expect(students.length).toBe(0)
  })

  it('Espera que a lista de estudantes contenha um novo aluno', () => {
    const { students, create } = useStudentStore()
    create(student_mock)
    expect(students.length).toBe(1)
  })

  it('Espera que a busca por id encontre um novo aluno', () => {
    const { create, findById } = useStudentStore()
    const newStudent = create(student_mock)
    const foundStudent = findById(newStudent.id)

    if (foundStudent !== undefined) {
      expect(foundStudent.id).toBe(newStudent.id)
    }
  })

  it('Espera que os dados de um aluno sejam atualizados corretamente', () => {
    const { create, findById, update } = useStudentStore()
    const newStudent = create(student_mock)
    const modifiedData = { ...newStudent, birthdate: '20-05-1995' }
    const updateStudent = update(modifiedData)

    expect(updateStudent).toBeTruthy()
    const foundStudent = findById(newStudent.id)

    if (foundStudent !== undefined) {
      expect(foundStudent.birthdate).toBe(modifiedData.birthdate)
    }
  })

  it('Espera excluir um aluno da lista corretamente', () => {
    const { create, findById, exclude } = useStudentStore()
    const newStudent = create(student_mock)
    const foundStudent = findById(newStudent.id)

    if (foundStudent !== undefined) {
      expect(foundStudent.id).toBe(newStudent.id)
    }
    const excludeStudent = exclude(newStudent.id)
    expect(excludeStudent).toBeTruthy()
  })
})
