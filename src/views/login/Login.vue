<template>
  <div class="wrapper flex flex-v flex-align-center">
    <div class="logo">
      <img src="@/assets/images/login/logo.png" />
    </div>
    <div class="home-box login-box flex1 flex flex-v">
      <div class="flex1">
        <div class="input-box flex flex-align-center">
          <div class="login-icon-box"><svg-icon icon-class="mobile" class="login-icon"></svg-icon></div>
          <input class="flex1" type="number" pattern="[0-9]*" v-model="mobile" ref="mobile" placeholder="输入手机号码" @focus="onFocus" @blur="onBlur"/>
        </div>
        <div class="input-box flex flex-align-center flex-pack-justify">
          <div class="login-icon-box"><svg-icon icon-class="pic-code" class="login-icon"></svg-icon></div>
          <input class="" type="text" v-model="picCode" placeholder="输入图形验证码" @focus="onFocus" @blur="onBlur"/>
          <div class="pic-code" @click="changePic"><img v-if="imgUrl !== ''" :src="imgUrl" /></div>
        </div>
        <div class="input-box flex flex-align-center flex-pack-justify">
          <div class="login-icon-box"><svg-icon icon-class="shield" class="login-icon-big"></svg-icon></div>
          <input class="" type="number" pattern="[0-9]*" v-model="smsCode" maxlength="6" placeholder="输入验证码" @focus="onFocus" @blur="onBlur"/>
          <a class="get-code" :class="isCountdownStart ? 'break' : ''" @click="getCode">{{isCountdownStart?timer+'秒后获取':'获取验证码'}}</a>
        </div>
      </div>
      <a class="login-btn light-btn" @click="loginSubmit">进入优学口算<van-loading class="loading" size="20px" type="spinner" color="#ffffff" v-if="btnLoading" /></a>
      <div class="flex agreement-box">
        <a class="radio-btn" :class="{'radio-true' : agreementType}" @click="setAgreementType"><svg-icon icon-class="great"></svg-icon></a>
        <div class="flex1 agreement-cont">我已阅读并同意<a>《用户服务协议》</a>，未注册用户填写手机及验证码则代表注册为优学口算用户。</div>
      </div>
    </div>
  </div>
</template>

<script>
import { setToken } from '../../utils/auth'
import { mapMutations } from 'vuex'
import { awaitWrap } from '@/utils/common'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      picCode: '',
      smsCode: '',
      token: '',
      agreementType: true,
      isCountdownStart: false,
      timer: 60,
      imgUrl: '',
      inFocus: false,
      btnLoading: false,
      canSendCode: true
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
    clearInterval(this.interval)
  },
  watch: {
    mobile (newVal, oldVal) {
      if (/^1[3-9]\d{9}$/.test(newVal)) {
        this.imgUrl = this.$api.login.getPicture(newVal)
      }
    }
  },
  computed: {},
  filters: {},
  methods: {
    onFocus () {
      this.inFocus = true
    },
    onBlur () {
      this.inFocus = false
      setTimeout(() => {
        if (!this.inFocus) {
          window.scrollTo(0, 0)
        }
      }, 300)
    },
    // 换图形码
    changePic () {
      if (/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.imgUrl = this.$api.login.getPicture(this.mobile) + '&' + Math.random()
      } else {
        this.$toast('请先填写完整手机号码')
      }
    },
    // 协议打钩
    setAgreementType () {
      this.agreementType = !this.agreementType
    },
    // 验证手机号
    validPhone () {
      return new Promise((resolve) => {
        if (!(/^1[3-9]\d{9}$/.test(this.mobile))) {
          this.$toast('手机号格式错误')
          this.$refs.mobile.focus()
          return false
        } else {
          resolve()
        }
      })
    },
    // 获取手机验证码
    async getCode () {
      if (this.isCountdownStart) {
        return
      }
      if (!this.canSendCode) {
        return
      }
      if (this.mobile === '') {
        this.$toast('请先填写信息')
        return
      }
      await this.validPhone()
      if (this.picCode === '') {
        this.$toast('请先填写图形码')
        return
      }
      this.canSendCode = false
      let params = {
        mobile: this.mobile,
        picCode: this.picCode
      }
      let res = await this.$api.login.send(params)
      if (res.rcode === 300) {
        this.$toast('发送成功')
        this.isCountdownStart = true
        this.interval = setInterval(() => {
          if (this.timer > 1) {
            this.timer = this.timer - 1
          } else {
            clearInterval(this.interval)
            this.isCountdownStart = false
            this.timer = 60
          }
        }, 1000)
      } else {
        // 更换图形码
        this.$toast(res.message)
        this.changePic()
      }
      this.canSendCode = true
    },
    // 提交登录注册
    async loginSubmit () {
      if (this.btnLoading) {
        return
      }
      if (this.mobile === '') {
        this.$toast('请先填写信息')
        return
      }
      await this.validPhone()
      if (this.smsCode === '') {
        this.$toast('请先填写验证码')
        return
      }
      if (!this.agreementType) {
        this.$toast('请先阅读并同意《用户服务协议》')
        return
      }
      this.btnLoading = true
      let params = {
        mobile: this.mobile,
        clientId: 'arithmetic',
        secret: 'qkt',
        smsCode: this.smsCode
      }
      let [err, res] = await awaitWrap(this.$api.login.sms(params))
      if (err) {
        this.btnLoading = false
        this.changePic()
        return false
      }
      if (res.rcode !== 300) {
        this.$toast(res.message)
        this.btnLoading = false
        return
      }
      this.token = res.data.access_token
      setToken(res.data.access_token)
      this.SET_TOKEN(res.data.access_token)
      let [error, result] = await awaitWrap(this.$api.home.getStatus())
      this.btnLoading = false
      if (error) {
        this.$router.push({
          path: '/'
        })
        return
      }
      if (result.rcode === 300) {
        let firstLogin = result.data.firstLogin
        // let status = result.data.status
        if (firstLogin) { // 如果第一次登录需要去填写资料
          this.$router.push({
            path: '/personalData'
          })
          return
        }
        /* if (!status) { // 如果没测试需要去测试
          this.$router.push({
            path: '/testWelcome',
            query: {
              first: true
            }
          })
          return
        } */
        this.$router.push({
          path: '/'
        })
      }
    },
    ...mapMutations([
      'SET_TOKEN'
    ])
  }
}
</script>

<style scoped lang="scss" src="./Login.scss"></style>
