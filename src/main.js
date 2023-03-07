import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control 权限管理

import Cmponents from './components' // 全局公共组件

import '@/utils/dayjs' // 导入格式化时间的方法

import * as filters from '@/filters' // 导入过滤器

import Print from 'vue-print-nb' // 导入打印插件

import checkPermission from '@/mixin/checkPermission'

// * as 属性名 语法 将模块的所有暴露的成员放在属性里 获得一个对象
import * as directives from '@/directive'

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入雷达图图表，图表后缀都为 Chart
import { RadarChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  RadarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

import i18n from '@/lang'
// 调用对象的方法得到每一个属性名的数组 遍历数组给每个属性注册自定义指令
Object.keys(directives).forEach(key => Vue.directive(key, directives[key]))

// 全局注册所有的过滤器
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.use(Cmponents) // 注册自己的插件
Vue.use(Print) // 注册打印插件
Vue.mixin(checkPermission) // 注册全局混入 用来做权限验证

// set ElementUI lang to EN
// 设置element为当前的语言
Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key) })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
