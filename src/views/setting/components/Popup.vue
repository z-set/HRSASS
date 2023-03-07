<template>
  <el-dialog
    title="提示"
    :visible="isShow"
    center
    @close="btnCacel"
  >
    <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
      <el-form-item prop="name" label="角色名称">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="formData.description" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="btnCacel">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { editRole, addRole } from '@/api/setting'
export default {
  props: {
    roles: {
      type: Object,
      default: () => {}
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 封装一个方法给父级调用
    getRoles() {
      this.formData = this.roles
    },
    // 取消
    btnCacel() {
      // 关闭表单
      this.$emit('close')
    },
    // 确认
    async btnOk() {
      try {
        // 手动验证表单
        await this.$refs.formData.validate()
        if (this.formData.id) {
          // 编辑状态
          await editRole(this.formData) // 提交数据
        } else {
          // 新增状态
          await addRole(this.formData)
        }
        // 重新拉去表单
        this.$emit('getRoleList')
        // 关闭表单
        this.$emit('close')
        this.$message.success('操作成功')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style>

</style>
