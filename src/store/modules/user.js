import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { Login, getUserInfo, getUserSimple } from '@/api/user'
import { resetRouter } from '@/router'
// 状态
const state = {
  token: getToken() || null, // 获取cookie里面存储的token
  userInfo: {} // 用户基本资料
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
  },
  // 获得用户的基本资料存入state
  addUserInfo(state, result) {
    state.userInfo = result
  },
  // 清除state中的userinfo
  delUserInfo(state) {
    state.userInfo = {}
  }
}
// 异步方法
const actions = {
  // 封装一个登陆的方法
  async login(context, data) {
    const result = await Login(data) // 获取token
    context.commit('updateToken', result) // 存入token
    setTimeStamp() // 存入当前时间戳
  },
  // 封装一个获取用户基本信息的方法
  async gainUserInfo(context) {
    const result = await getUserInfo()
    // console.log(result)
    const personal = await getUserSimple(result.userId)
    context.commit('addUserInfo', { ...result, ...personal })
    return result // 为后面权限处理埋伏笔
  },
  // 封装一个退出登陆的方法
  logout(context) {
    context.commit('delToken') // 清除token
    context.commit('delUserInfo') // 清除用户信息
    context.commit('permission/addRoutes', [], { root: true }) // 将路由重置为静态路由
    resetRouter() // 重置路由
  }
}
export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}

