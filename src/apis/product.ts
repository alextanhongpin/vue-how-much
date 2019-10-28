import { requestPrivate } from '@/apis/base'
import { ApiResponse, ApiErrorResponse } from '@/apis/types/api'

// Imports the request/response pair types.
import {
  SearchRequest,
  SearchResponse,
  CreateRequest,
  CreateResponse,
  GetPricesRequest,
  GetPricesResponse
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

export function create ({
  name,
  currency,
  price
}: CreateRequest): Promise<ApiResponse<CreateResponse>, ApiErrorResponse> {
  return requestPrivate<CreateResponse>({
    url: '/v1/products',
    method: 'post',
    data: {
      name,
      currency,
      price
    }
  })
}

export function getPrices ({
  productId,
  currency
}: GetPricesRequest): Promise<
  ApiResponse<GetPricesResponse>,
  ApiErrorResponse
> {
  return requestPrivate<GetPricesResponse>({
    url: `/v1/products/${productId}`,
    method: 'get',
    params: { currency }
  })
}
