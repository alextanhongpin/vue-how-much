import { requestPrivate } from '@/apis/base'
import { ApiResponse, ApiErrorResponse } from '@/apis/types/api'

// Imports the request/response pair types.
import {
  SearchRequest,
  SearchResponse,
  CreateProductRequest,
  CreateProductResponse,
  GetProductPriceAndVotesRequest,
  GetProductPriceAndVotesResponse
} from '@/apis/types/product'

export function search ({
  q
}: SearchRequest): Promise<ApiResponse<SearchResponse>, ApiErrorResponse> {
  return requestPrivate<SearchResponse>({
    url: '/v1/search',
    method: 'get',
    params: { q }
  })
}

export function createProduct ({
  name,
  currency,
  price
}: CreateProductRequest): Promise<
  ApiResponse<CreateProductResponse>,
  ApiErrorResponse
> {
  return requestPrivate<CreateProductResponse>({
    url: '/v1/products',
    method: 'post',
    data: {
      name,
      currency,
      price
    }
  })
}

export function getProductPriceAndVotes ({
  productId,
  currency
}: GetProductPriceAndVotesRequest): Promise<
  ApiResponse<GetProductPriceAndVotesResponse>,
  ApiErrorResponse
> {
  return requestPrivate<GetProductPriceAndVotesRequest>({
    url: `/v1/products/${productId}`,
    method: 'get',
    params: { currency }
  })
}
