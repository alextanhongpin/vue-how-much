export interface ApiError {
  code: string
  message: string
}

export interface ApiResponse<T> {
  status: number
  data: T
}

export type ApiErrorResponse = ApiResponse<ApiError>
