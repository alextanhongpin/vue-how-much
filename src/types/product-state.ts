import Position from '@/types/position'
import Product from '@/types/product'
import ProductPrice from '@/types/product-price'
import Vote from '@/types/vote'

export default interface ProductState {
  keyword: string
  position: Position
  city: string
  throttle: number
  products: Product[]
  product?: Product
  productPrices: ProductPrice[]
  loading: boolean
  error: string
  votes: Vote[]
}
