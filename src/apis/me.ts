import { requestPrivate } from '@/apis/base'
import { ApiErrorResponse, ApiResponse } from '@/apis/types/api'
import {
  PostMeRequest,
  PostMeResponse,
  PatchCurrencyRequest,
  PatchCurrencyResponse
} from '@/apis/types/me'

export function postMe (
  _req: PostMeRequest
): Promise<ApiResponse<PostMeResponse>, ApiErrorResponse> {
  console.log('posting me')
  return requestPrivate<PostMeResponse>({
    url: '/me',
    method: 'post'
  })
}

export function patchCurrency ({
  currency
}: PatchCurrencyRequest): Promise<
  ApiResponse<PatchCurrencyResponse>,
  ApiErrorResponse
> {
  return requestPrivate<PatchCurrencyResponse>({
    url: '/me',
    method: 'patch',
    data: {
      currency
    }
  })
}
