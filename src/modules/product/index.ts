import { Module } from 'vuex'

import RootState from '@/types/root-state'
import ProductState from '@/types/product-state'
import Product from '@/types/product'
import ProductPrice from '@/types/product-price'

import actions from '@/modules/product/actions'
import mutations from '@/modules/product/mutations'
import getters from '@/modules/product/getters'

const namespaced: boolean = true
const PRODUCTS =
  '3M, Alienware, Amazon, AMD, Analog Devices, Apple, Audiovox, Avaya, Averatec, Bose, Cisco Systems, Crucial Technology, Dell, eMachines, Emerson Electric, Emerson Radio, Fitbit, Gateway, Google, Hewlett-Packard, HP, IBM, Intel, Kingston, Koss, Magnavox, Micron Technology, Microsoft, Motorola, Nvidia, Packard Bell, Qualcomm, RCA, Sandisk, Seagate, SGI, Sun Microsystems, Texas Instruments, Unisonic Products Corporation, Unisys, Vizio, Viewsonic, Western Digital, Westinghouse Electric Corporation, Xerox, Zenith'

const products: Product[] = PRODUCTS.split(', ').map((name, id) => {
  return {
    name,
    id
  }
})
const productPrices: ProductPrice[] = products.flatMap(
  ({ name, id }: Product) => {
    return Array(3)
      .fill()
      .map((_, i) => {
        return {
          productId: id,
          price: parseFloat((Math.random() * 250).toFixed(2)),
          upvotes: Math.ceil(Math.random() * 100),
          downvotes: Math.ceil(Math.random() * 100)
        }
      })
  }
)

export const state: ProductState = {
  keyword: '',
  product: {} as Product,
  position: {} as Position,
  city: '' as string,
  throttle: -1,
  // products: [] as Product[]
  products,
  productPrices
}

const product: Module<ProductState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
}

export default product
