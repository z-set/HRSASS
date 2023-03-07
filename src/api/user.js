import request from '@/utils/request'

/*
**登陆的接口
*/
export const Login = data => request({
  method: 'POST',
  url: '/sys/login',
  data
})
/*
**获取用户基本资料
*/
export const getUserInfo = () => request({
  method: 'POST',
  url: '/sys/profile'
})
/*
**获取员工个人信息
*/
export const getUserPersonal = id => request({
  url: `/employees/${id}/personalInfo`
})
/**
**获取员工基本信息
**/
export const getUserSimple = id => request({
  url: `/sys/user/${id}`
})
/**
**保存员工基本信息
**/
export const updateUserSimple = data => request({
  method: 'PUT',
  url: `/sys/user/${data.id}`,
  data
})

/**
**保存员工个人信息
**/
export const updateUserPersonal = data => request({
  method: 'PUT',
  url: `/employees/${data.id}/personalInfo`,
  data
})
/**
**给员工分配角色
**/
export const addUserRole = data => request({
  method: 'PUT',
  url: '/sys/user/assignRoles',
  data
})
