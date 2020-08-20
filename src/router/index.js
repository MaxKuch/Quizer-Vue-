import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    meta: {layout: "main", auth: false},
    component: () => import('../views/MainPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: "main",  notAuth: false},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: {layout: "main",  notAuth: false},
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/quiz',
    name: 'Quiz',
    meta: {layout: "main",  notAuth: false},
    component: () => import('../views/Quiz.vue')
  },
  {
    path: '/result',
    name: 'Result',
    meta: {layout: "main",  notAuth: false},
    component: () => import('../views/ResultPage.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: "main",  notAuth: false},
    component: () => import('../views/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, _, next) => {
  const requireAuth = to.meta.auth || false
  const requireNotAuth = to.meta.notAuth || false
  if(requireAuth){
    next('/login')
  } else if(requireNotAuth){
    next('/')
  } else
    next()
})


export default router
