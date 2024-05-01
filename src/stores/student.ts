import { defineStore } from 'pinia'

interface IStudentData {
  name: string
  birthdate: string
  motherName: string
  enrollmentPeriod: string
}

interface IStudent extends IStudentData {
  id: string
}

export const useStudentStore = defineStore('studentStore', {
  state: () => ({
    students: [] as IStudent[]
  }),
  actions: {
    create(data: IStudentData) {
      const id = Date.now().toString()
      const newStudent = { ...data, id }
      this.students.push(newStudent)
      return newStudent
    },
    findById(id: string) {
      return this.students.find((s) => s.id === id)
    },
    update(data: IStudent) {
      const index = this.students.findIndex((student) => student.id === data.id)

      if (index !== -1) {
        this.students[index] = data
        return true
      } else {
        console.error('Objeto não encontrado no array')
        return false
      }
    },
    exclude(id: string) {
      const updated = this.students.filter((s) => s.id !== id)
      this.students = updated
      if (!this.findById(id)) return true
    }
  }
})
