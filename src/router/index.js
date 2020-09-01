import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    meta: {layout: "main"},
    component: () => import('../views/MainPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: "main"},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {layout: "main"},
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/quiz/:id',
    name: 'Quiz',
    meta: {layout: "main"},
    component: () => import('../views/Quiz.vue')
  },
  {
    path: '/result/:id/:score',
    name: 'Result',
    meta: {layout: "main"},
    component: () => import('../views/ResultPage.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: "main"},
    component: () => import('../views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
