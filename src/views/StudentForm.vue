<template>
  <div class="container md:mx-auto mt-6 p-6">
    <div class="max-w-md md:mx-auto">
      <div class="flex flex-row items-center">
        <button
          type="button"
          @click="handleGoBack"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          ← Voltar
        </button>
      </div>
      <h3 class="text-2xl font-bold dark:text-white mt-6">Cadastro</h3>
      <p
        class="text-sm font-normal text-gray-500 lg:text-lg dark:text-gray-400"
      >
        Preencha o formulário abaixo com os dados do aluno
      </p>
      <FormKit
        type="form"
        :actions="false"
        :plugins="[zodPlugin]"
        @submit="submitHandler"
        :config="{
          classes: {
            outer: 'mt-4 mb-4',
            label:
              'block text-sm font-medium text-gray-900 dark:text-white mb-2',
            input: `
              bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            `,
            message: 'text-red-500 text-xs mt-1'
          }
        }"
      >
        <FormKit type="text" name="name" label="Nome completo" />
        <FormKit type="text" name="motherName" label="Nome da mãe" />
        <FormKit type="date" name="birthdate" label="Data de nascimento" />
        <FormKit type="date" name="enrollmentPeriod" label="Data de ingresso" />

        <FormKit
          type="submit"
          label="Cadastrar"
          :classes="{
            outer: 'mb-0',
            input: `
              $reset text-gray-900 bg-white border border-gray-300 focus:outline-none 
              hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 w-full mt-2
            `
          }"
        />
      </FormKit>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { z } from 'zod'
import { useRouter } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { useStudentStore } from '@/stores/students'

const { replace } = useRouter()
const { create } = useStudentStore()

const zodSchema = z.object({
  name: z
    .string({ required_error: 'O nome completo é obrigatório' })
    .min(5, { message: 'O nome completo deve ter no mínimo 5 caracteres' }),
  motherName: z
    .string({ required_error: 'O nome da mãe é obrigatório' })
    .min(5, { message: 'O nome da mãe deve ter no mínimo 5 caracteres' }),
  birthdate: z.string({
    required_error: 'A data de nascimento do aluno é obrigatória'
  }),
  enrollmentPeriod: z.string({
    required_error: 'A data de matrícula é obrigatória'
  })
})

const [zodPlugin, submitHandler] = createZodPlugin(
  zodSchema,
  async (formData) => {
    const data = {
      ...formData,
      birthdate: formData.birthdate.split('-').reverse().join('-'),
      enrollmentPeriod: formData.enrollmentPeriod.split('-').reverse().join('-')
    }

    console.log(data)

    create(data)
  }
)

function handleGoBack() {
  replace({ path: '/' })
}
</script>
