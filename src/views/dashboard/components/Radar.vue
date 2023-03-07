<template>
  <div ref="myChart" class="myChart" />
</template>
<script>
import * as echarts from 'echarts/core'
export default {
  mounted() {
    const myChart = echarts.init(this.$refs.myChart)
    myChart.setOption({
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '考勤', max: 100 },
          { name: '工资', max: 100 },
          { name: '工作效率', max: 100 },
          { name: '请假天数', max: 100 },
          { name: '社保', max: 100 },
          { name: '出差', max: 100 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [50, 30, 20, 35, 50, 18],
              name: 'Allocated Budget'
            },
            {
              value: [50, 14, 28, 26, 42, 21],
              name: 'Actual Spending'
            }
          ]
        }
      ]
    })
  }
}
</script>
<style>
.myChart {
    width: 600px;
    height: 400px;
}
</style>
