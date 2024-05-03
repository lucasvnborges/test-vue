<template>
  <div class="container md:mx-auto">
    <div class="max-w-4xl md:mx-auto overflow-x-auto mt-12">
      <div class="flex flex-row justify-between items-center">
        <h5 class="text-xl font-bold dark:text-white ml-4">
          Lista de alunos cadastrados
        </h5>
        <button
          type="button"
          @click="handleNavigate"
          class="text-white mt-6 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-6"
        >
          Cadastrar aluno
        </button>
      </div>
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Nome</th>
            <th scope="col" class="px-6 py-3">Nome da mãe</th>
            <th scope="col" class="px-6 py-3">Data de nascimento</th>
            <th scope="col" class="px-6 py-3">Período de ingresso</th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody v-for="(student, index) in students" :key="index">
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ student.name }}
            </th>
            <td class="px-6 py-4">{{ student.motherName }}</td>
            <td class="px-6 py-4">{{ student.birthdate }}</td>
            <td class="px-6 py-4">{{ student.enrollmentPeriod }}</td>
            <td class="px-6 py-4 flex flex-row justify-between items-center">
              <a
                @click="exclude(student.id ?? '')"
                class="font-medium text-red-400 dark:text-red-500 hover:underline cursor-pointer mr-2"
              >
                Excluir
              </a>
              <a
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
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
const { students, fetchAll, reset, exclude } = useStudentStore()

onBeforeMount(() => {
  fetchAll()
})

onUnmounted(() => {
  reset()
})

function handleNavigate() {
  push('/cadastrar')
}
</script>
