import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'home',
    component: () => import('../views/HomeScreen.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginScreen.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../views/Users.vue')
  },
  {
    path: '/email',
    name: 'email',
    component: () => import('../views/Email.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('../views/Products.vue')
  },
  {
    path: '/edit/:pid?',
    name: 'EditProduct',
    component: () => import('../components/EditProduct.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('../views/LoginScreen.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
