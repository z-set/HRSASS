// 格式化时间的模块
// 时间处理模块
import Vue from 'vue'
import dayjs from 'dayjs'
// 导入中文语言包
import 'dayjs/locale/zh-cn'
// 导入插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 配置中文语言包
dayjs.locale('zh-cn')
// 配置插件
dayjs.extend(relativeTime)
// 注册全局过滤器
Vue.filter('relativeTime', (val) => {
  return dayjs().to(dayjs(val))
})
