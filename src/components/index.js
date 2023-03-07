// 该文件负责所有的公共的组件的全局注册   Vue.use
import PageTools from './PageTools'
import ImageUpdate from './ImageUpload'
import Screenfull from './Screenfull'
import ThemePicker from './ThemePicker'
import lang from './lang'
import TagsView from './TagsView'
export default {
  install(vue) {
    //  注册全局的通用栏组件对象
    vue.component('PageTools', PageTools)
    vue.component('ImageUpdate', ImageUpdate)
    vue.component('Screenfull', Screenfull)
    vue.component('ThemePicker', ThemePicker)
    vue.component('lang', lang)
    vue.component('TagsView', TagsView)
  }
}
