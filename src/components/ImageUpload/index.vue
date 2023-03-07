<template>
  <div class="image-update-container">
    <el-upload
      :file-list="fileList"
      :limit="1"
      list-type="picture-card"
      :on-preview="preview"
      :on-remove="remove"
      :on-change="change"
      :before-upload="beforeUpload"
      :http-request="upload"
      :class="{disabled: fileList.length}"
      action="#"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 预览弹出层 -->
    <el-dialog title="图片预览" :visible.sync="showDialog">
      <img :src="imgUrl" style="width: 100%;">
    </el-dialog>
    <!-- 进度条 -->
    <el-progress v-if="showPercent" :percentage="percent" style="width: 180px;" />
  </div>
</template>
<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云的包
// 需要实例化
const cos = new COS({
  SecretId: 'AKIDrY2OcfXDh195pjRxIRL7j9KHKBqGUajj',
  SecretKey: 'qV1IKDuMYWHqBJG2c1JQIvNdfT4SdaLs'
}) // 实例化的包 已经具有了上传的能力 可以上传到该账号里面的存储桶了
export default {
  data() {
    return {
      fileList: [],
      imgUrl: '',
      showDialog: false,
      currentFileUid: '', // 用一个变量 记住当前上传的图片id
      percent: 0,
      showPercent: false // 默认不显示进度条
    }
  },
  methods: {
    // 点击文件列表中已上传的文件时的钩 可以设置点击预览的效果
    preview(file) {
    //   console.log(file)
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 文件列表移除文件时的钩子 , 当执行删除时 列表里的内容不会自动删除 需要手动操作
    remove(file) {
    // file是点击删除的文件
    //   将原来的文件给排除掉了 剩下的就是最新的数组了
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    // 修改文件时触发
    // 此时可以用fileList 因为该方法会进来很多遍 不能每次都去push
    // fileList因为fileList参数是当前传进来的最新参数 我们只需要将其转化成数组即可 需要转化成一个新的数组
    // [] => [...fileList] [] => fileList.map()
    // 上传成功之后 还会进来 需要实现上传代码的逻辑 这里才会成功
    change(file, fileList) {
      this.fileList = fileList.map(item => item)
    //   console.log(this.fileList)
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeUpload(file) {
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      //   console.log(file)
      // 判断文件上传类型
      if (!types.includes(file.type)) {
        this.$message.error('仅支持image/jpeg, image/gif, image/bmp, image/png文件格式')
        return
      }
      // 判断文件上传大小 文件大小不超过5M
      if (file.size > 5 * 1024 * 1024) {
        this.$message.error('文件大小需在5M以内')
      }
      // file.uid
      this.currentFileUid = file.uid // 记住当前的uid
      this.showPercent = true
      return true
    },
    upload(params) {
      if (params.file) {
        cos.putObject({
          // 配置
          Bucket: 'chriswangyx-1317120340', // 存储桶名称
          Region: 'ap-chengdu', // 存储桶地域
          Key: params.file.name, // 文件名作为key
          StorageClass: 'STANDARD', // 此类写死
          Body: params.file, // 将本地的文件赋值给腾讯云配置
          // 进度条
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          // 需要判断错误与成功
          if (!err && data.statusCode === 200) {
            // 如果没有失败表示成功了
            // 此时认为上传成功了
            // this.currentFileUid
            // 仍然有个小问题， 比如此时我们正在上传，但是调用了保存，保存在上传过程中进行，
            // 此时上传还没有完成  此时可以这样做 ： 给所有上传成功的图片 加一个属性 upload: true
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                //   upload为true表示 该图片已经成功上传到服务器，地址已经是腾讯云的地址了  就不可以执行保存了
                return { url: 'http://' + data.Location, upload: true } // 将本地的地址换成腾讯云地址
              }
              return item
            })
            setTimeout(() => {
              this.showPercent = false // 隐藏进度条
              this.percent = 0 // 进度归0
            }, 2000)

            // 将腾讯云地址写入到fileList上 ，保存的时候 就可以从fileList中直接获取图片地址

            // 此时注意，我们应该记住 当前上传的是哪个图片  上传成功之后，将图片的地址赋值回去
          }
        })
      }
    }

  }
}
</script>
<style>
.image-update-container .disabled .el-upload.el-upload--picture-card {
    display: none;
}
</style>
