const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 快捷访问token
  name: state => state.user.userInfo.username, // 快捷访问用户名
  userId: state => state.user.userInfo.userId, // 快速访问用户id
  staffPhoto: state => state.user.userInfo.staffPhoto, // 建立用户头像的映射
  companyId: state => state.user.userInfo.companyId, // 建立快速访问企业id
  routes: state => state.permission.routes // 导出当前的路由
}
export default getters
