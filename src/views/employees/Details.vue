<template>
  <div>
    <el-card>
      <el-tabs>
        <el-tab-pane label="登录账户设置">

          <!-- 放置表单 -->
          <el-form ref="formUser" :model="formUser" :rules="rules" label-width="120px" style="margin-left: 120px; margin-top:30px">
            <el-form-item prop="username" label="姓名:">
              <el-input v-model="formUser.username" style="width:300px" />
            </el-form-item>
            <el-form-item prop="password2" label="新密码:">
              <el-input v-model="formUser.password2" style="width:300px" type="password" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserSimple">更新</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详情">
          <user-info />
        </el-tab-pane>
        <el-tab-pane label="岗位信息">
          <job-info />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import { getUserSimple, updateUserSimple } from '@/api/user'
import UserInfo from './components/UserInfo.vue'
import JobInfo from './components/JobInfo.vue'
export default {
  components: {
    JobInfo,
    UserInfo
  },
  data() {
    return {
      userId: this.$route.params.id,
      formUser: {
        username: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUserSimple()
  },
  methods: {
    // 获取用户基本信息
    async getUserSimple() {
      this.formUser = await getUserSimple(this.userId)
    },
    // 更新用户基本信息
    async updateUserSimple() {
      try {
        // 验证表单
        await this.$refs.formUser.validate()
        // 发请求
        updateUserSimple({ ...this.formUser, password: this.formUser.password2 })
        // 重新拉数据
        this.getUserSimple()
        // 提示
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
