import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import {
  ABOUT,
  INDEX,
  SUGGEST,
  THANK_YOU,
  VIEW,
  LOGIN,
  LOGOUT
} from '@/models/routes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
      children: [
        {
          path: VIEW,
          component: () => import('./views/Home/View.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: THANK_YOU,
          component: () => import('./views/Home/ThankYou.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: SUGGEST,
          component: () => import('./views/Home/Suggest.vue'),
          meta: { requiresAuth: true }
        }
      ]
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
      path: LOGOUT,
      name: 'logout',
      component: () => import('./views/Logout.vue')
    },
    {
      path: '*',
      redirect: LOGIN
    }
  ]
})
