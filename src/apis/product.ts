import request, { REQUIRE_AUTH } from '@/apis/base'

import { ApiResponse, ApiErrorResponse } from '@/apis/types/api'

// Imports the request/response pair types.
import {
  SearchResponse,
  SearchResponse,
  CreateProductRequest,
  CreateProductResponse,
  GetProductPriceAndVotesRequest,
  GetProductPriceAndVotesResponse
} from '@/apis/types/product'

export function search ({
  q
}: SearchRequest): Promise<ApiResponse<SearchResponse>, ApiErrorResponse> {
  return request(
    {
      url: '/v1/search',
      method: 'get',
      params: { q }
    },
    REQUIRE_AUTH
  )
}

export function createProduct ({
  name,
  currency,
  price
}: CreateProductRequest): Promise<
  ApiResponse<CreateProductResponse>,
  ApiErrorResponse
> {
  return request(
    {
      url: '/v1/products',
      method: 'post',
      data: {
        name,
        currency,
        price
      }
    },
    REQUIRE_AUTH
  )
}

export function getProductPriceAndVotes ({
  productId,
  currency
}: GetProductPriceAndVotesRequest): Promise<
  ApiResponse<GetProductPriceAndVotesResponse>,
  ApiErrorResponse
> {
  return request(
    {
      url: `/v1/products/${productId}`,
      method: 'get',
      params: { currency }
    },
    REQUIRE_AUTH
  )
}
