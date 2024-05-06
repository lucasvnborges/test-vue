import { mount } from '@vue/test-utils'
import { setupServer } from 'msw/node'
import { handlers } from '@/mocks/handlers'
import {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  vi
} from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { plugin, defaultConfig } from '@formkit/vue'
import { mockFormData } from '@/mocks/data'
import router from '@/router'
import StudentForm from '@/views/StudentForm.vue'
import StudentList from '@/views/StudentList.vue'

const server = setupServer(...handlers)

const StudentFormWrapper = mount(StudentForm, {
  global: {
    plugins: [
      router,
      createTestingPinia({
        createSpy: vi.fn
      }),
      [plugin, defaultConfig]
    ]
  }
})

const StudentListWrapper = mount(StudentList, {
  global: {
    plugins: [
      router,
      createTestingPinia({
        createSpy: vi.fn
      }),
      [plugin, defaultConfig]
    ]
  }
})

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe('Formulário de cadastro e edição de estudantes', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Espera encontrar o formulário no DOM', () => {
    const DOM = StudentFormWrapper.find('form')
    expect(DOM.exists()).toBeTruthy()
  })

  test('Espera que o botão de retornar para tela de listagem esteja presente', () => {
    const button = StudentFormWrapper.find('button')
    expect(button.exists()).toBeTruthy()
    expect(button.text()).toBe('← Voltar')
  })

  test('Espera preencher os campos do formulário', () => {
    const data = Object.entries(mockFormData)

    data.forEach(([key, value]) => {
      const input = StudentFormWrapper.find(`[name="${key}"]`)
      input.setValue(value)

      const inputElement = input.element as HTMLInputElement
      expect(inputElement.value).toBe(value)
    })
  })
})

describe('Listagem de estudantes', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('Espera encontrar a view no DOM', () => {
    const DOM = StudentListWrapper.find('[id="listagem-estudantes"]')
    expect(DOM.exists()).toBeTruthy()
  })

  test('Espera que o título da lista esteja presente', () => {
    const title = StudentListWrapper.find('h4')
    expect(title.exists()).toBeTruthy()
    expect(title.text()).toBe('Lista de alunos cadastrados')
  })

  test('Espera que o botão "Cadastrar aluno" esteja presente', () => {
    const button = StudentListWrapper.find('button')
    expect(button.exists()).toBeTruthy()
    expect(button.text()).toBe('Cadastrar aluno')
  })

  test('Espera que o componente alert esteja presente', () => {
    const alert = StudentListWrapper.find('[role="alert"]')
    expect(alert.exists()).toBeTruthy()
  })
})
