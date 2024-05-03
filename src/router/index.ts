import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/StudentList.vue')
  },
  {
    path: '/cadastrar',
    name: 'studend-register',
    component: () => import('@/views/StudentForm.vue')
  },
  {
    path: '/atualizar/:id',
    name: 'studend-edit',
    component: () => import('@/views/StudentForm.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
