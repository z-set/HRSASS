// 组织架构模块
import Layout from '@/layout'

export default {
  // 一级路由设置 需要布局
  path: '/departments',
  name: 'departments',
  component: Layout,
  children: [
    // 二级路由按需加载
    {
      path: '', // 不设置路径 当访问一级路由时自动显示
      component: () => import('@/views/departments'),
      name: 'departments',
      meta: { title: '组织架构', icon: 'tree' } // 存储数据 加载侧边栏的
    }
  ]
}
