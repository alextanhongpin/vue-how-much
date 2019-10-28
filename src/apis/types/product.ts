import ProductInfo from '@/models/product-info'
import ProductPrice from '@/models/product-price'

export interface SearchRequest {
  q: string
}

export interface SearchResponse {
  data: []ProductInfo
}

export interface CreateRequest {
  name: string
  price: number
  currency: string
}

export interface CreateResponse {
  success: boolean
}

export interface GetPricesRequest {
  currency: string
  productId: string
}

export interface GetPricesResponse {
  data: ProductPrice[]
}
