import { ActionTree } from 'vuex'

// Types.
import RootState from '@/types/root-state'
import ProductState from '@/types/product-state'
import Product from '@/types/product'
import { wrapFetch } from '@/modules'

// Api calls.
import { search, createProduct, getProductPriceAndVotes } from '@/apis/product'
import { postVote, getVotes } from '@/apis/vote'
import { ApiResponse } from '@/apis/types/api'

// Request/response types pair for each api call.
import {
  SearchRequest,
  SearchResponse,
  CreateProductRequest,
  CreateProductResponse,
  GetProductPriceAndVotesRequest,
  GetProductPriceAndVotesResponse
} from '@/apis/types/product'
import {
  VoteRequest,
  VoteResponse,
  GetVotesRequest,
  GetVotesResponse
} from '@/apis/types/vote'

const actions: ActionTree<ProductState, RootState> = {
  updateKeyword ({ commit, dispatch }, q: string) {
    commit('SET_KEYWORD', q)
  },

  searchKeyword ({ commit, dispatch }, q: string) {
    commit('SET_KEYWORD', q)

    commit(
      'SET_THROTTLE',
      window.setTimeout(() => {
        wrapFetch({ commit, dispatch }, async () => {
          const req: SearchRequest = { q }
          const res: SearchResponse = (await search({ q })).data || []
          commit('SET_PRODUCTS', res.data || [])
        })
      }, 250)
    )
  },

  async updateProduct ({ commit, dispatch }, product: Product) {
    commit('SET_PRODUCT', product)
    await dispatch('getProductPriceAndVotes')
    await dispatch('getVotes')
  },

  getProductPriceAndVotes ({ commit, dispatch, getters, rootGetters }) {
    if (!getters.productId) {
      return
    }

    return wrapFetch({ commit, dispatch }, async () => {
      await dispatch('fetchCurrency')
      const req: GetProductPriceAndVotesRequest = {
        productId: getters.productId,
        currency: rootGetters.currency
      }
      const res: GetProductPriceAndVotesResponse =
        (await getProductPriceAndVotes(req)).data || {}
      commit('SET_PRODUCT_PRICES', res.data || [])
    })
  },

  async fetchCurrency ({ dispatch, rootGetters }) {
    // Ensure that the currency is always set.
    if (!rootGetters.currency) {
      await dispatch('postMe', null, { root: true })
    }
  },

  createProduct ({ commit, dispatch, getters, rootGetters }, product: Product) {
    return wrapFetch({ commit, dispatch }, async () => {
      // Ensure that the currency is always set.
      await dispatch('fetchCurrency')
      const req: CreateProductRequest = {
        name: product.name,
        price: product.price,
        currency: rootGetters.currency
      }
      const res: CreateProductResponse = (await createProduct(req)).data || {}
      return res.success
    })
  },

  async postVote ({ commit, dispatch }, { vote, productPriceId }) {
    await wrapFetch({ commit, dispatch }, async () => {
      const req: VoteRequest = { vote, productPriceId }
      const res: VoteResponse = (await postVote(req)).data || {}
      return res.success
    })
    dispatch('getVotes')
  },

  getVotes ({ commit, dispatch }) {
    return wrapFetch({ commit, dispatch }, async () => {
      const req: GetVotesRequest = {}
      const res: GetVotesResponse = (await getVotes(req)).data || {}
      commit('SET_VOTES', res.data || [])
    })
  }
}

export default actions
