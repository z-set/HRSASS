<template>
  <div>
    <!-- 年月选择 -->
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width: 120px;" @change="dateChange">
        <el-option v-for="item in yearList" :key="item" :labei="item" :value="item" />
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width: 120px; margin-left: 15px;" @change="dateChange">
        <el-option v-for="item in 12" :key="item" :labei="item" :value="item" />
      </el-select>
    </el-row>
    <!-- 日期显示 -->
    <el-calendar v-model="currentDate">
      <template #dateCell="{ date, data }" class="content">
        <div class="date-content">
          <span class="text"> {{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    // 定义一个过滤器得到当前的日期并去除0开头 .startsWith(字符串) 判断是不是以xx字符串开头的
    getDay(value) {
      return value.split('-')[2].startsWith('0') ? value.split('-')[2].split('')[1] : value.split('-')[2]
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      currentMonth: null, // 当前月份
      currentYear: null, // 当前年份
      currentDate: null,
      yearList: []
    }
  },
  created() {
    // 得到当前的年
    this.currentYear = this.startDate.getFullYear()
    // 快速得到一个数组 当前年份的前五年和后五年
    this.yearList = Array.from(Array(11), (value, index) => this.currentYear + index - 5)
    // 得到当前的月份
    this.currentMonth = this.startDate.getMonth() + 1
  },
  methods: {
    // 当年份和月份改变时 改变日期
    dateChange() {
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`)
    },
    // 判断是不是周末 是周末就加休的图表
    isWeek(date) {
      return date.getDay() === 0 || date.getDay() === 6
    }
  }
}
</script>

<style  scoped>
 /deep/ .el-calendar-day {
  height:  auto;
 }
 /deep/ .el-calendar-table__row td,/deep/ .el-calendar-table tr td:first-child,  /deep/ .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  position: relative;
  left: 6px;
  top: -50px;
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 /deep/ .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 /deep/ .el-calendar__header {
   display: none
 }
</style>
