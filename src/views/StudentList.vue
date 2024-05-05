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

      <div role="status" class="flex justify-center py-12" v-if="loading">
        <svg
          fill="none"
          aria-hidden="true"
          viewBox="0 0 100 101"
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
        >
          <path
            fill="currentColor"
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          />
          <path
            fill="currentFill"
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          />
        </svg>
      </div>

      <div
        role="alert"
        v-if="!loading && students.length === 0"
        class="text-sm text-blue-800 rounded-lg bg-blue-50 p-4 mb-4"
      >
        Comece cadastrando um novo aluno clicando no
        <span class="font-medium">botão acima ☝️</span>
      </div>

      <table
        v-if="!loading && students.length > 0"
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
const { students, fetchAll, exclude, resetStore, loading } = useStudentStore()

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
