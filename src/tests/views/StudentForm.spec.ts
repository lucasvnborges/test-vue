import StudentForm from '@/views/StudentForm.vue'
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
import { createRouter, createWebHistory } from 'vue-router'
import { createTestingPinia } from '@pinia/testing'
import { plugin, defaultConfig } from '@formkit/vue'

const server = setupServer(...handlers)
const mockRouter = createRouter({ history: createWebHistory(), routes: [] })
const wrapper = mount(StudentForm, {
  global: {
    plugins: [
      mockRouter,
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

describe('Formulário de cadastro dos estudantes', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  test('Espera encontrar o formulário no DOM', () => {
    const DOM = wrapper.find('form')
    expect(DOM.exists()).toBe(true)
  })

  test('Espera exibir as mensagens de validação do formulário vazio', () => {
    wrapper.find('form').trigger('submit')

    const mockFormData = {
      name: 'Marcos Lima',
      motherName: 'Alice Lima',
      birthdate: '1999-05-26', // formato nativo de data: yyyy-mm-dd
      enrollmentPeriod: '2024-05-03' // formato nativo de data: yyyy-mm-dd
    }

    const fields = Object.keys(mockFormData)

    fields.forEach((field, index) => {
      // console.log(wrapper.find(`form`).html())
      // expect(
      //   wrapper.find(`[id="input_${index}-${field}:zod"]`).text()
      // ).toBeTypeOf('string')
    })
  })

  test('Espera preencher os campos do formulário de forma correta', () => {
    const mockFormData = {
      name: 'Marcos Lima',
      motherName: 'Alice Lima',
      birthdate: '1999-05-26', // formato nativo de data: yyyy-mm-dd
      enrollmentPeriod: '2024-05-03' // formato nativo de data: yyyy-mm-dd
    }

    const fields = Object.keys(mockFormData)
    const values = Object.values(mockFormData)

    fields.forEach((field, index) => {
      const input = wrapper.find(`[name="${field}"]`)
      input.setValue(values[index])
      expect((input.element as HTMLInputElement).value).toBe(values[index])
    })
  })
})
