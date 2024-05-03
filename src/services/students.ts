import type { IStudent } from '@/types'
import { toast } from 'vue3-toastify'

const headers = {
  'Content-Type': 'application/json'
}

function errorAlert() {
  toast('A conexão com o servidor falhou. Por favor, tente novamente!', {
    type: 'error',
    position: 'top-center',
    dangerouslyHTMLString: true
  })
}

export async function getStudentsService() {
  const response = await fetch('/students')

  if (!response.ok) {
    errorAlert()
    throw new Error('getStudentsService')
  }

  return response
}

export async function getStudentByIdService(id: string) {
  const response = await fetch(`/students/${id}`)

  if (!response.ok) {
    errorAlert()
    throw new Error('getStudentByIdService')
  }

  return response
}

export async function createStudentService(data: IStudent) {
  const response = await fetch('/students', {
    headers,
    method: 'POST',
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    errorAlert()
    throw new Error('createStudentService')
  }

  return response
}

export async function updateStudentService(data: IStudent) {
  const response = await fetch(`/students/${data.id}`, {
    headers,
    method: 'PUT',
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    errorAlert()
    throw new Error('updateStudentService')
  }

  return response
}

export async function deleteStudentService(id: string) {
  const response = await fetch(`/students/${id}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    errorAlert()
    throw new Error('deleteStudentService')
  }

  return response
}
