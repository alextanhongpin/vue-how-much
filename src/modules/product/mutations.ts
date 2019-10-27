import { MutationTree } from 'vuex'
import ProductState from '@/types/product-state'
import Product from '@/types/product'
import ProductPrice from '@/types/product-price'
import Position from '@/types/position'

const mutations: MutationTree<ProductState> = {
  SET_POSITION (state: ProductState, position: Position) {
    state.position = position
  },

  SET_CITY (state: ProductState, city: string) {
    state.city = city
  },

  SET_PRODUCT (state: ProductState, product?: Product) {
    state.product = product
  },

  SET_KEYWORD (state: ProductState, keyword: string) {
    state.keyword = keyword
  },

  SET_THROTTLE (state: ProductState, throttle: number) {
    state.throttle && window.clearTimeout(state.throttle)
    state.throttle = throttle
  },

  SET_LOADING (state: ProductState, loading: boolean) {
    state.loading = loading
  },

  SET_ERROR (state: ProductState, error: string) {
    state.error = error
  },

  SET_PRODUCTS (state: ProductState, products: Product[]) {
    state.products = products
  },

  SET_PRODUCT_PRICES (state: ProductState, productPrices: ProductPrice[]) {
    state.productPrices = productPrices
  }
}
export default mutations
