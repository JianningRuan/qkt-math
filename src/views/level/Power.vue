<template>
  <div>
    <BaseInnerPageHead :tit="tit" />
    <div class="main">
      <div class="home-box info-box flex">
        <div class="user-box flex">
          <div class="user-head">
            <img :src="userInfo.pic || './images/stu-head.png'" />
          </div>
          <div class="user-info flex flex-v flex-pack-around">
            <h2>{{userInfo.userName}}</h2>
            <div class="level-box" @click="goLevel">
              <div class="level-progress" :style="{width: (mathUserInfo.academicValue - mathUserInfo.lowerValue) / (mathUserInfo.upperValue - mathUserInfo.lowerValue) * 100 + '%'}"></div>
              <div class="level-name">Lv{{mathUserInfo.levelNum}}:{{mathUserInfo.levelName}}</div>
            </div>
          </div>
        </div>
        <div class="power flex flex-v flex-pack-center">
          <h2>{{mathUserInfo.academicValue}}</h2>
          <p>学力值</p>
        </div>
      </div>
      <!--能力-->
      <div class="home-box result-box">
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
      </div>
      <!---知识点说明-->
      <div class="home-box knowledge-box mb">
        <div class="knowledge-tit flex flex-pack-justify">
          <span>{{grade}}知识点</span>
          <span>正确率</span>
        </div>
        <div class="knowledge-list">
          <BaseNone class="pt" v-if="knowledgeList.length === 0">
            <div slot="tips">当前年级暂无知识点</div>
          </BaseNone>
          <div class="knowledge-item flex flex-align-center" v-for="(knowledge, index) in knowledgeList" :key="index">
            <div class="kn-icon"><svg-icon :icon-class="getIcon(index)"></svg-icon></div>
            <div class="kn-name flex1">{{knowledge.title}}</div>
            <div class="kn-num">{{knowledge.rate}}%</div>
          </div>
        </div>
        <a class="light-btn join-btn" @click="openGradePicker">查看其他年级</a>
      </div>
    </div>

    <van-popup v-model="showGradePicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="gradeList"
        value-key="name"
        @cancel="showGradePicker = false"
        @confirm="onGradeConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import CircleProgress from '@/components/CircleProgress'
import { mapGetters } from 'vuex'
import { common } from '@/utils/common'
export default {
  name: 'Power',
  data () {
    return {
      tit: '我的能力',
      mathUserInfo: {},
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
      grade: '',
      gradeId: 0,
      knowledgeList: [],
      gradeList: common.gradeList,
      showGradePicker: false
    }
  },
  components: {
    CircleProgress
  },
  created () {
  },
  async mounted () {
    this.getMathUserInfo()
    await this.getPowerInfo()
    this.setCircle()
    window.addEventListener('resize', this.setCircle, false)
  },
  activated () {
  },
  destroyed () {
    this.clearResizeListen()
  },
  watch: {},
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
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
    getMathUserInfo () {
      this.$api.home.getInfo().then((res) => {
        if (res.rcode === 300) {
          this.mathUserInfo = res.data
        }
      })
    },
    async getPowerInfo () {
      let res = await this.$api.power.info()
      if (res.rcode === 300) {
        this.result = res.data
        this.gradeId = res.data.grade
        this.grade = common.gradeList[res.data.grade - 1].name
        this.getKnowledge(this.gradeId)
      }
    },
    getKnowledge (grade) {
      let params = {
        grade
      }
      this.$api.power.knowledge(params).then((res) => {
        if (res.rcode === 300) {
          this.knowledgeList = res.data.knowledgeList
        }
      })
    },
    getIcon (index) {
      if (index < 6) {
        return 'knowledge1'
      } else if (index >= 6 && index < 12) {
        return 'knowledge2'
      } else if (index >= 12 && index < 18) {
        return 'knowledge3'
      } else if (index >= 18 && index < 24) {
        return 'knowledge4'
      } else if (index >= 24 && index < 30) {
        return 'knowledge5'
      } else if (index >= 30 && index < 36) {
        return 'knowledge6'
      } else if (index >= 36 && index < 42) {
        return 'knowledge7'
      } else if (index >= 42 && index < 48) {
        return 'knowledge8'
      } else {
        return 'knowledge9'
      }
    },
    openGradePicker () {
      this.showGradePicker = true
    },
    onGradeConfirm (value, index) {
      this.grade = value.name
      this.gradeId = value.id
      this.showGradePicker = false
      this.getKnowledge(this.gradeId)
    },
    goLevel () {
      this.$router.push({
        path: '/level'
      })
    }
  }
}
</script>

<style scoped lang="scss" src="./Power.scss"></style>
