import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import ActiveView from '../views/ActiveView.vue'
import RetentionView from '../views/RetentionView.vue'
import PaymentView from '../views/PaymentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    // Dashboard routes
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        title: '拉新数据'
      }
    },
    {
      path: '/dashboard/active',
      name: 'dashboard-active',
      component: ActiveView,
      meta: {
        title: '活跃数据'
      }
    },
    {
      path: '/dashboard/retention',
      name: 'dashboard-retention',
      component: RetentionView,
      meta: {
        title: '留存数据'
      }
    },
    {
      path: '/dashboard/payment',
      name: 'dashboard-payment',
      component: PaymentView,
      meta: {
        title: '付费数据'
      }
    },
  ],
})

export default router
