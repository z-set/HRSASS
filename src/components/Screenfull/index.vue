<template>
  <!-- 放置一个图标 -->
  <div>
    <!-- 放置一个svg的图标 -->
    <svg-icon icon-class="fullscreen" style="color:#fff; width: 20px; height: 20px" @click="changeScreen" />
  </div>
</template>

<script>
// import ScreenFull from 'screenfull'
export default {
  data() {
    return {
      falg: false // 判断是否是全屏状态 默认否
    }
  },
  methods: {
    //   改变全屏
    changeScreen() {
    //   if (!ScreenFull.isEnabled) {
    //     // 此时全屏不可用
    //     this.$message.warning('此时全屏组件不可用')
    //     return
    //   }
    //   // document.documentElement.requestFullscreen()  原生js调用
    //   //   如果可用 就可以全屏
    //   ScreenFull.toggle()
      if (this.falg) {
        document.documentElement.requestFullscreen() // 全屏
      } else {
        document.exitFullscreen() // 退出全屏
      }
      this.falg = !this.falg
    }
  }
}
</script>

<style>

</style>
