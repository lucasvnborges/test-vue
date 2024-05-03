<template>
  <div class="container mx-auto p-6 mt-4">
    <div class="max-w-md mx-auto">
      <div class="flex flex-row items-center">
        <button
          type="button"
          @click="handleGoBack"
          class="text-gray-900 bg-white border border-gray-300 font-medium rounded-lg px-3 py-2 text-xs"
        >
          ← Voltar
        </button>
      </div>
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
        @submit="submitHandler"
        :config="{
          classes: {
            outer: 'mt-4 mb-4',
            label: 'block text-sm font-medium text-gray-900 mb-2',
            input: `
              bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
            `,
            message: 'text-red-500 text-xs mt-1'
          }
        }"
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
import { reset } from '@formkit/vue'
import { toast } from 'vue3-toastify'
import type { IStudent } from '@/types'

const { replace } = useRouter()
const { params } = useRoute()
const {
  create,
  update,
  fetchStudentById,
  formState,
  setFormState,
  $reset,
  loading
} = useStudentStore()

const isEditing = !!params.id

const [zodPlugin, submitHandler] = createZodPlugin(
  StudentSchema,
  isEditing ? handleUpdateStudent : handleCreateStudent
)

onBeforeMount(() => {
  handleSetFormState()
})

async function handleSetFormState() {
  if (isEditing && typeof params.id === 'string') {
    const student = await fetchStudentById(params.id)

    if (student.id) {
      setFormState({
        ...student,
        birthdate: student.birthdate.split('-').reverse().join('-'),
        enrollmentPeriod: student.enrollmentPeriod
          .split('-')
          .reverse()
          .join('-')
      })
    }
  }
}

async function handleCreateStudent(form: IStudent) {
  const data = {
    ...form,
    birthdate: form.birthdate.split('-').reverse().join('-'),
    enrollmentPeriod: form.enrollmentPeriod.split('-').reverse().join('-')
  }

  const newStudent = await create(data)

  if (newStudent.id) {
    toast('Aluno cadastrado com sucesso!', {
      type: 'success',
      position: 'top-center',
      dangerouslyHTMLString: true
    })
    $reset()
    reset('studentForm')
  }
}

async function handleUpdateStudent(form: IStudent) {
  if (typeof params.id === 'string') {
    const data = {
      ...form,
      birthdate: form.birthdate.split('-').reverse().join('-'),
      enrollmentPeriod: form.enrollmentPeriod.split('-').reverse().join('-'),
      id: params.id
    }

    const updateStudent = await update(data)

    if (updateStudent) {
      toast('Aluno atualizado com sucesso!', {
        type: 'success',
        position: 'top-center',
        dangerouslyHTMLString: true
      })
    }
  }
}

function handleGoBack() {
  replace({ path: '/' })
}
</script>
