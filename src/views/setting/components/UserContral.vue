<template>
  <div class="user-contral-container">
    <el-table
      border=""
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="120"
      />
      <el-table-column
        prop="name"
        label="名称"
        width="200"
      />
      <el-table-column
        prop="description"
        label="描述"
      />
      <el-table-column
        prop="address"
        label="操作"
      >
        <template slot-scope="{ row }">
          <el-button
            size="mini"
            type="success"
            @click="addPermBtn(row.id)"
          >分配权限</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="editBtn(row.id)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="delBtn(row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end" align="middle" style="height: 50px;">
      <el-col style="margin-top: 20px;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pages.total"
          :page-size="pages.pagesize"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
    <!-- 分配权限弹出层 -->
    <el-dialog title="分配权限" :visible="showDialog" @close="btnCancel">
      <!-- 树型结构 -->
      <el-tree ref="permKeys" :default-checked-keys="rolePermList" node-key="id" :data="permList" :props="defaultProps" :show-checkbox="true" :check-strictly="true" />
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="btnCancel">取 消</el-button>
        <el-button type="primary" @click="btnOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { transitionListTOTree } from '@/utils'
import { getPermissionAll } from '@/api/perimission'
import { delRole, getRole, addRolePerimission } from '@/api/setting'
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    pages: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showDialog: false, // 控制弹出层
      permList: [], // 权限数据
      roleId: null, // 角色Id
      defaultProps: {
        label: 'name' // 配置默认显示项
      },
      rolePermList: [] // 角色默认选中的权限点
    }
  },
  methods: {
    // 页码改变触发
    handleCurrentChange(newpage) {
      this.$emit('newPage', newpage)
    },
    // 删除按钮
    delBtn(id) {
      this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        // 删除指定项
        await delRole(id)
        this.$emit('getRoleperm')
        this.$message.success('删除成功!')
      }).catch(err => console.log(err))
    },
    // 编辑按钮
    async editBtn(id) {
      try {
        const result = await getRole(id)
        this.$emit('editRoles', result)
      } catch (err) {
        this.$message.error('操作失败')
      }
    },
    // 分配权限按钮
    async addPermBtn(id) {
      // 获取所有权限点 并转换成树形结构
      this.permList = transitionListTOTree(await getPermissionAll(), '0')
      // 获取当前角色的信息 选中的权限点
      const { permIds } = await getRole(id)
      this.rolePermList = permIds
      // 存储当前点击的角色id
      this.roleId = id
      // 显示弹出层
      this.showDialog = true
    },
    // 确认
    async btnOk() {
      // 发起请求
      await addRolePerimission({
        permIds: this.$refs.permKeys.getCheckedKeys(),
        id: this.roleId
      })
      // 关闭弹出层
      this.showDialog = false
      this.$message.success('设置成功')
    },
    // 取消
    btnCancel() {
      // 清空默认选中的
      this.rolePermList = []
      // 关闭弹出层
      this.showDialog = false
    }
  }
}
</script>
<style>

</style>
