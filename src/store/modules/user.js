import { getToken, setToken, removeToken } from '@/utils/auth'
import { Login } from '@/api/user'
// 状态
const state = {
  token: getToken() || null // 获取cookie里面存储的token
}
// 同步方法
const mutations = {
  // token发生变化时 修改状态并存入cookie
  updateToken(state, token) {
    state.token = token
    setToken(token)
  },
  // 移除token 清除cookie
  delToken(state) {
    state.token = null
    removeToken()
  }
}
// 异步方法
const actions = {
  // 封装一个登陆的方法
  async login(context, data) {
    const result = await Login(data)
    context.commit('updateToken', result)
  }
}
export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}

