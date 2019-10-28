import { requestPrivate } from '@/apis/base'

// Types.
import { ApiResponse, ApiErrorResponse } from '@/apis/types/api'
import {
  PostVoteRequest,
  PostVoteResponse,
  GetVotesRequest,
  GetVotesResponse
} from '@/apis/types/vote'

// Apis.
export function postVote ({
  productPriceId,
  vote
}: PostVoteRequest): Promise<ApiResponse<PostVoteResponse>, ApiErrorResponse> {
  return requestPrivate<PostVoteResponse>({
    url: `/v1/votes`,
    method: 'post',
    data: {
      vote,
      product_price_id: productPriceId
    }
  })
}

export function getVotes (
  _req: GetVotesRequest
): Promise<ApiResponse<GetVotesResponse>, ApiErrorResponse> {
  return requestPrivate<GetVotesResponse>({
    url: `/v1/votes`,
    method: 'get'
  })
}
