<template>
  <div class="role-container">
    <el-dialog :visible="showRole" title="分配角色" center @close="btnCancel">
      <!-- 复选框 -->
      <el-checkbox-group v-model="checkedList">
        <el-checkbox v-for="item in roleList" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <!-- 底部确认 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col>
          <el-button size="small" @click="btnCancel">取 消</el-button>
          <el-button size="small" type="primary" @click="btnOk">确 定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { getUserSimple, addUserRole } from '@/api/user'
import { getRoleList } from '@/api/setting'
export default {
  props: {
    showRole: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleList: [], // 角色列表
      checkedList: [], // 选择的角色
      Id: null
    }
  },
  methods: {
    // 获取角色列表 与员工基本信息对应的角色
    async getRoleList(userId) {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      const { roleIds, id } = await getUserSimple(userId)
      this.roleList = rows
      this.checkedList = roleIds
      this.Id = id
    },
    // 取消
    btnCancel() {
      this.$emit('update:showRole', false) // 关闭弹出层
      this.checkedList = [] // 清除选项
    },
    // 确认
    async btnOk() {
      await addUserRole({ roleIds: this.checkedList, id: this.Id })
      this.$emit('update:showRole', false) // 关闭弹出层
      this.$message.success('添加成功')
    }
  }
}
</script>
<style>

</style>
