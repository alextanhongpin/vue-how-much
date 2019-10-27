export interface PostMeRequest {}

export interface PostMeResponse {
  email: string
  currency: string
  name: string
}

export interface PatchCurrencyRequest {
  currency: string
}

export interface PatchCurrencyResponse {
  success: boolean
}
