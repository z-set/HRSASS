// 员工模块
import request from '@/utils/request'
/**
**获取员工简单列表
**/
export const getPeopleSimple = () => request({
  url: '/sys/user/simple'
})

/**
**获取员工列表
**/
export const getPeopleList = params => request({
  url: '/sys/user',
  params
})

/**
**删除员工
**/
export const delPeople = id => request({
  method: 'DELETE',
  url: `/sys/user/${id}`
})

/**
**新增员工
**/
export const addPeople = data => request({
  method: 'POST',
  url: '/sys/user',
  data
})

/**
**批量导入员工
**/
export const addPeopleAll = data => request({
  method: 'POST',
  url: '/sys/user/batch',
  data
})

/**
**获取员工岗位信息
**/
export const getPeopleJob = id => request({
  url: `/employees/${id}/jobs`
})

/**
**保存员工岗位信息
**/
export const updatePeopleJob = data => request({
  method: 'PUT',
  url: `/employees/${data.userId}/jobs`,
  data
})

/**
**给员工分配角色
**/
export const addPeoplerole = data => request({
  method: 'PUT',
  url: '/sys/user/assignRoles',
  data
})

/** *
 *  更新用户详情的基础信息
 * **/
export function updatePersonal(data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}
/** *
 *  读取用户详情的基础信息
 * **/
export function getPersonalDetail(id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}
