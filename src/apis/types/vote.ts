import Vote from '@/types/vote'

export interface VoteRequest {
  productPriceId: string
  vote: int
}

export interface VoteResponse {
  success: boolean
}

export interface GetVotesRequest {
}

export interface GetVotesResponse {
  data Vote[]
}
