// 自定义指令模块
/* **
** 当图片发生错误时的自定义到默认图片显示
** */
export const imgerror = {
  inserted(dom, optation) { // inserted 钩子函数只能在页面刷新时执行一次
    // 当图片的地址为 null 或者其他错误时 是不会报错的
    dom.src = dom.src || optation.value
    // 监听图片的错误
    dom.addEventListener('error', () => {
      dom.src = optation.value
    })
  },
  componentUpdated(dom, optation) { // componentUpdated钩子函数只要数据更新就会执行
    dom.src = dom.src || optation.value
  }
}
