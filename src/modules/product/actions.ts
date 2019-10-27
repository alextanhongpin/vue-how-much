import { ActionTree } from 'vuex'

// Types.
import RootState from '@/types/root-state'
import ProductState from '@/types/product-state'
import Product from '@/types/product'
import { wrapFetch } from '@/modules'

// Api calls.
import { search, createProduct } from '@/apis/product'
import { ApiResponse } from '@/apis/types/api'

// Request/response types pair for each api call.
import {
  SearchRequest,
  SearchResponse,
  CreateProductRequest,
  CreateProductResponse
} from '@/apis/types/product'

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

  updateKeyword ({ commit, dispatch }, q: string) {
    commit('SET_KEYWORD', q)
    commit(
      'SET_THROTTLE',
      window.setTimeout(() => {
        wrapFetch({ commit, dispatch }, async () => {
          const req: SearchRequest = { q }
          const res: SearchResponse = (await search({ q })).data || []
          commit('SET_PRODUCTS', res.data)
        })
      }, 250)
    )
  },

  updateProduct ({ commit }, product: Product) {
    commit('SET_PRODUCT', product)
  },

  createProduct ({ commit, dispatch, getters, rootGetters }, product: Product) {
    return wrapFetch({ commit, dispatch }, async () => {
      // Ensure that the currency is always set.
      if (!rootGetters.currency) {
        await dispatch('postMe', null, { root: true })
      }
      const req: CreateProductRequest = {
        name: product.name,
        price: product.price,
        currency: rootGetters.currency
      }
      const res: CreateProductResponse = (await createProduct(req)).data || {}
      return res.success
    })
  }
}

export default actions
