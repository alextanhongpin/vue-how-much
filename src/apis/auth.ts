import request from '@/apis/base'

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
