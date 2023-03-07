<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="card">
        <!-- 头部主栏 -->
        <tree-tools class="tree-row" :tree-node="company" :is-show="true" @addDeparts="addDeparts" />
        <!--/ 头部主栏 -->
        <hr>
        <!-- 树状结构 -->
        <el-tree :data="depts" :default-expand-all="true">
          <tree-tools slot-scope="{ data }" class="tree-row" :tree-node="data" @editDeparts="editDepartments" @addDeparts="addDeparts" @renderNew="getDepartments" />
        </el-tree>
        <!--/ 树状结构 -->
      </el-card>
      <!-- 弹出层 -->
      <Popups v-if="isShow" ref="popups" :tree-node="node" :is-show.sync="isShow" @addDepartments="getDepartments" />
      <!--/ 弹出层 -->
    </div>
  </div>
</template>

<script>
import Popups from './components/Popups.vue'
import { transitionListTOTree } from '@/utils/index'
import { getDepartments } from '@/api/departments'
import TreeTools from './components/TreeTools'
export default {
  components: {
    TreeTools,
    Popups
  },
  data() {
    return {
      company: {},
      depts: [],
      node: {},
      isShow: false
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    // 封装一个获取部门列表的方法
    async getDepartments() {
      const result = await getDepartments()
      // console.log(result)
      this.company = { name: result.companyName, manager: '负责人', id: '' }
      this.depts = transitionListTOTree(result.depts, '') // 调用封装的方法获得树状结构
      // console.log(this.depts)
    },
    // 封装一个添加子目录显示弹出层的方法
    addDeparts(node) {
      // 显示弹出层
      this.isShow = true
      // 传入当前点击的节点元素
      this.node = node
    },
    // 封装一个编辑的方法
    editDepartments(node) {
      // 显示弹出层
      this.isShow = true
      // 传入当前点击的节点元素
      this.node = node
      // 调用弹出层的方法获取本门消息信息 并赋值给formData
      this.$nextTick(() => { // 弹出层是后挂载的所以需要使用$nextTick
        this.$refs.popups.getDepartmentMinute(node.id)
      })
    }

  }
}
</script>

<style scoped lang="scss">
.app-container {
  font-size: 14px;
  .card {
    padding: 30px 120px;
  }
  .tree-row {
    width: 100%;
    height: 40px;
  }
}
</style>
