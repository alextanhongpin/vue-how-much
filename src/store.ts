import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import product from '@/modules/product'
import RootState from '@/types/root-state'
import Credential from '@/types/credential'

import router from './router'
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken
} from '@/models/auth'
import { postLogin, postRegister, postMe, patchCurrency } from '@/apis/auth'

Vue.use(Vuex)

const delay = async (duration = 1000) =>
  new Promise(resolve => window.setTimeout(resolve, duration))

const store: StoreOptions<RootState> = {
  state: {
    version: process.env.VUE_APP_VERSION || '0.0.1',
    accessToken: '',
    error: '',
    loading: false,
    name: '',
    currency: '',
    email: ''
  },

  getters: {
    version (state: RootState): string {
      return state.version
    },

    authorized (state: RootState): boolean {
      return !!state.accessToken
    },

    error (state: RootState): string {
      return state.error
    },

    loading (state: RootState): boolean {
      return state.loading
    },

    name (state: RootState): string {
      return state.name
    },

    currency (state: RootState): string {
      return state.currency
    },

    email (state: RootState): string {
      return state.email
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
    },

    SET_CURRENCY (state: RootState, currency: string) {
      state.currency = currency
    },

    SET_USER_INFO (state: RootState, { name, currency, email }) {
      state.name = name
      state.currency = currency
      state.email = email
    }
  },

  actions: {
    async fetchAccessToken ({ commit }) {
      const accessToken = getAccessToken()
      commit('SET_ACCESS_TOKEN', accessToken)
    },

    async postLogin ({ commit, dispatch }, { email, password }: Credential) {
      try {
        commit('SET_ERROR', '')
        commit('SET_LOADING', true)
        const { status, data } = await postLogin(email, password)
        const { access_token: accessToken } = data

        dispatch('login', accessToken)
      } catch (error) {
        const { message } = error.response.data
        dispatch('logout')
        commit('SET_ERROR', message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async postRegister ({ commit, dispatch }, { email, password }: Credential) {
      try {
        commit('SET_ERROR', '')
        commit('SET_LOADING', true)
        const { status, data } = await postRegister(email, password)
        const { access_token: accessToken } = data

        dispatch('login', accessToken)
      } catch (error) {
        const isAxiosError = error && error.response && error.response.data
        console.error('loginError:', error)
        const message = isAxiosError
          ? error.response.data.message
          : error.message
        dispatch('logout')
        commit('SET_ERROR', message)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async postMe ({ commit, dispatch }) {
      try {
        commit('SET_LOADING', true)
        const { status, data } = await postMe()
        const { name, email, currency } = data
        commit('SET_USER_INFO', { name, email, currency })
      } catch (error) {
        const { data, status } = error.response
        commit('SET_ERROR', data.message)
        if (status === 401) {
          return dispatch('logout')
        }
      } finally {
        commit('SET_LOADING', false)
      }
    },

    login ({ commit }, accessToken: string) {
      setAccessToken(accessToken)
      commit('SET_ACCESS_TOKEN', accessToken)
    },

    logout ({ commit }) {
      removeAccessToken()
      commit('SET_ACCESS_TOKEN', '')
    },

    async updateCurrency ({ commit }, currency: string) {
      const prevCurrency = this.currency
      commit('SET_CURRENCY', currency)
      const undo = () => commit('SET_CURRENCY', prevCurrency)
      try {
        const { data } = patchCurrency(currency)
      } catch (error) {
        undo()
        const { data, status } = error.response
        commit('SET_ERROR', data.message)
        if (status === 401) {
          return dispatch('logout')
        }
      }
    }
  },

  modules: {
    product
  }
}

export default new Vuex.Store<RootState>(store)
