import axios from 'axios'
import { ApiResponse, ApiErrorResponse } from '@/apis/types/error'
import { getAccessToken, removeAccessToken } from '@/models/auth'

const client = axios.create({
  baseURL: process.env.VUE_APP_SERVICE_URI || 'http://localhost:3000',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
})

function withAuthHeader (headers = {}) {
  return {
    ...headers,
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getAccessToken()}`
  }
}

export const REQUIRE_AUTH = true

export default async function request<T> (
  params,
  withAuth = false
): Promise<ApiResponse<T>, ApiErrorResponse> {
  const { headers = client.defaults.headers, ...rest } = params
  return client.request({
    // url: '/',
    // data: {},
    // params: {},
    headers: withAuth ? withAuthHeader(headers) : headers,
    ...rest
  })
}
