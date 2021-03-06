export interface PostRegisterRequest {
  email: string
  password: string
}

export interface PostRegisterResponse {
  access_token: string
}

export interface PostLoginRequest {
  email: string
  password: string
}

export interface PostLoginResponse {
  access_token: string
}
