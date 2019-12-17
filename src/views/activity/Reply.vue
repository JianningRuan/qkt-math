<template>
  <div class="white-wrapper flex flex-v">
    <BaseTit :tit="tit">
      <a class="submit-btn pr" slot="nav" @click="submit">提交</a>
    </BaseTit>
    <div class="main flex1 flex flex-v">
      <textarea class="reply-text mb flex1" placeholder="请输入评论内容" v-model="comment"></textarea>
      <van-uploader v-model="fileList" accept="image/*" preview-image :max-count="1" :before-read="beforeRead" :after-read="afterRead" @delete="beforeDelete" />
    </div>
  </div>
</template>

<script>
// import COS from 'cos-js-sdk-v5'
import wechat from '@/utils/wechat'
import Exif from 'exif-js'
export default {
  name: 'Reply',
  data () {
    return {
      id: '',
      summaryId: '',
      replyType: 1,
      tit: '评论',
      fileList: [],
      message: '',
      comment: '',
      picList: [],
      resourceId: '',
      type: 2,
      canSubmit: true,

      files: {
        name: '',
        type: ''
      },
      picValue: null,
      headerImage: null
    }
  },
  components: {},
  created () {
    this.id = parseInt(this.$route.query.id)
    this.type = parseInt(this.$route.query.type)
    this.replyType = parseInt(this.$route.query.replyType)
    if (this.replyType === 2) {
      this.tit = '回复'
      this.resourceId = parseInt(this.$route.query.resourceId)
    }
  },
  mounted () {
  },
  activated () {
  },
  destroyed () {
  },
  watch: {},
  computed: {},
  filters: {},
  methods: {
    beforeRead (file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$toast('请上传图片')
        return false
      }
      return true
    },
    async afterRead (file) {
      this.files.name = file.file.name // 获取文件名
      this.files.type = file.file.type // 获取类型
      this.picValue = file.file // 文件流
      this.imgPreview(this.picValue)
      /* let loading = this.$toast.loading({
        mask: true,
        message: '加载中...'
      })
      // 此时可以自行将文件上传至服务器
      let fileList = []
      fileList.push(file.file)
      let res = await wechat.upload(fileList, 1, 'backstage')
      loading.clear()
      let tempUrl = 'http://' + res[0]
      this.picList.push(tempUrl) */
    },
    // 处理图片
    async imgPreview (file) {
      let self = this
      let Orientation
      // 去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, 'Orientation')
      })
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let result = await this.uploadFile(file)
        // let img = new Image()
        // img.src = result
        // 判断图片是否大于500K,是就直接上传，反之压缩图片
        if (result.length <= 500 * 1024) {
          self.headerImage = result
          self.postImg()
        } else {
          self.createImage(result).then(img => {
            self.headerImage = self.compress(img, Orientation)
            self.postImg()
          })
          /* img.onload = function () {
            self.headerImage = self.compress(img, Orientation)
            self.postImg()
          } */
        }
        /* let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          // 判断图片是否大于500K,是就直接上传，反之压缩图片
          if (this.result.length <= 500 * 1024) {
            self.headerImage = this.result
            self.postImg()
          } else {
            img.onload = function () {
              self.headerImage = self.compress(img, Orientation)
              self.postImg()
            }
          }
        } */
      }
    },
    uploadFile (file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
          resolve(this.result)
        }
      })
    },
    createImage (result) {
      return new Promise((resolve, reject) => {
        let img = new Image()
        img.src = result
        img.onload = function () {
          resolve(img)
        }
      })
    },
    async postImg () {
      let loading = this.$toast.loading({
        mask: true,
        message: '加载中...'
      })
      let file = this.dataURLtoFile(this.headerImage)
      // 此时可以自行将文件上传至服务器
      let fileList = []
      fileList.push(file)
      let res = await wechat.upload(fileList, 1, 'summary')
      loading.clear()
      let tempUrl = 'http://' + res[0]
      this.picList.push(tempUrl)
    },
    // 压缩图片
    compress (img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      // 瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tCtx = tCanvas.getContext('2d')
      let width = img.width
      let height = img.height
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = (width * height) / 4000000) > 1) {
        // console.log("大于400万像素");
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      //    铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // 如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = (width * height) / 1000000) > 1) {
        // console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
        //      计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tCtx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      // 修复ios上传图片的时候 被旋转的问题
      if (Orientation !== '' && Orientation !== 1) {
        switch (Orientation) {
          case 6: // 需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas)
            break
          case 8: // 需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas)
            break
          case 3: // 需要180度旋转
            this.rotateImg(img, 'right', canvas) // 转两次
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      // 进行最小压缩
      let nData = canvas.toDataURL('image/jpeg', 0.1)
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return nData
    },
    // 旋转图片
    rotateImg (img, direction, canvas) {
      // 最小与最大旋转方向，图片旋转4次后回到原方向
      const minStep = 0
      const maxStep = 3
      if (img === null) return
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = 2
      if (step == null) {
        step = minStep
      }
      if (direction === 'right') {
        step++
        // 旋转到原位置，即超过最大值
        // step > max_step && (step = min_step)
        if (step > maxStep) {
          step = minStep
        }
      } else {
        step--
        // step < min_step && (step = max_step)
        if (step < minStep) {
          step = maxStep
        }
      }
      // 旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
    },
    // 将base64转换为文件
    dataURLtoFile (dataUrl) {
      let arr = dataUrl.split(',')
      let bStr = atob(arr[1])
      let n = bStr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bStr.charCodeAt(n)
      }
      return new File([u8arr], this.files.name, {
        type: this.files.type
      })
    },
    beforeDelete (file) {
      this.picList = []
    },
    submit () {
      if (!this.canSubmit) {
        return
      }
      if (this.comment === '') {
        this.$toast('请输入评论内容')
        return
      }
      this.canSubmit = false
      const params = {
        comment: this.comment,
        picList: this.picList,
        resourceId: this.id,
        type: this.type
      }
      if (this.replyType === 2) {
        params.summaryId = this.resourceId
      }
      this.$api.label.addSummary(params).then((res) => {
        if (res.rcode === 300) {
          this.$toast(res.message)
          this.$router.go(-1)
        } else {
          res.$toast(res.message)
        }
        this.canSubmit = true
      }).catch(() => {
        this.canSubmit = true
      })
    }
  }
}
</script>

<style scoped lang="scss" src="./Reply.scss"></style>
