import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import {
  ABOUT,
  INDEX,
  PROFILE,
  SEARCH,
  SUGGEST,
  THANK_YOU,
  VIEW,
  REGISTER,
  LOGIN,
  LOGOUT
} from '@/models/route'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: ABOUT,
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: LOGIN,
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: REGISTER,
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: LOGOUT,
      name: 'logout',
      component: () => import('./views/Logout.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: SEARCH,
      name: 'search',
      component: () => import('./views/Search.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: SUGGEST,
      component: () => import('./views/Suggest.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: THANK_YOU,
      component: () => import('./views/ThankYou.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: PROFILE,
      component: () => import('./views/Profile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: LOGIN
    }
  ]
})
