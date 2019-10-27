import { requestPublic } from '@/apis/base'
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
  return requestPublic<PostLoginResponse>({
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
  return requestPublic<PostRegisterResponse>({
    url: '/register',
    method: 'post',
    data: {
      email,
      password
    }
  })
}

