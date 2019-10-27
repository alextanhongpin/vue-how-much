import { GetterTree } from 'vuex'

// Types.
import RootState from '@/types/root-state'
import ProductState from '@/types/product-state'
import Position from '@/types/position'
import ProductPrice from '@/types/product-price'
import Product from '@/types/product'

// Models.

const getters: GetterTree<ProductState, RootState> = {
  product (state: ProductState): string {
    return state.product
  },

  productId (state: ProductState): string {
    return (state.product && state.product.id) || ''
  },

  keyword (state: ProductState): string {
    return state.keyword
  },

  products (state: ProductState): Product[] {
    return state.products || []
  },

  productWithId (state: ProductState) {
    return (id: number) => {
      return state.products.find(product => product.id === id)
    }
  },

  productPrices (state: ProductState): ProductPrice[] {
    return state.productPrices
  },

  loading (state: ProductState) {
    return state.loading
  },

  error (state: ProductState) {
    return state.error
  }
}
export default getters
