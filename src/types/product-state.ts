import Position from '@/types/Position'
import Product from '@/types/Product'
import ProductPrice from '@/types/ProductPrice'

export default interface ProductState {
  keyword: string
  position: Position
  city: string
  throttle: number
  products: Product[]
  product?: Product
  productPrices: ProductPrice[]
}
