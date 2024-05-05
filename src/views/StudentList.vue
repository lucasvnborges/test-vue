<template>
  <div class="container md:mx-auto" id="listagem-estudantes">
    <div class="max-w-4xl md:mx-auto overflow-x-auto mt-12">
      <div class="flex flex-row justify-between items-center mb-6">
        <h4 class="font-bold text-2xl">Lista de alunos cadastrados</h4>

        <button
          type="button"
          @click="navigateToRegister"
          class="font-medium text-gray-900 bg-white border border-gray-300 rounded-lg text-sm px-5 py-2.5"
        >
          Cadastrar aluno
        </button>
      </div>

      <div
        role="alert"
        v-if="students.length === 0"
        class="text-sm text-blue-800 rounded-lg bg-blue-50 p-4 mb-4"
      >
        Comece cadastrando um novo aluno clicando no
        <span class="font-medium">botão acima ☝️</span>
      </div>

      <table
        v-if="students.length > 0"
        class="text-sm text-left text-gray-500 w-full"
      >
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3">Nome</th>
            <th scope="col" class="px-6 py-3">Nome da mãe</th>
            <th scope="col" class="px-6 py-3">Data de nascimento</th>
            <th scope="col" class="px-6 py-3">Período de ingresso</th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>

        <tbody v-for="(student, index) in students" :key="index">
          <tr class="bg-white border-b">
            <th
              scope="row"
              class="font-medium text-gray-900 whitespace-nowrap px-6 py-4"
            >
              {{ student.name }}
            </th>
            <td class="px-6 py-4">{{ student.motherName }}</td>
            <td class="px-6 py-4">{{ student.birthdate }}</td>
            <td class="px-6 py-4">{{ student.enrollmentPeriod }}</td>
            <td class="px-6 py-4 flex flex-row justify-between items-center">
              <a
                v-if="student.id"
                @click="exclude(student.id)"
                class="font-medium text-red-400 hover:underline cursor-pointer mr-2"
              >
                Excluir
              </a>
              <a
                v-if="student.id"
                @click="navigateToUpdate(student.id)"
                class="font-medium text-blue-600 hover:underline cursor-pointer"
              >
                Editar
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onUnmounted } from 'vue'
import { useStudentStore } from '@/stores/students'
import { useRouter } from 'vue-router'

const { push } = useRouter()
const { students, fetchAll, exclude, resetStore } = useStudentStore()

onBeforeMount(() => {
  resetStore()
  fetchAll()
})

onUnmounted(() => {
  resetStore()
})

function navigateToRegister() {
  push('/cadastrar')
}

function navigateToUpdate(id: string) {
  push(`/atualizar/${id}`)
}
</script>
