// 员工模块
import Layout from '@/layout'

export default {
  // 一级路由设置 需要布局
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [
    // 二级路由按需加载
    {
      path: '', // 不设置路径 当访问一级路由时自动显示
      component: () => import('@/views/employees'),
      name: 'employees',
      meta: { title: '员工管理', icon: 'people' } // 存储数据 加载侧边栏的
    },
    {
      path: 'details/:id',
      component: () => import('@/views/employees/Details'),
      hidden: true,
      meta: {
        title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
      }
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/Print'),
      hidden: true,
      meta: {
        title: '打印', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
        icon: 'people'
      }
    }
  ]
}
