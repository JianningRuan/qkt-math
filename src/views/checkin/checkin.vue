<template>
    <div id="checkin">
      <BaseTit></BaseTit>
      <!--头部统计-->
      <header class="flex flex-align-center">
        <div class="header-warp">
          <div class="title">已签到天数</div>
          <div class="num">{{signInCount}}</div>
        </div>
      </header>

      <!-- 学习时长统计 -->
      <div class="study-time-static">
        <div class="title">学习时长统计</div>
        <div class="cont">
          <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback" class="study-time-static-list">
            <!-- slides -->
            <swiper-slide class="study-time-static-item" v-for="(learningTime, index) in learningTimeList" :key="index">
              <div class="date" v-if="index === 6">今天</div>
              <div class="date" v-else>{{learningTime.learningTime | moment('MM-DD')}}</div>
              <div class="column">
                <div class="column-warp">
                  <div class="column-warp-inner">
                    <div class="column-rect" :style="setRectHeight(learningTime.timeCount)">
                      <span class="column-text">{{learningTime.timeCount | timeFormat}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <!-- 每日目标 -->
      <div class="day-task">
        <div class="top">
          <div class="title">每日目标</div>
          <div class="drsc">完成以下目标，即可完成当天签到</div>
        </div>
        <div class="day-task-list">
          <div class="day-task-item flex flex-align-center">
            <div class="cont flex1">
              <div class="title">视频</div>
              <div class="drsc">每天观看1个视频课程<span> {{isVideo ? 1 : 0}}/1</span></div>
            </div>
            <div class="operate" v-if="isVideo">
              <img src="~@/assets/images/checkin/finished.png" />
            </div>
            <div class="operate" @click="goVideo" v-else>
              <img src="~@/assets/images/checkin/finish.png" />
            </div>
          </div>
          <div class="day-task-item flex flex-align-center">
            <div class="cont flex1">
              <div class="title">练习</div>
              <div class="drsc">每天达成1个练习目标<span> {{isStudy ? 1 : 0}}/1</span></div>
            </div>
            <div class="operate" v-if="isStudy">
              <img src="~@/assets/images/checkin/finished.png" />
            </div>
            <div class="operate" @click="goPractice" v-else>
              <img src="~@/assets/images/checkin/finish.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'checkin',
  data () {
    return {
      /* swiper配置 */
      swiperOption: {
        slidesPerView: 6,
        centeredSlides: true
      },
      learningTimeList: [],
      isStudy: false,
      isVideo: false,
      signInCount: 0,
      maxHeight: 0
    }
  },
  components: {
    [swiper.name]: swiper,
    [swiperSlide.name]: swiperSlide
  },
  created () {
    this.getSignInInfo()
    this.getLearningTime()
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
    getSignInInfo () {
      this.$api.checkIn.getSignInInfo().then((res) => {
        if (res.rcode === 300) {
          this.isStudy = res.data.isStudy
          this.isVideo = res.data.isVideo
          this.signInCount = res.data.signInCount
        }
      })
    },
    getLearningTime () {
      const params = {
        type: 1
      }
      this.$api.checkIn.getLearningTime(params).then((res) => {
        if (res.rcode === 300) {
          let list = res.data.list
          let timeCountList = []
          list.forEach(val => {
            timeCountList.push(val.timeCount)
          })
          let maxHeight = Math.max.apply(null, timeCountList) // 取得最大值
          if (maxHeight === 0) {
            this.maxHeight = 10 * 60
          } else {
            this.maxHeight = maxHeight
          }
          this.learningTimeList = list
          this.$nextTick(() => {
            this.$refs.mySwiper.swiper.slideTo(6)
          })
        }
      })
    },
    setRectHeight (val) {
      // const allTime = 10 * 60 // 10分钟
      let height = parseInt(val / this.maxHeight * 100)
      height = height > 100 ? 100 : height
      return { height: height + 'px' }
    },
    goVideo () {
      this.$router.push({
        path: '/'
      })
    },
    goPractice () {
      this.$router.push({
        name: 'MathPractice'
      })
    },
    callback () {}
  }
}
</script>

<style scoped lang="scss" src="./checkin.scss"></style>
