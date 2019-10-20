import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'normalize.css'

Vue.config.productionTip = false

const BLACKLISTED_ON_LOGIN = ['/login', '/register']

router.beforeEach((to, from, next) => {
  store.dispatch('fetchAccessToken')
  const isAuthorized = store.getters.authorized
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthorized) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    const unsafe = BLACKLISTED_ON_LOGIN.includes(to.fullPath)
    if (unsafe && isAuthorized) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
