import request from '@/utils/request'

/*
**登陆的接口
*/
export const Login = data => request({
  method: 'POST',
  url: '/sys/login',
  data
})

export function getInfo(token) {
  return request()
}

export function logout() {
  return request()
}
