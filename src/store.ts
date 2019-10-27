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
import { postLogin, postRegister } from '@/apis/auth'
import { postMe, patchCurrency } from '@/apis/me'
import { ApiResponse } from '@/apis/types/api'
import {
  PostRegisterRequest,
  PostRegisterResponse,
  PostLoginRequest,
  PostLoginResponse
} from '@/apis/types/auth'
import {
  PostMeRequest,
  PostMeResponse,
  PatchCurrencyRequest,
  PatchCurrencyResponse
} from '@/apis/types/me'

Vue.use(Vuex)

const delay = async (duration = 1000) =>
  new Promise(resolve => window.setTimeout(resolve, duration))

const nullFn = () => {}

async function wrapFetch ({ commit, dispatch }, fn = nullFn, onError = nullFn) {
  try {
    commit('SET_ERROR', '')
    commit('SET_LOADING', true)
    const res = await fn()
    return res
  } catch (error) {
    onError && onError(error)
    const { data, status }: ApiErrorResponse = error.response
    commit('SET_ERROR', data.message)
    if (status === 401) return dispatch('logout')
  } finally {
    commit('SET_LOADING', false)
  }
}

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
    fetchAccessToken ({ commit }) {
      const accessToken = getAccessToken()
      commit('SET_ACCESS_TOKEN', accessToken)
    },

    async postLogin ({ commit, dispatch }, { email, password }: Credential) {
      return wrapFetch({ commit, dispatch }, async () => {
        const req: PostLoginRequest = { email, password }
        const res: PostLoginResponse = (await postLogin(req)).data || {}
        dispatch('login', res.access_token)
      })
    },

    async postRegister ({ commit, dispatch }, { email, password }: Credential) {
      return wrapFetch({ commit, dispatch }, async () => {
        const req: PostRegisterRequest = { email, password }
        const res: PostRegisterResponse = (await postRegister(req)).data || {}
        dispatch('login', res.access_token)
      })
    },

    async postMe ({ commit, dispatch }) {
      return wrapFetch({ commit, dispatch }, async () => {
        const req: PostMeRequest = {}
        const res: PostMeResponse = (await postMe(req)).data || {}
        commit('SET_USER_INFO', res)
      })
    },

    login ({ commit }, accessToken: string) {
      setAccessToken(accessToken)
      commit('SET_ACCESS_TOKEN', accessToken)
    },

    logout ({ commit }) {
      removeAccessToken()
      commit('SET_ACCESS_TOKEN', '')
    },

    async updateCurrency ({ commit, dispatch }, currency: string) {
      const prevCurrency = this.currency
      commit('SET_CURRENCY', currency)
      const undo = () => commit('SET_CURRENCY', prevCurrency)
      return wrapFetch(
        { commit, dispatch },
        async () => {
          const req: PatchCurrencyRequest = { currency }
          const res: PatchCurrencyResponse =
            (await patchCurrency(req)).data || {}
        },
        () => undo()
      )
    }
  },

  modules: {
    product
  }
}

export default new Vuex.Store<RootState>(store)
