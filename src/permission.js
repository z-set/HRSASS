// token鉴权模块
import router from './router'
import store from './store'
import NProgress from 'nprogress'
const whilteList = ['/login', '/404']

// 前置路由守卫
router.beforeEach(async(to, from, next) => {
  // 打开进度条
  NProgress.start()
  // 判断有无token
  if (store.getters.token) {
    // 有token时 判断有没有获取用户资料,没有就发起请求获取
    if (!store.getters.userId) {
      const result = await store.dispatch('user/gainUserInfo') // 获取用户资料之后再放行
      // 调用vuex子模块permission中的actions里面的方法得到有权限的路由数组
      // result.roles.menus 是个人信息中返回的权限标识数组
      const routes = await store.dispatch('permission/filterRoutes', result.roles.menus)
      // routes 是返回的有权限的路由规则数组 用router.addRoute遍历追加到路由规则中
      // { path: '*', redirect: '/404', hidden: true } 404页面添加在最后面
      router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
      next(to.path) // vue缺陷 需要重新跳转一次
    }
    // 有token时,判断是否在登录页
    if (to.path === '/login') {
      next('/') // 跳转到主页 实现免登录的过程
    } else {
      next() // 放行
    }
  } else {
    // 没有token时,判断是否在不受token限制的白名单里面
    if (whilteList.some(item => item === to.path)) {
      next() // 放行
    } else {
      next('/login') // 跳转到登录页
    }
  }
  // 关闭进度条
  NProgress.done()
})

// 后置路由守卫
router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
