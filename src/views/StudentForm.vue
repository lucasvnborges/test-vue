<template>
  <div class="container mx-auto p-6 mt-4">
    <div class="max-w-md mx-auto">
      <button
        type="button"
        @click="handleGoBack"
        class="font-medium text-xs text-gray-900 bg-white border border-gray-300 rounded-lg px-3 py-2"
      >
        ← Voltar
      </button>

      <h4 class="text-2xl font-bold mt-4">
        {{ isEditing ? 'Atualização' : 'Cadastro' }}
      </h4>

      <p class="text-sm lg:text-lg font-normal text-gray-500">
        {{
          isEditing
            ? 'Preencha o formulário abaixo com os dados atualizados do aluno'
            : 'Preencha o formulário abaixo com os dados do aluno'
        }}
      </p>

      <FormKit
        type="form"
        id="studentForm"
        :actions="false"
        :plugins="[zodPlugin]"
        :config="{
          classes: {
            outer: 'mt-4 mb-4',
            label: 'font-medium text-sm text-gray-900 mb-2',
            input: `
              bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 w-full p-2.5
            `,
            message: 'text-xs text-red-500 mt-1'
          }
        }"
        @submit="submitHandler"
      >
        <FormKit
          type="text"
          name="name"
          label="Nome completo"
          v-model="formState.name"
          :disabled="loading"
        />
        <FormKit
          type="text"
          name="motherName"
          label="Nome da mãe"
          v-model="formState.motherName"
          :disabled="loading"
        />
        <FormKit
          type="date"
          name="birthdate"
          label="Data de nascimento"
          v-model="formState.birthdate"
          :disabled="loading"
        />
        <FormKit
          type="date"
          name="enrollmentPeriod"
          label="Data de ingresso"
          v-model="formState.enrollmentPeriod"
          :disabled="loading"
        />

        <FormKit
          type="submit"
          :disabled="loading"
          :label="isEditing ? 'Atualizar' : 'Cadastrar'"
          :classes="{
            input: `
              $reset text-gray-900 bg-white border border-gray-300 focus:outline-none 
              font-medium rounded-lg text-sm px-5 py-2.5 w-full mt-2
            `
          }"
        />
      </FormKit>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createZodPlugin } from '@formkit/zod'
import { useStudentStore } from '@/stores/students'
import { StudentSchema } from '@/schemas'
import type { IStudent } from '@/types'
import { reset } from '@formkit/vue'
import { toast } from 'vue3-toastify'

const { replace } = useRouter()
const { params } = useRoute()
const {
  create,
  update,
  getById,
  setFormState,
  resetStore,
  formState,
  loading
} = useStudentStore()

const isEditing = !!params.id

const [zodPlugin, submitHandler] = createZodPlugin(
  StudentSchema,
  isEditing ? handleUpdateStudent : handleCreateStudent
)

onBeforeMount(() => {
  // Na edição do estudante: antes de montar o componete, busca os dados e autopreenche o formulário
  handleSetFormState()
})

function handleGoBack() {
  replace({ path: '/' })
}

function normalizeDate(date: string) {
  return date.split('-').reverse().join('-')
}

function sucessAlert(msg: string) {
  toast(msg, {
    type: 'success',
    position: 'top-center',
    dangerouslyHTMLString: true
  })
}

async function handleSetFormState() {
  if (isEditing && typeof params.id === 'string') {
    const student = await getById(params.id)

    if (student.id) {
      setFormState({
        ...student,
        birthdate: normalizeDate(student.birthdate),
        enrollmentPeriod: normalizeDate(student.enrollmentPeriod)
      })
    }
  }
}

async function handleCreateStudent(form: IStudent) {
  const newStudent = await create({
    ...form,
    birthdate: normalizeDate(form.birthdate),
    enrollmentPeriod: normalizeDate(form.enrollmentPeriod)
  })

  if (newStudent && newStudent.id) {
    sucessAlert('Aluno cadastrado com sucesso!')
    reset('studentForm')
    resetStore()
  }
}

async function handleUpdateStudent(form: IStudent) {
  if (typeof params.id === 'string') {
    const updateStudent = await update({
      ...form,
      id: params.id,
      birthdate: form.birthdate.split('-').reverse().join('-'),
      enrollmentPeriod: form.enrollmentPeriod.split('-').reverse().join('-')
    })

    if (updateStudent) {
      sucessAlert('Aluno atualizado com sucesso!')
    }
  }
}
</script>
