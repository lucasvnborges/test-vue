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
  const isLoading = ref<boolean>(false)

  function resetStore() {
    list.value = []
    form.value = initialFormValues
  }

  function setFormState(info: IStudent) {
    form.value = info
  }

  async function fetchAll() {
    try {
      const response = await getStudentsService()
      const data = await response.json()
      list.value = data
      return data
    } finally {
      isLoading.value = false
    }
  }

  async function getById(id: string) {
    try {
      const response = await getStudentByIdService(id)
      return response.json()
    } finally {
      isLoading.value = false
    }
  }

  async function create(info: IStudent) {
    try {
      isLoading.value = true
      const response = await createStudentService(info)
      const data = await response.json()

      list.value.push(data)
      return data
    } finally {
      isLoading.value = false
    }
  }

  async function update(info: IStudent) {
    try {
      isLoading.value = true
      const response = await updateStudentService(info)
      const data = await response.json()
      const index = list.value.findIndex((student) => student.id === data.id)

      list.value[index] = data
      isLoading.value = false
      return true
    } finally {
      isLoading.value = false
    }
  }

  async function exclude(id: string) {
    try {
      await deleteStudentService(id)
      list.value = list.value.filter((s) => s.id !== id)
      return true
    } finally {
      isLoading.value = false
    }
  }

  const students = computed(() => list)
  const formState = computed(() => form)
  const loading = computed(() => isLoading)

  return {
    resetStore,
    students,
    formState,
    loading,
    setFormState,
    fetchAll,
    getById,
    create,
    update,
    exclude
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStudentStore, import.meta.hot))
}
