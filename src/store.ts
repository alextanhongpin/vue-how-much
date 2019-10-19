import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import product from '@/modules/product'
import RootState from '@/types/root-state'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
    version: '0.0.1'
  },
  getters: {
    version (state: RootState) {
      return state.version
    }
  },
  mutations: {},
  actions: {},
  modules: {
    product
  }
}

export default new Vuex.Store<RootState>(store)
