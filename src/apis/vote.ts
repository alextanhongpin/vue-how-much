import { requestPrivate } from '@/apis/base'

// Types.
import { ApiResponse, ApiErrorResponse } from '@/apis/types/api'
import { VoteRequest, VoteResponse } from '@/apis/types/vote'

// Apis.
export function postVote ({
  productPriceId,
  vote
}: VoteRequest): Promise<ApiResponse<VoteResponse>, ApiErrorResponse> {
  return requestPrivate<VoteResponse>({
    url: `/v1/prices/${productPriceId}/votes`,
    method: 'post',
    data: {
      vote
    }
  })
}
