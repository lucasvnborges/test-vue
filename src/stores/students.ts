import { defineStore } from 'pinia'
import {
  createStudentService,
  deleteStudentService,
  getStudentsService,
  updateStudentService
} from '@/services/students'
import type { IStudent } from '@/types'

export const useStudentStore = defineStore('studentStore', {
  state: () => ({
    students: [] as IStudent[]
  }),
  actions: {
    async getAll() {
      const response = await getStudentsService()
      const data = await response.json()
      this.students = data
    },
    async create(info: IStudent) {
      const response = await createStudentService(info)
      const data = await response.json()
      this.students.push(data)
      return data
    },
    findById(id: string) {
      return this.students.find((s) => s.id === id)
    },
    async update(info: IStudent) {
      const response = await updateStudentService(info)
      const data = await response.json()
      const index = this.students.findIndex((student) => student.id === data.id)
      this.students[index] = data
      return true
    },
    async exclude(id: string) {
      const response = await deleteStudentService(id)

      if (response) {
        const updated = this.students.filter((s) => s.id !== id)
        this.students = updated
        if (!this.findById(id)) return true
      }
    }
  }
})
