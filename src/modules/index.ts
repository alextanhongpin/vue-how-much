const nullFn = () => {}

export async function wrapFetch (
  { commit, dispatch },
  fn = nullFn,
  onError = nullFn
) {
  try {
    commit('SET_ERROR', '')
    commit('SET_LOADING', true)
    const res = await fn()
    return res
  } catch (error) {
    onError && onError(error)
    const { data, status }: ApiErrorResponse = error.response
    commit('SET_ERROR', data.message)
    if (status === 401) return dispatch('logout', null, { root: true })
  } finally {
    commit('SET_LOADING', false)
  }
}
