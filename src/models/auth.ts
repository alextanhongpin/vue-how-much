const KEY = 'access_token'

export function getAccessToken (): string {
  const accessToken = window.localStorage.getItem(KEY) || ''
  return accessToken.trim()
}

export function removeAccessToken () {
  window.localStorage.removeItem(KEY)
}

export function setAccessToken (accessToken: string) {
  window.localStorage.setItem(KEY, accessToken)
}
