import type { IStudent } from '@/types'
import { toast } from 'vue3-toastify'

const headers = {
  'Content-Type': 'application/json'
}

const ErrorMessages = {
  server: 'A conexão com o servidor falhou. Por favor, tente novamente!',
  get: 'Erro na resposta do servidor ao obter alunos',
  getById: 'Erro na resposta do servidor ao obter aluno por ID',
  create: 'Erro na resposta do servidor ao criar aluno',
  update: 'Erro na resposta do servidor ao atualizar aluno',
  delete: 'Erro na resposta do servidor ao excluir aluno'
}

function errorAlert() {
  toast(ErrorMessages.server, {
    type: 'error',
    position: 'top-center',
    dangerouslyHTMLString: true
  })
}

export async function getStudentsService() {
  try {
    const response = await fetch('/students')
    if (!response.ok) {
      throw new Error(ErrorMessages.get)
    }
    return response
  } catch (error) {
    errorAlert()
    throw error
  }
}

export async function getStudentByIdService(id: string) {
  try {
    const response = await fetch(`/students/${id}`)
    if (!response.ok) {
      throw new Error(ErrorMessages.getById)
    }
    return response
  } catch (error) {
    errorAlert()
    throw error
  }
}

export async function createStudentService(data: IStudent) {
  try {
    const response = await fetch('/students', {
      headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error(ErrorMessages.create)
    }
    return response
  } catch (error) {
    errorAlert()
    throw error
  }
}

export async function updateStudentService(data: IStudent) {
  try {
    const response = await fetch(`/students/${data.id}`, {
      headers,
      method: 'PUT',
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error(ErrorMessages.update)
    }
    return response
  } catch (error) {
    errorAlert()
    throw error
  }
}

export async function deleteStudentService(id: string) {
  try {
    const response = await fetch(`/students/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) {
      throw new Error(ErrorMessages.delete)
    }
    return response
  } catch (error) {
    errorAlert()
    throw error
  }
}
