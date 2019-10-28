import { ActionTree } from 'vuex'

// Types.
import RootState from '@/types/root-state'
import ProductState from '@/types/product-state'
import Product from '@/types/product'
import { wrapFetch } from '@/modules'

// Api calls.
import { search, create, getPrices } from '@/apis/product'
import { postVote, getVotes } from '@/apis/vote'
import { ApiResponse } from '@/apis/types/api'

// Request/response types pair for each api call.
import {
  SearchRequest,
  SearchResponse,
  CreateRequest,
  CreateResponse,
  GetPricesRequest,
  GetPricesResponse
} from '@/apis/types/product'
import {
  PostVoteRequest,
  PostVoteResponse,
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
    await dispatch('getPrices')
    await dispatch('getVotes')
  },

  getPrices ({ commit, dispatch, getters, rootGetters }) {
    if (!getters.productId) {
      return
    }

    return wrapFetch({ commit, dispatch }, async () => {
      await dispatch('fetchCurrency')
      const req: GetPricesRequest = {
        productId: getters.productId,
        currency: rootGetters.currency
      }
      const res: GetPricesResponse = (await getPrices(req)).data || {}
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
      const req: CreateRequest = {
        name: product.name,
        price: product.price,
        currency: rootGetters.currency
      }
      const res: CreateResponse = (await create(req)).data || {}
      return res.success
    })
  },

  async postVote ({ commit, dispatch }, { vote, productPriceId }) {
    await wrapFetch({ commit, dispatch }, async () => {
      const req: PostVoteRequest = { vote, productPriceId }
      const res: PostVoteResponse = (await postVote(req)).data || {}
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
