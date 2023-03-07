import Cookies from 'js-cookie'

const TokenKey = 'hrsass_token'
const TimeStamp = 'hrsass-timestape'

export function getToken() { // 获取缓存的token
  return Cookies.get(TokenKey)
}

export function setToken(token) { // 存入token
  return Cookies.set(TokenKey, token)
}

export function removeToken() { // 移除token
  return Cookies.remove(TokenKey)
}

// 存入当前时间戳
export const setTimeStamp = () => Cookies.set(TimeStamp, +new Date())

// 获取存入的时间戳
export const getTimeStamp = () => Cookies.get(TimeStamp)
