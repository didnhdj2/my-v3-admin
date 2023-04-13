import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '@/layout'

const routes = [
  {
    path: '/',
    component: layout,
    name: 'home',
    redirect: '/dash'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

export default router
