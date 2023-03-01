import axios from 'axios'
import { Message } from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 请求超时时间
})

// request interceptor 请求拦截器
service.interceptors.request.use()

// response interceptor 响应拦截器
service.interceptors.response.use(res => {
  const { success, message, data } = res.data
  if (success) { // 成功就向外提供解构后的data
    return data
  } else { // 失败就提示用户
    Message.warning(message)
    return Promise.reject(message)
  }
}, err => {
  // 页面提示错误
  Message.warning(err.message)
  // 让函数进入catch中 并显示错误
  return Promise.reject(err.message)
})

export default service
