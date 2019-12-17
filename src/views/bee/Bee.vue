<template>
  <div class="wrapper">
    <div class="sun-bg"></div>
    <!--移动的云-->
    <div class="cloud-b"></div>
    <div class="cloud-m"></div>
    <div class="cloud-s"></div>
    <!--移动的云-end-->
    <div class="box">
      <BaseInnerPageHead :tit="tit" />
      <div class="main bee-main flex flex-h-r">
        <div class="nav-list">
          <div class="nav-item calendar" @click="goCalendar">
            <div class="font calendar-font"></div>
          </div>
          <div class="nav-item task" @click="openTaskList">
            <div class="font task-font"></div>
          </div>
          <div class="nav-item gift" @click="openGiftList">
            <div class="font gift-font"></div>
          </div>
        </div>
        <div class="honey-box">
          <div class="honey-num">{{nutrition}}g</div>
        </div>
      </div>
      <div class="bee"></div>
      <div class="shadow"></div>
      <div class="tips" v-if="!study">快来领取任务，帮我收集蜂蜜吧</div>
    </div>
    <!--任务弹窗-->
    <van-popup v-model="showTask" position="bottom" class="bee-pop">
      <div class="task-icon"></div>
      <div class="main pop-main">
        <div class="tit">每日任务</div>
        <div class="task-list">
          <div class="task-item flex flex-pack-justify flex-align-center">
            <div class="flex1 flex flex-v flex-pack-justify">
              <div class="task-tit">完成每日学习任务</div>
              <div class="task-cont"><span>奖励</span><img src="@/assets/images/bee/honey.png" />5g</div>
            </div>
            <a class="light-btn done-btn" :class="{'finish-btn' : study}" v-if="!studyNutrition" @click="goFinish">{{study ? '领取' : '去完成'}}</a>
            <a class="end" v-else>已领取</a>
          </div>
          <div class="task-item flex flex-pack-justify flex-align-center">
            <div class="flex1 flex flex-v flex-pack-justify">
              <div class="task-tit">每日登录优学口算</div>
              <div class="task-cont"><span>奖励</span><img src="@/assets/images/bee/honey.png" />5g</div>
            </div>
            <a class="light-btn done-btn finish-btn" v-if="!signIn" @click="getNutrition">领取</a>
            <a class="end" v-else>已领取</a>
          </div>
        </div>
      </div>
    </van-popup>
    <!--任务弹窗-end-->
    <!--礼品屋-->
    <van-popup v-model="showGift" position="bottom" class="bee-pop">
      <div class="gift-icon"></div>
      <div class="main pop-main">
        <div class="tit">礼物屋</div>
        <BaseNone class="mt mb">
          <div slot="tips">礼物屋正在装修中，敬请期待哦~</div>
        </BaseNone>
      </div>
    </van-popup>
    <!--礼品屋-end-->
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Bee',
  data () {
    return {
      tit: '勤劳小蜜蜂',
      showTask: false,
      showGift: false,
      signIn: false,
      study: false,
      studyNutrition: false,
      nutrition: 0
    }
  },
  components: {},
  created () {
    this.getIndex()
    this.getTask()
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
    getIndex () {
      this.$api.bee.index().then((res) => {
        if (res.rcode === 300) {
          this.nutrition = res.data.nutrition
        }
      })
    },
    getTask () {
      this.$api.bee.task().then((res) => {
        if (res.rcode === 300) {
          this.signIn = res.data.signIn
          this.study = res.data.study
          this.studyNutrition = res.data.studyNutrition
        }
      })
    },
    goFinish () {
      if (this.study) {
        // 领取
        let params = {
          type: 2
        }
        this.$api.bee.getNutrition(params).then((res) => {
          if (res.rcode === 300) {
            this.studyNutrition = true
            this.nutrition = this.nutrition + 5
            this.$toast('领取成功')
          } else {
            this.$toast(res.message)
          }
        })
      } else {
        this.SET_TASK_TAB(0)
        this.$router.push({
          path: '/taskHistory'
        })
      }
    },
    getNutrition () {
      let params = {
        type: 1
      }
      this.$api.bee.getNutrition(params).then((res) => {
        if (res.rcode === 300) {
          this.signIn = true
          this.nutrition = this.nutrition + 5
        }
        this.$toast(res.message)
      })
    },
    goCalendar () {
      this.$router.push({
        path: '/beeCalendar'
      })
    },
    openTaskList () {
      this.showTask = true
    },
    openGiftList () {
      this.showGift = true
    },
    ...mapMutations('task', [
      'SET_TASK_TAB'
    ])
  }
}
</script>

<style scoped lang="scss" src="./Bee.scss"></style>
