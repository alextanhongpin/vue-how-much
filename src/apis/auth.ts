import request, { REQUIRE_AUTH } from '@/apis/base'

export function postLogin (email: string, password: string) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      email,
      password
    }
  })
}

export function postRegister (email: string, password: string) {
  return request({
    url: '/register',
    method: 'post',
    data: {
      email,
      password
    }
  })
}

export function postMe () {
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
