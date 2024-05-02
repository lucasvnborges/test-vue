import type { IStudent } from '@/types'

export async function getStudentsService() {
  const response = await fetch('/students')
  if (!response.ok) throw new Error('Erro ao obter a lista de estudantes')
  return response
}

export async function createStudentService(data: IStudent) {
  const response = await fetch('/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Erro ao criar estudante')
  return response
}

export async function updateStudentService(data: IStudent) {
  const response = await fetch(`/students/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) throw new Error('Erro ao atualizar estudante')
  return response
}

export async function deleteStudentService(id: string) {
  const response = await fetch(`/students/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) throw new Error('Erro ao excluir estudante')
  return response
}
