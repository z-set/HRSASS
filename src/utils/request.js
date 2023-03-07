import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getTimeStamp } from './auth'
import router from '@/router'

const validTime = 5400 // token有效时间 秒

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 请求超时时间
})

// request interceptor 请求拦截器
service.interceptors.request.use(config => {
  // 判断有无token 有的话统一添加请求头 Authorization
  if (store.getters.token) {
    // 在有token的情况下判断token是否过期
    if (isValid()) {
      store.dispatch('user/logout') // 退出登陆清除数据
      router.push('/login')
      return Promise.reject(new Error('登陆超时'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

// response interceptor 响应拦截器
service.interceptors.response.use(res => {
  const { success, message, data } = res.data
  if (success) { // 成功就向外提供解构后的data
    return data
  } else { // 失败就提示用户
    Message.warning(message)
    return Promise.reject(new Error(message)) // 创建一个错误对象返回错误
  }
}, err => {
  // 判断是不是token超时服务器响应的错误
  if (err.response && err.response.data && err.response.data.code === 10002) {
    store.dispatch('user/logout') // 退出登陆清除数据
    router.push('/login')
  } else {
    // 页面提示错误
    Message.warning(err.message)
  }
  // 让函数进入catch中 并显示错误
  return Promise.reject(err.message)
})

// 封装一个判断token是否过期的函数
function isValid() {
  const nowTime = +new Date()
  const startTime = getTimeStamp()
  return (nowTime - startTime) / 1000 > validTime
}

export default service
