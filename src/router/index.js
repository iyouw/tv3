import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:'/recentlyView'
    },
    {
      path: '/recentlyView',
      name: 'recentlyView',
      component: () => import('../views/RecentlyView01.vue')
    },
    {
      path:'/myFavorites',
      name: 'myFavorites',
      component: () => import('../views/MyFavorites.vue')
    },
    {
      path:'/trash',
      name:'trash',
      component: () => import('../views/Trash.vue')
    }
  ]
})

export default router
