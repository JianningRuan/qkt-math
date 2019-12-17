<template>
  <div>
    <BaseInnerPageHead :tit="tit" :isBack="isBack" @goBack="goBack" />
    <div class="main">
      <div class="home-box result-box mb">
        <div class="result-pic">
          <img src="@/assets/images/test/perfect.png" v-if="result.result === '拔尖'" />
          <img src="@/assets/images/test/fine.png" v-else-if="result.result === '优秀'" />
          <img src="@/assets/images/test/base.png" v-else />
        </div>
        <div class="result-info flex">
          <div class="result-item flex1">
            <h4>{{result.speed}}题/min</h4>
            <p>答题速度</p>
          </div>
          <div class="result-item flex1">
            <h4>{{result.allRate}}%</h4>
            <p>总体正确率</p>
          </div>
        </div>
        <div class="result-circle flex flex-pack-around">
          <div class="circle-item" ref="bCircle" v-if="result.jcRate !== undefined">
            <CircleProgress
              :id="1"
              :progress="result.jcRate"
              class="progress"
              :width="circleParams.width"
              :radius="circleParams.radius"
              :barColor="circleParams.barColor"
              :duration="circleParams.duration"
              :delay="circleParams.delay"
              :backgroundColor="circleParams.backgroundColor">
            </CircleProgress>
            <div class="circle-info">
              <p>基础题</p>
              <h4>{{result.jcRate}}%</h4>
            </div>
          </div>
          <div class="circle-item" ref="mCircle" v-if="result.zdRate !== undefined">
            <CircleProgress
              :id="2"
              :progress="result.zdRate"
              class="progress"
              :width="circleParams.width"
              :radius="circleParams.radius"
              :barColor="circleParams.barColor"
              :duration="circleParams.duration"
              :delay="circleParams.delay"
              :backgroundColor="circleParams.backgroundColor">
            </CircleProgress>
            <div class="circle-info">
              <p>中等题</p>
              <h4>{{result.zdRate}}%</h4>
            </div>
          </div>
          <div class="circle-item" ref="jCircle" v-if="result.jjRate !== undefined">
            <CircleProgress
              :id="3"
              :progress="result.jjRate"
              class="progress"
              :width="circleParams.width"
              :radius="circleParams.radius"
              :barColor="circleParams.barColor"
              :duration="circleParams.duration"
              :delay="circleParams.delay"
              :backgroundColor="circleParams.backgroundColor">
            </CircleProgress>
            <div class="circle-info">
              <p>进阶题</p>
              <h4>{{result.jjRate}}%</h4>
            </div>
          </div>
        </div>
        <div class="result-tips">
          <div class="tips-tit">提升建议</div>
          <div class="tips-cont" v-html="result.suggest"></div>
        </div>
        <a class="light-btn join-btn" @click="goHome">开启数学口算之旅</a>
      </div>
    </div>

    <BasePop :basePop="basePop" :popShow="popShow" @submitPop="submitPop" @cancelPop="cancelPop"></BasePop>
  </div>
</template>

<script>
import CircleProgress from '@/components/CircleProgress'
import { bool } from '../../utils/common'
import { mapActions } from 'vuex'
export default {
  name: 'TestResult',
  data () {
    return {
      tit: '口算评测报告',
      isBack: false,
      result: {},
      replace: false,
      circleParams: {
        width: 70,
        radius: 10,
        progress: 70,
        duration: 1000,
        delay: 20,
        barColor: '#5cc6fd',
        backgroundColor: '#fcd644',
        timeFunction: 'cubic-bezier(0.99, 0.01, 0.22, 0.94)'
      },
      popShow: false,
      basePop: {
        type: 'confirm', // alert, confirm
        submitBtnText: '确定替换', // 确定按钮的文字
        cancelBtnText: '暂时不换', // 取消按钮的文字
        tit: '温馨提示',
        content: '为了更好的提升口算能力，系统为你匹配新的训练任务，新的训练任务将会替代旧的任务哦~', // 弹窗内容
        showCloseBtn: false // 是否显示关闭按钮
      }
    }
  },
  components: {
    CircleProgress
  },
  created () {
    let replace = this.$route.query.replace
    if (replace !== undefined) {
      this.replace = bool(replace)
    }
  },
  async mounted () {
    await this.getPowerInfo()
    this.setCircle()
    window.addEventListener('resize', this.setCircle, false)
    this.GetUserInfo() // 更新一次用户信息
  },
  activated () {
  },
  destroyed () {
    this.clearResizeListen()
  },
  watch: {},
  computed: {},
  filters: {},
  methods: {
    setCircle () {
      let bCircle = this.$refs.bCircle
      let mCircle = this.$refs.mCircle
      let jCircle = this.$refs.jCircle
      let circle
      if (bCircle) {
        circle = bCircle
      } else if (mCircle) {
        circle = mCircle
      } else if (jCircle) {
        circle = jCircle
      } else {
        return
      }
      let w = circle.clientWidth
      this.circleParams = {
        width: w,
        radius: 0.15 * w,
        progress: w,
        duration: 1000,
        delay: 20,
        barColor: '#5cc6fd',
        backgroundColor: '#fcd644',
        timeFunction: 'cubic-bezier(0.99, 0.01, 0.22, 0.94)'
      }
    },
    clearResizeListen () {
      window.removeEventListener('resize', this.setCircle)
    },
    async getPowerInfo () {
      let res = await this.$api.power.info()
      if (res.rcode === 300) {
        this.result = res.data
      }
    },
    goBack () {
      this.$router.push({
        path: '/'
      })
    },
    goHome () {
      if (this.replace) {
        this.popShow = true
      } else {
        this.backHome()
      }
    },
    async submitPop () {
      this.popShow = false
      let res = await this.$api.test.changeMajorTask()
      if (res.rcode === 300) {
        this.$toast('任务已替换')
      }
      this.backHome()
    },
    cancelPop () {
      this.popShow = false
      this.backHome()
    },
    backHome () {
      this.$router.push({
        path: '/index/practiceHome/mathPractice'
      })
    },
    ...mapActions([
      'GetUserInfo'
    ])
  }
}
</script>

<style scoped lang="scss" src="./TestResult.scss"></style>
