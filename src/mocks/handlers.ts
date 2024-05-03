import { http, HttpResponse } from 'msw'
import { SessionStorageMap } from './sessionStorage'

const storage = new SessionStorageMap<string, any>()

export const handlers = [
  http.get('/students', () => {
    return HttpResponse.json(Array.from(storage.values()))
  }),

  http.get('/students/:id', async ({ params }) => {
    const { id } = params
    const students = Array.from(storage.values())
    const find = students.find((s) => s.id === id)

    if (find) return HttpResponse.json(find)
  }),

  http.post('/students', async ({ request }) => {
    const id = Date.now().toString()
    const student = await request.json()

    if (student && typeof student === 'object' && !Array.isArray(student)) {
      student.id = id
      storage.set(id, student)
      return HttpResponse.json({ ...student, id }, { status: 201 })
    } else {
      return HttpResponse.json(
        { error: 'Dados do estudante são inválidos' },
        { status: 400 }
      )
    }
  }),

  http.put('/students/:id', async ({ params, request }) => {
    const { id } = params
    const student = await request.json()
    storage.set(id.toString(), student)
    return HttpResponse.json(student)
  }),

  http.delete('/students/:id', ({ params }) => {
    const { id } = params
    storage.delete(id.toString())
    // O mswjs tem limitações quanto ao status 204
    return HttpResponse.json({}, { status: 200 })
  })
]
