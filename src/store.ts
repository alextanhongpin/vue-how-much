import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import product from '@/modules/product'
import RootState from '@/types/root-state'
import router from './router'

Vue.use(Vuex)

const delay = async (duration = 1000) =>
  new Promise(resolve => window.setTimeout(resolve, duration))

const KEY_NAME = 'access_token'

const store: StoreOptions<RootState> = {
  state: {
    version: process.env.VUE_APP_VERSION || '0.0.1',
    accessToken: '',
    error: '',
    loading: false
  },

  getters: {
    version (state: RootState) {
      return state.version
    },

    authorized (state: RootState) {
      return !!state.accessToken
    },

    error (state: RootState) {
      return state.error
    },

    loading (state: RootState) {
      return state.loading
    }
  },

  mutations: {
    SET_ACCESS_TOKEN (state: RootState, accessToken: string) {
      state.accessToken = accessToken
    },

    SET_ERROR (state: RootState, error: string) {
      state.error = error
    },

    SET_LOADING (state: RootState, loading: boolean) {
      state.loading = loading
    }
  },

  actions: {
    async fetchAccessToken ({ commit }) {
      const accessToken = window.localStorage.getItem(KEY_NAME)
      commit('SET_ACCESS_TOKEN', accessToken)
    },

    async postLogin ({ commit, dispatch }, email: string, password: string) {
      try {
        commit('SET_LOADING', true)
        await delay(250)

        // TODO: Remove hardcoded implementation.
        if (email !== 'john.doe@mail.com') throw new Error('bad error')
        dispatch('login', 'xyz')
        commit('SET_ERROR', '')
      } catch (error) {
        dispatch('logout')
        commit('SET_ERROR', error.message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    login ({ commit }, accessToken: string) {
      window.localStorage.setItem(KEY_NAME, accessToken)
      commit('SET_ACCESS_TOKEN', accessToken)
    },

    logout ({ commit }) {
      window.localStorage.removeItem(KEY_NAME)
      commit('SET_ACCESS_TOKEN', '')
    }
  },

  modules: {
    product
  }
}

export default new Vuex.Store<RootState>(store)
