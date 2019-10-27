import request, { REQUIRE_AUTH } from '@/apis/base'
import {
  PostRegisterRequest,
  PostRegisterResponse,
  PostLoginRequest,
  PostLoginResponse
} from '@/apis/types/auth'
import { ApiErrorResponse, ApiResponse } from '@/apis/types/api'

export function postLogin ({
  email,
  password
}: PostLoginRequest): Promise<
  ApiResponse<PostLoginResponse>,
  ApiErrorResponse
> {
  return request<PostLoginResponse>({
    url: '/login',
    method: 'post',
    data: {
      email,
      password
    }
  })
}

export function postRegister ({
  email,
  password
}: PostRegisterRequest): Promise<
  ApiResponse<PostRegisterResponse>,
  ApiErrorResponse
> {
  return request<PostRegisterResponse>({
    url: '/register',
    method: 'post',
    data: {
      email,
      password
    }
  })
}

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

export function patchCurrency (currency: string) {
  return request(
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
