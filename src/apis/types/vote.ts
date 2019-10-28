import Vote from '@/types/vote'

export interface PostVoteRequest {
  productPriceId: string
  vote: int
}

export interface PostVoteResponse {
  success: boolean
}

export interface GetVotesRequest {
}

export interface GetVotesResponse {
  data Vote[]
}
