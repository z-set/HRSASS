<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部组件 -->
      <PageTools :show-before="true">
        <template #before>
          <span>共{{ page.total }}条记录</span>
        </template>
        <template #after>
          <el-button size="small" type="success" @click="$router.push('/import')">Excle导入</el-button>
          <el-button size="small" type="danger" @click="exportData">Excle导出</el-button>
          <el-button v-if="!checkPermission('aa')" size="small" type="primary" @click="isShow = true">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 表格内容 -->
      <el-table v-loading="loading" :data="list">
        <el-table-column align="center" type="index" label="序号" sortable="" />
        <el-table-column prop="username" label="姓名" sortable="" />
        <el-table-column label="头像" sortable="" align="center">
          <template slot-scope="{ row }">
            <img v-imgerror="require('@/assets/common/head.jpg')" :src="row.staffPhoto" style="width: 70px;border-radius: 50%; height: 70px;" alt="" @click="getCode(row.staffPhoto)">
          </template>
        </el-table-column>
        <el-table-column prop="mobile" label="手机号" sortable="" />
        <el-table-column prop="workNumber" label="工号" sortable="" />
        <el-table-column prop="formOfEmployment" label="聘用形式" :formatter="formatterEmployment" sortable="" />
        <el-table-column prop="departmentName" label="部门" sortable="" />
        <el-table-column prop="timeOfEntry" label="入职时间" sortable="">
          <template v-slot="{ row }">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="enableState" label="账户状态" sortable="">
          <template v-slot="{ row }">
            <el-switch
              :value="row.enableState === 1"
              disabled
            />
          </template>
        </el-table-column>
        <el-table-column width="240px" label="操作" sortable="">
          <template v-slot="{ row }">
            <el-button type="text" size="small" @click="$router.push(`/employees/details/${row.id}`)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small" @click="getRole(row.id)">角色</el-button>
            <el-button type="text" size="small" @click="delPeople(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页选项 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next"
          :total="page.total"
          :current-page="page.page"
          :page-size="page.size"
          @current-change="changePage"
        /></el-row>
    </div>
    <!-- 弹出层 -->
    <Popup :is-show.sync="isShow" />
    <!-- 二维码弹出层 -->
    <el-dialog :visible.sync="showCode" title="二维码">
      <el-row type="flex" justify="center">
        <canvas ref="QrCode" />
      </el-row>
    </el-dialog>
    <!-- 角色弹出层 -->
    <Role ref="role" :show-role.sync="showRole" />
  </div>
</template>

<script>
import Role from './components/Role.vue'
import QrCode from 'qrcode'
import { formatDate } from '@/filters'
import Popup from './components/Popup.vue'
import employees from '@/api/constant/employees'
import { getPeopleList, delPeople } from '@/api/employess'
export default {
  components: {
    Popup,
    Role
  },
  data() {
    return {
      page: {
        page: 1,
        size: 10,
        total: 0
      },
      list: [],
      loading: false,
      isShow: false,
      showCode: false,
      showRole: false // 控制角色分配弹出层
    }
  },
  created() {
    this.getPeopleList() // 获取员工列表
  },
  methods: {
    // 获取员工列表
    async getPeopleList() {
      this.loading = true
      const { total, rows } = await getPeopleList(this.page)
      this.page.total = total
      this.list = rows
      this.loading = false
      // console.log(rows)
    },
    // 分页跳转
    changePage(newPage) {
      // console.log(newPage)
      this.page.page = newPage
      this.getPeopleList()
    },
    // 格式化聘用形式
    formatterEmployment(row, column, cellValue, index) {
      // console.log(cellValue)
      const obj = employees.hireType.find(item => item.id === cellValue)
      return obj ? obj.value : '未知'
    },
    // 删除员工
    async delPeople(id) {
      try {
        // 提示删除信息
        await this.$confirm('此操作将永久删除该员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 发起删除请求
        await delPeople(id)
        // 重新拉取数据
        this.getPeopleList()
        this.$message.success('删除成功!')
      } catch (err) {
        console.log(err)
      }
    },
    // 导出数据
    async exportData() {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const { rows } = await getPeopleList({ page: 1, size: this.page.total })
      console.log(this.covertData(headers, rows))
      // const data =
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头 必填 []
          data: this.covertData(headers, rows), // 具体数据 必填 [[]]
          filename: '员工信息表', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    // 封装一个转换数据格式的方法
    covertData(headers, rows) {
      return rows.map(item => {
        return Object.keys(headers).map(key => {
          // 判断聘用形式并设置指定的值
          if (headers[key] === 'formOfEmployment') {
            const obj = employees.hireType.find(val => val.id === item[headers[key]])
            return obj ? obj.value : '未知'
          } else if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(item[headers[key]])
          }
          return item[headers[key]]
        })
      })
    },
    // 封装一个生成二维码的方法
    getCode(url) {
      // 判断有没有地址 没地址就不生成二维码
      if (url) {
        this.showCode = true
        // 页面渲染是异步的 所以使用 $nextTick 等待
        // 语法 QrCode.toCanvas(dom元素显示二维码的容器canvas， 字符串可以是任何字符串或网址)
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.QrCode, url)
        })
      } else {
        this.$message.error('该用户未上传头像')
      }
    },
    // 分配角色
    async getRole(id) {
      await this.$refs.role.getRoleList(id) // 调用子级的方法获取角色列表并渲染
      this.showRole = true
    }

  }
}
</script>

<style></style>
