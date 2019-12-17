<template>
  <div class="white-wrapper flex flex-v">
    <BaseTit></BaseTit>
    <div class="main tit flex flex-align-center">
      <input type="text" class="tit-input flex1" placeholder="标题" v-model="tit" maxlength="50" />
    </div>
    <div class="main flex1 flex flex-v">
      <textarea class="note-box flex1" placeholder="请输入你的宝贵建议、意见和问题..." maxlength="200" v-model="desc" @input="descInput" @blur="onBlur"></textarea>
      <div class="font mb">{{remnant}}/200</div>
      <!--<van-uploader :max-count="1" :after-read="afterRead" /> -->
    </div>
    <div class="main submit-wrapper flex flex-align-center flex-pack-justify">
      <!--<van-uploader v-model="fileList" :max-count="1" :after-read="afterRead">
        <svg-icon class="upload-btn" icon-class="camera"></svg-icon>
      </van-uploader>
      <div class="image-preview" v-for="pic in picList" :key="pic">
        <img :src="pic" />
      </div>-->
      <div></div>
      <div class="light-btn submit-btn" @click="submit">提交</div>
    </div>
    <!--<BaseInnerPageHead :tit="tit" />
    <div class="main">
      <div class="home-box feedback-box">
        <div class="take_note"></div>
        <textarea class="note-box" placeholder="请输入你的宝贵建议、意见和问题..." maxlength="200" v-model="desc" @input="descInput" @blur="onBlur"></textarea>
        <div class="font mb">{{remnant}}/200</div>
        <a class="submit-btn light-btn" @click="submit">提交</a>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: 'Feedback',
  data () {
    return {
      tit: '',
      desc: '',
      remnant: 0,
      fileList: [],
      picList: [],
      submitSwitch: true
    }
  },
  components: {},
  created () {
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
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    onBlur () {
      window.scrollTo(0, 0)
    },
    descInput () {
      let txtVal = this.desc.length
      this.remnant = txtVal
    },
    submit () {
      if (!this.submitSwitch) {
        return
      }
      if (this.tit.length === 0) {
        this.$toast('请输入标题再提交')
        return
      }
      if (this.desc.length === 0) {
        this.$toast('请输入反馈内容再提交')
        return
      }
      this.submitSwitch = false
      let params = {
        title: this.tit,
        content: this.desc
      }
      this.$api.my.suggestion(params).then((res) => {
        if (res.rcode === 300) {
          this.$toast('提交成功')
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        } else {
          this.$toast(res.message)
        }
        this.submitSwitch = true
      }).catch(() => {
        this.submitSwitch = true
      })
    }
  }
}
</script>

<style scoped lang="scss" src="./Feedback.scss"></style>
