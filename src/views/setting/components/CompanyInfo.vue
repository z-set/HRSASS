<template>
  <div class="company-info-container">
    <el-alert
      style="margin:10px 0 40px;"
      :closable="false"
      title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
      type="info"
      show-icon
    />
    <el-form label-width="140px">
      <el-form-item label="公司名称">
        <el-input v-model="companyInfo.name" disabled style="width:400px" />
      </el-form-item>
      <el-form-item label="公司地址">
        <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="companyInfo.remarks" disabled style="width:400px" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    companyInfo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style>

</style>
