// 部门架构模块
import request from '@/utils/request'

/**
** 查询企业的部门列表
**/
export const getDepartments = () => request({
  url: '/company/department'
})

/**
 **根据ID删除部门
 **/
export const delDepartments = id => request({
  method: 'DELETE',
  url: `/company/department/${id}`
})

/**
**根据ID查询部门详情
**/
export const getDepartmentMinute = id => request({
  url: `/company/department/${id}`
})

/**
**新增部门
**/
export const addDepartments = data => request({
  method: 'POST',
  url: '/company/department',
  data
})

/**
**根据ID修改部门详情
**/
export const upadteDepartments = data => request({
  method: 'PUT',
  url: `/company/department/${data.id}`,
  data
})
