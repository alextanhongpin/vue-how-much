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
    if (error && error.response && error.response.data) {
      const { data, status }: ApiErrorResponse = error.response
      const message = (data && data.message) || error.message
      commit('SET_ERROR', message)
      if (status === 401) return dispatch('logout', null, { root: true })
    } else {
      commit('SET_ERROR', error.message)
    }
  } finally {
    commit('SET_LOADING', false)
  }
}
