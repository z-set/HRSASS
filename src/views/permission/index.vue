<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 页面工具 -->
      <PageTools>
        <template #after>
          <el-button size="small" type="primary" @click="addBtn(0, 1)">添加权限</el-button>
        </template>
      </PageTools>
      <!-- 树型表格 -->
      <el-table border :data="permList" :default-expand-all="true" row-key="id">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="标识" />
        <el-table-column prop="description" label="描述" />
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <el-button v-if="row.type === 1" type="text" @click="addBtn(row.id, 2)">添加</el-button>
            <el-button type="text" @click="updateBtn(row.id)">编辑</el-button>
            <el-button type="text" @click="delBtn(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 弹出层 -->
      <el-dialog
        :title="title"
        :visible="showAdd"
        center
        @close="btnCancel"
      >
        <!-- 表单 -->
        <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
          <el-form-item prop="name" label="权限名称" style="width: 80%;">
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-form-item prop="code" label="权限标识" style="width: 80%;">
            <el-input v-model="formData.code" />
          </el-form-item>
          <el-form-item label="权限描述" style="width: 80%;">
            <el-input v-model="formData.description" />
          </el-form-item>
          <el-form-item label="开启" style="width: 80%;">
            <el-switch v-model="formData.enVisible" active-value="0" inactive-value="1" />
          </el-form-item>
        </el-form>
        <!-- 底部按钮 -->
        <span slot="footer">
          <el-button @click="btnCancel">取 消</el-button>
          <el-button type="primary" @click="btnOk">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { transitionListTOTree } from '@/utils'
import { getPermissionAll, addPermission, delPermission, getPermission, updatePermission } from '@/api/perimission'
export default {
  data() {
    return {
      permList: [], // 权限列表
      showAdd: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑权限点' : '新增权限点'
    }
  },
  created() {
    this.getPermissionAll()
  },
  methods: {
    // 获取所有权限列表
    async getPermissionAll() {
      // 将得到的数据转换成树型结构
      this.permList = transitionListTOTree(await getPermissionAll(), '0')
    },
    // 删除对应的权限
    async delBtn(id) {
      try {
        // 提示是否删除
        await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delPermission(id) // 发起请求
        this.getPermissionAll() // 重新拉取数据
        this.$message.success('删除成功')
      } catch (err) {
        console.log(err)
      }
    },
    // 点击添加权限
    addBtn(pid, type) {
      // 区分是在根上添加还是在子节点添加
      this.formData.pid = pid
      this.formData.type = type
      this.showAdd = true // 显示弹出层
    },
    // 点击编辑权限
    async updateBtn(id) {
      // 回写数据到弹出层
      this.formData = await getPermission(id)
      // 显示弹出层
      this.showAdd = true
    },
    // 弹出层确认
    async btnOk() {
      // 验证表单
      try {
        await this.$refs.formData.validate()
        // 判断是编辑状态还是新增
        if (this.formData.id) {
          // 编辑状态
          await updatePermission(this.formData)
        } else {
          // 新增状态
          await addPermission(this.formData) // 添加权限
        }
        this.getPermissionAll() // 重新拉去取数据
        this.showAdd = false // 关闭弹出层
        this.$message.success('操作成功')
      } catch (err) {
        console.log(err)
      }
    },
    // 弹出层取消
    btnCancel() {
      // 重置数据
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      // 清除表单校验
      this.$refs.formData.resetFields()
      // 关闭弹出层
      this.showAdd = false
    }
  }
}
</script>

<style></style>
