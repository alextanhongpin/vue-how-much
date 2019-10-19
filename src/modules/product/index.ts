import { Module } from 'vuex'
import RootState from '@/types/root-state'
import ProductState from '@/types/product-state'
import actions from '@/modules/product/actions'
import mutations from '@/modules/product/mutations'
import getters from '@/modules/product/getters'

const namespaced: boolean = true

export const state: ProductState = {
  product: '',
  position: {} as Position,
  city: '' as string,
  throttle: -1
}

const product: Module<ProductState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
}

export default product
