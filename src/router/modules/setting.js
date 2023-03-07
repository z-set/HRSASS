// 公司设置模块
import Layout from '@/layout'

export default {
  // 一级路由设置 需要布局
  path: '/setting',
  name: 'settings',
  component: Layout,
  children: [
    // 二级路由按需加载
    {
      path: '', // 不设置路径 当访问一级路由时自动显示
      component: () => import('@/views/setting'),
      name: 'settings',
      meta: { title: '公司设置', icon: 'setting' } // 存储数据 加载侧边栏的
    }
  ]
}
