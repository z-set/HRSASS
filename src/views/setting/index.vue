<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName">
          <!-- 角色管理 -->
          <el-tab-pane label="角色管理" name="first">
            <el-button size="small" type="primary" icon="el-icon-plus" @click="isShow = true">新增角色</el-button>
            <UserContral :list="list" :pages="pages" @editRoles="editRoles" @getRoleList="getRoleList" @newPage="newPage" />
          </el-tab-pane>
          <!-- 配置管理 -->
          <el-tab-pane label="公司信息" name="second">
            <CompanyInfo :company-info="companyInfo" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 弹出层 -->
      <Popup v-if="isShow" ref="popup" :is-show="isShow" :roles="roles" @getRoleList="getRoleList" @close="isShow = false" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CompanyInfo from './components/CompanyInfo.vue'
import Popup from './components/Popup.vue'
import { getRoleList, agetCompanyInfo } from '@/api/setting'
import UserContral from './components/UserContral.vue'
export default {
  components: {
    UserContral,
    Popup,
    CompanyInfo
  },
  data() {
    return {
      activeName: 'first',
      list: [],
      pages: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      roles: {},
      isShow: false,
      companyInfo: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList() // 获取角色列表
    this.agetCompanyInfo() // 获取企业信息
  },
  methods: {
    // 封装一个获取角色列表的方法
    async getRoleList() {
      const { total, rows } = await getRoleList(this.pages)
      this.list = rows
      this.pages.total = total
    },
    newPage(newpage) { // 分页跳转
      this.pages.page = newpage
      this.getRoleList()
    },
    // 封装一个编辑的方法
    editRoles(roles) {
      // 获得角色信息
      this.roles = roles
      // 显示弹出层
      this.isShow = true
      // 调用子级的方法
      this.$nextTick(() => this.$refs.popup.getRoles())
    },
    // 封装一个获得企业信息的方法
    async agetCompanyInfo() {
      this.companyInfo = await agetCompanyInfo(this.companyId)
    }
  }
}
</script>

<style></style>
