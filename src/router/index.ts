import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: { title: '食堂数据驾驶舱' }
  },
  {
    path: '/food-price-board',
    name: 'FoodPriceBoard',
    component: () => import('@/views/food-price-board/index.vue'),
    meta: { title: '菜价公示大屏看板' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router