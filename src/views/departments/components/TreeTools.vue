<template>
  <el-row style="width: 100%;" type="flex" justify="space-between" align="middle">
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>
          <span>{{ treeNode.manager }}</span>
        </el-col>
        <el-col>
          <el-dropdown @command="handleCommand">
            <span>
              操作
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isShow" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isShow" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { delDepartments } from '@/api/departments'
export default {
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(command) {
      if (command === 'add') {
        // 点击添加部门
        // 显示弹出层
        this.$emit('addDeparts', this.treeNode)
      } else if (command === 'edit') {
        // 点击编辑部门
        // 显示弹出层
        this.$emit('editDeparts', this.treeNode)
      } else {
        // 点击删除部门
        this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          await delDepartments(this.treeNode.id) // 调用接口删除对应的数据
          this.$emit('renderNew') // 重新渲染数据
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }
    }
  }
}
</script>
<style scoped>
</style>
