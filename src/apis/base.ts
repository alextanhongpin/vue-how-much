import axios from 'axios'
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

export default async function request (params, withAuth = false) {
  const { headers = client.defaults.headers, ...rest } = params
  return client.request({
    // url: '/',
    // data: {},
    // params: {},
    headers: withAuth ? withAuthHeader(headers) : headers,
    ...rest
  })
}
