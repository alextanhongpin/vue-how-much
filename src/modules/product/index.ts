import { Module } from 'vuex'

import RootState from '@/types/root-state'
import ProductState from '@/types/product-state'
import Product from '@/types/product'
import ProductPrice from '@/types/product-price'

import actions from '@/modules/product/actions'
import mutations from '@/modules/product/mutations'
import getters from '@/modules/product/getters'

const namespaced: boolean = true

export const state: ProductState = {
  keyword: '',
  product: {} as Product,
  throttle: -1,
  products: [] as Product[],
  productPrices: [] as ProductPrice[]
}

const product: Module<ProductState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
}

export default product
