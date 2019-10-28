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

client.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    console.error('apiError:', error.message)
    if (error && error.response && error.response.status === 401) {
      removeAccessToken()
      window.location.replace('/login')
    }
    return Promise.reject(error)
  }
)

export async function requestPublic<T> (
  params
): Promise<ApiResponse<T>, ApiErrorResponse> {
  return client.request(params)
}

export async function requestPrivate<T> (
  params
): Promise<ApiResponse<T>, ApiErrorResponse> {
  const { headers = client.defaults.headers, ...rest } = params
  // url: '/',
  // data: {},
  // params: {},
  return client.request({
    headers: {
      ...headers,
      Authorization: `Bearer ${getAccessToken()}`
    },
    ...rest
  })
}
