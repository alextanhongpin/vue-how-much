import { MutationTree } from 'vuex'
import ProductState from '@/types/product-state'
import Product from '@/types/product'
import Position from '@/types/position'

const mutations: MutationTree<ProductState> = {
  SET_POSITION (state: ProductState, position: Position) {
    state.position = position
  },

  SET_CITY (state: ProductState, city: string) {
    state.city = city
  },

  SET_PRODUCT (state: ProductState, product: Product) {
    state.product = product
  },

  SET_KEYWORD (state: ProductState, keyword: string) {
    state.keyword = keyword
  },

  SET_THROTTLE (state: ProductState, throttle: number) {
    state.throttle && window.clearTimeout(state.throttle)
    state.throttle = throttle
  }
}
export default mutations
