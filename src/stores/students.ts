import { computed, ref } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import {
  createStudentService,
  deleteStudentService,
  getStudentByIdService,
  getStudentsService,
  updateStudentService
} from '@/services/students'
import type { IStudent } from '@/types'

const initialFormValues = {
  id: '',
  name: '',
  motherName: '',
  birthdate: '',
  enrollmentPeriod: ''
}

export const useStudentStore = defineStore('students', () => {
  const list = ref<IStudent[]>([])
  const form = ref<IStudent>(initialFormValues)

  function $reset() {
    list.value = []
    form.value = initialFormValues
  }

  function findById(id: string) {
    return list.value.find((s) => s.id === id)
  }

  function setFormState(info: IStudent) {
    form.value = info
  }

  async function fetchAll() {
    const response = await getStudentsService()
    const data = await response.json()
    list.value = data
  }

  async function fetchStudentById(id: string) {
    const response = await getStudentByIdService(id)
    const data = await response.json()
    return data
  }

  async function create(info: IStudent) {
    const response = await createStudentService(info)
    const data = await response.json()
    list.value.push(data)
    return data
  }

  async function update(info: IStudent) {
    const response = await updateStudentService(info)
    const data = await response.json()
    const index = list.value.findIndex((student) => student.id === data.id)
    list.value[index] = data
    return true
  }

  async function exclude(id: string) {
    const response = await deleteStudentService(id)
    if (response) {
      const updated = list.value.filter((s) => s.id !== id)
      list.value = updated
      if (!findById(id)) return true
    }
  }

  const students = computed(() => list)
  const formState = computed(() => form)

  return {
    $reset,
    formState,
    setFormState,
    students,
    findById,
    fetchAll,
    fetchStudentById,
    create,
    update,
    exclude
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStudentStore, import.meta.hot))
}
