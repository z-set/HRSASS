import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() { // 获取缓存的token
  return Cookies.get(TokenKey)
}

export function setToken(token) { // 存入token
  return Cookies.set(TokenKey, token)
}

export function removeToken() { // 移除token
  return Cookies.remove(TokenKey)
}
