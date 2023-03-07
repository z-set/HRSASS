<template>
  <div>
    <UpdateExcle :on-success="success" />
  </div>
</template>
<script>
import UpdateExcle from '@/components/UploadExcle'
import { addPeopleAll } from '@/api/employess'
export default {
  components: {
    UpdateExcle
  },
  methods: {
    async success({ header, results }) {
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      //   将获得的results 数组中对象里面key由中文变成对应的英文
      // 筛选出数组里的每一个对象 用keys方法得到所有的key 声明一个新对象 把规则对应的key的英文设置成属性 再把key对应的值设给属性
      const arr = results.map(item => {
        const userInfo = {}
        Object.keys(item).forEach(key => {
          // 由于表格的时间与js不一致所以需要格式化
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key]), '/') // 将字符串转换成时间格式
          } else {
            userInfo[userRelations[key]] = item[key]
          }
        })
        return userInfo
      })
      //   发请求传数据
      await addPeopleAll(arr)
      //   返回之前的页面
      this.$router.back()
    },
    // 一个格式化excle表格时间的方法
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>
<style>

</style>
