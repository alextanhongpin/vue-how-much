import ProductInfo from '@/models/product-info'
import ProductPrice from '@/models/product-price'

export interface SearchRequest {
  q: string
}

export interface SearchResponse {
  data: []ProductInfo
}

export interface CreateProductRequest {
  name: string
  price: number
  currency: string
}

export interface CreateProductResponse {
  success: boolean
}

export interface GetProductPriceAndVotesRequest {
  currency: string
  productId: string
}

export interface GetProductPriceAndVotesResponse {
  data: ProductPrice[]
}
