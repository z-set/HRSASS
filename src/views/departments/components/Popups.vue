<template>
  <el-dialog :title="formData.id ? '编辑部门': '新增部门'" :visible="isShow" @close="btnClose">
    <el-form ref="formData" :model="formData" :rules="rules">
      <el-form-item prop="name" label="部门名称" label-width="120px">
        <el-input
          v-model="formData.name"
          style="max-width: 400px"
          placeholder="1~50个字符"
        />
      </el-form-item>
      <el-form-item prop="code" label="部门编码" label-width="120px">
        <el-input
          v-model="formData.code"
          style="max-width: 400px"
          placeholder="1~50个字符"
        />
      </el-form-item>
      <el-form-item prop="manager" label="部门负责人" label-width="120px">
        <el-select
          v-model="formData.manager"
          placeholder="请选择"
          @focus="getPeoples"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="introduce" label="部门介绍" label-width="120px">
        <el-input
          v-model="formData.introduce"
          style="max-width: 400px"
          placeholder="1~300个字符"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="btnClose">取 消</el-button>
      <el-button type="primary" @click="btnOk">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { getPeopleSimple } from '@/api/employess'
import {
  getDepartments,
  addDepartments,
  getDepartmentMinute,
  upadteDepartments
} from '@/api/departments'
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
  data() {
    /**
     * 封装一个验证部门名称的方法
     **/
    const nameRules = async(rule, value, callback) => {
      // 获取当前最新列表
      const { depts } = await getDepartments()
      let isReuse = false
      if (this.formData.id) {
        // 编辑状态
        // 当前同级别中除开自己以外 判断部门名称是否存在
        isReuse = depts
          .filter(
            (item) =>
              item.pid === this.formData.pid && item.id !== this.formData.id
          )
          .some((item) => item.name === value)
      } else {
        // 新增状态
        // 找到当前点击项目子级的所有元素，判断部门名称是否相同
        isReuse = depts
          .filter((item) => item.pid === this.treeNode.id)
          .some((item) => item.name === value)
      }

      isReuse ? callback(new Error(`同级别部门${value}已存在`)) : callback()
    }
    /**
     * 封装一个验证部门编码的方法
     **/
    const codeRules = async(rule, value, callback) => {
      // 获取当前最新列表
      const { depts } = await getDepartments()
      let isReuse = false
      if (this.formData.id) {
        // 编辑状态
        // 判断除开自己所有项目的编码和当前的有无重复
        isReuse = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        // 新增状态
        // 判断所有项目的编码和当前的有无重复
        isReuse = depts.some((item) => item.code === value)
      }

      isReuse ? callback(new Error(`部门编码${value}已存在`)) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      rules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '字符在1~50以内', trigger: 'blur' },
          { validator: nameRules, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '字符在1~50以内', trigger: 'blur' },
          { validator: codeRules, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '负责人不能为空', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '字符在1~300以内', trigger: 'blur' }
        ]
      },
      peoples: null
    }
  },
  methods: {
    // 获得员工列表
    async getPeoples() {
      this.peoples = await getPeopleSimple()
    },
    // 验证并提交表单数据
    btnOk() {
      // 手动验证表单
      this.$refs.formData.validate(async(isOk) => {
        // 验证通过
        if (isOk) {
          if (this.formData.id) {
            // 编辑状态
            await upadteDepartments(this.formData)
          } else {
            // 添加状态提交数据
            await addDepartments({ ...this.formData, pid: this.treeNode.id })
          }
          // 重新拉取数据
          this.$emit('addDepartments')
          // 关闭弹出层
          this.$emit('update:isShow', false)
          // 提示用户
          this.$message.success('操作成功')
        }
      })
    },
    // 取消
    btnClose() {
      this.$emit('update:isShow', false)
    },
    // 编辑展示默认数据
    async getDepartmentMinute(id) {
      this.formData = await getDepartmentMinute(id)
    }
  }
}
</script>
<style scoped lang="scss">
</style>
