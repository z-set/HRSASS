import { constantRoutes, asyncRoutes } from '@/router' // 路由导入

const state = {
  // 存储路由状态 默认为静态路由
  routes: constantRoutes
}
const mutations = {
  // 基于静态路由的基础上追加有权限的动态路由 都为数组
  addRoutes(state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes]
  }
}
const actions = {
  // 通过后台返回的路由的name 筛选出后台返回的有权限的路由
  filterRoutes(context, perimRoutes) {
    // 得到有权限的新的路由数组
    const newRoutes = []
    //   筛选出 动态路由中和menus中能够对上的路由
    perimRoutes.forEach(key => {
      // key就是标识
      // asyncRoutes 找 有没有对象中的name属性等于 key的 如果找不到就没权限 如果找到了 要筛选出来
      newRoutes.push(...asyncRoutes.filter(item => item.name === key)) // 得到一个数组 有可能 有元素 也有可能是空数组
    })
    // 调用mutations的方法追加到state状态中
    context.commit('addRoutes', newRoutes)
    return newRoutes // 方便在路由守卫中追加到路由规则里面 router.addRoute()
  }
}

/**
 * 权限管理模块
 **/

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
