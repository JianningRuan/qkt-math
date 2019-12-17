import Cookies from 'js-cookie'

const TokenKey = 'qkt-token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token, { expires: 1, path: '' }) // 7天过期
}

export function removeToken () {
  return Cookies.remove(TokenKey, { path: '' })
}
