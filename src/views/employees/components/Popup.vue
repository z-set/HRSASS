<template>
  <div class="add-employess">
    <el-dialog
      title="新增员工"
      :visible="isShow"
      center
      @close="concle"
    >
      <!-- 表单 -->
      <el-form ref="formData" :model="formData" :rules="rules" label-width="120px">
        <el-form-item prop="username" label="姓名">
          <el-input v-model="formData.username" style="width:70%" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item prop="mobile" label="手机">
          <el-input v-model="formData.mobile" style="width:70%" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item prop="timeOfEntry" label="入职时间">
          <el-date-picker v-model="formData.timeOfEntry" style="width:70%" placeholder="请选择入职时间" />
        </el-form-item>
        <el-form-item prop="" label="聘用形式">
          <el-select v-model="formData.formOfEmployment" style="width:70%" placeholder="请选择">
            <el-option
              v-for="item in genre"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="workNumber" label="工号">
          <el-input v-model="formData.workNumber" style="width:70%" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item prop="departmentName" label="部门">
          <el-input v-model="formData.departmentName" style="width:70%" placeholder="请选择部门" @blur="treeShow = false" @focus="showTree" />
          <!-- 树型列表 -->
          <el-tree v-if="treeShow" v-loading="loading" :data="treeData" :props="{label:'name'}" :default-expand-all="true" @node-click="nodeBtn" />
        </el-form-item>
        <el-form-item prop="correctionTime" label="转正时间">
          <el-date-picker v-model="formData.correctionTime" style="width:70%" placeholder="请选择转正时间" />
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="concle">取 消</el-button>
        <el-button type="primary" @click="btnOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { addPeople } from '@/api/employess'
import { getDepartments } from '@/api/departments'
import { transitionListTOTree } from '@/utils'
import employees from '@/api/constant/employees'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职不能为空', trigger: 'blur' }]
      },
      treeData: [],
      treeShow: false,
      genre: employees.hireType,
      loading: false
    }
  },
  methods: {
    // 当部门框聚焦时获取所有部门列表
    async showTree() {
      this.loading = true
      const { depts } = await getDepartments() // 发请求得到部门列表
      this.treeData = transitionListTOTree(depts, '') // 得到树形数据
      this.loading = false
      this.treeShow = true // 显示列表
    },
    // 点击树型列表 把值传给对应表单
    nodeBtn(data) {
      this.formData.departmentName = data.name
      this.treeShow = false // 关闭列表
    },
    // 确认提交数据
    async btnOk() {
      try {
        // 手动验证表单
        await this.$refs.formData.validate()
        // 发起请求
        await addPeople(this.formData)
        // 重新拉取数据  调用父组件的方法 子组件必须在父组件的div下 不能被其他标签包裹
        this.$parent.getPeopleList && this.$parent.getPeopleList()
        // 关闭弹出层
        this.$emit('update:isShow', false)
        this.$message.success('操作成功')
      } catch (err) {
        console.log(err)
      }
    },
    // 取消
    concle() {
      // 清空缓存数据
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      // 清空校验状态
      this.$refs.formData.resetFields()
      // 关闭弹出层
      this.$emit('update:isShow', false)
    }
  }
}
</script>
<style>

</style>
