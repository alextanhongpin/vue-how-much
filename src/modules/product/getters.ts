import { GetterTree } from 'vuex'

// Types.
import RootState from '@/types/root-state'
import ProductState from '@/types/product-state'
import Position from '@/types/position'

// Models.
import { searchCities } from '@/models/cities'

const getters: GetterTree<ProductState, RootState> = {
  city (state: ProductState): string {
    return state.city
  },

  position (state: ProductState): Position {
    return state.position
  },

  cities (state: ProductState): string[] {
    if (state.city.length < 3) {
      return []
    }
    return searchCities(state.city)
  },

  product (state: ProductState): string {
    return state.product
  }
}
export default getters
