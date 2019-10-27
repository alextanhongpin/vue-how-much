import ProductInfo from '@/models/product-info'

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
