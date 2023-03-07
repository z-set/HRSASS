// 公司设置模块
import request from '@/utils/request'

/**
 * 获取所有角色列表
 **/
export const getRoleList = params => request({
  url: '/sys/role',
  params
})

/**
 * 根据ID删除角色
 **/
export const delRole = id => request({
  method: 'DELETE',
  url: `/sys/role/${id}`
})

/**
 * 根据ID更新角色
 **/
export const editRole = data => request({
  method: 'PUT',
  url: `/sys/role/${data.id}`,
  data
})

/**
 * 根据ID获取角色详情
 **/
export const getRole = id => request({
  url: `/sys/role/${id}`
})

/**
 * 添加角色
 **/
export const addRole = data => request({
  method: 'POST',
  url: '/sys/role',
  data
})

/**
 * 根据id查询企业
 **/
export const agetCompanyInfo = companyId => request({
  url: `/company/${companyId}`
})

/**
 * 给角色分配权限
 **/
export const addRolePerimission = data => request({
  method: 'PUT',
  url: '/sys/role/assignPrem',
  data
})

