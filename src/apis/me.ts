import request, { REQUIRE_AUTH } from '@/apis/base'
import { ApiErrorResponse, ApiResponse } from '@/apis/types/api'
import {
  PostMeRequest,
  PostMeResponse,
  PatchCurrencyRequest,
  PatchCurrencyResponse
} from '@/apis/types/me'

export function postMe ({

}: PostMeRequest): Promise<ApiResponse<PostMeResponse>, ApiErrorResponse> {
  return request(
    {
      url: '/me',
      method: 'post'
    },
    REQUIRE_AUTH
  )
}

export function patchCurrency ({
  currency
}: PatchCurrencyRequest): Promise<
  ApiResponse<PatchCurrencyResponse>,
  ApiErrorResponse
> {
  return request<PatchCurrencyResponse>(
    {
      url: '/me',
      method: 'patch',
      data: {
        currency
      }
    },
    REQUIRE_AUTH
  )
}
