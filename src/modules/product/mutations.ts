import { MutationTree } from 'vuex'
import ProductState from '@/types/product-state'
import Position from '@/types/position'

const mutations: MutationTree<ProductState> = {
  SET_POSITION (state: ProductState, position: Position) {
    state.position = position
  },

  SET_CITY (state: ProductState, city: string) {
    state.city = city
  },

  SET_PRODUCT (state: ProductState, product: string) {
    state.product = product
  },

  SET_THROTTLE (state: ProductState, throttle: number) {
    state.throttle && window.clearTimeout(state.throttle)
    state.throttle = throttle
  }
}
export default mutations
