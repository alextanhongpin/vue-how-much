import { ActionTree } from 'vuex'

// Types.
import RootState from '@/types/root-state'
import ProductState from '@/types/product-state'
import Product from '@/types/product'

// Models.
import { getClosestCity } from '@/models/cities'

const actions: ActionTree<ProductState, RootState> = {
  getGeolocation ({ commit, dispatch }) {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords
        const position = { latitude, longitude }
        commit('SET_POSITION', position)

        const city = getClosestCity(position)
        if (city && city.name) {
          dispatch('updateCity', city.name)
        }
      })
    }
  },

  updateCity ({ commit }, city: string) {
    commit('SET_CITY', city)
  },

  updateKeyword ({ commit }, keyword: string) {
    commit('SET_KEYWORD', keyword)
    commit(
      'SET_THROTTLE',
      window.setTimeout(() => {
        console.log(keyword, 'debounced')
      }, 250)
    )
  },

  updateProduct ({ commit }, product: Product) {
    commit('SET_PRODUCT', product)
  }
}

export default actions
