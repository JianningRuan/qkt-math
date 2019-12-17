<template>
  <div class="main">

    <div class="home-box word-box mt mb">
      <div class="lesson-main flex flex-v" :class="{'flex-pack-center': info.status === 2 || info.status === 3}">
        <template v-if="info.status === 0">
          <div class="lesson-tit flex flex-pack-justify flex-align-center ml mr">
            <div class="tit">{{info.bookName}}</div>
            <a class="change" @click="goWordBook">更换<svg-icon icon-class="right"></svg-icon></a>
          </div>
          <div class="study-box flex1 flex" v-if="info.studyWords || info.needReviewWords" :class="info.studyWords !== undefined && info.needReviewWords !== undefined ? 'flex-pack-justify' : 'flex-pack-center'"><!--flex-pack-center-->
            <div class="num-box flex flex-v flex-align-center flex-pack-center">
              <h3>{{info.studyWords || 0}}</h3>
              <p>今日学习</p>
            </div>
            <div class="num-box flex flex-v flex-align-center flex-pack-center">
              <h3>{{info.needReviewWords || 0}}</h3>
              <p>今日复习</p>
            </div>
          </div>
          <div class="lesson-msg flex1 flex flex-v flex-pack-around flex-align-center" v-else>
            <div v-if="info.newWords || info.reviewWords">
              <div class="lesson-avatar no-lesson finish-lesson"></div>
              <h5 class="msg-tit">今天背单词已完成</h5>
              <p class="msg-tips">新学习单词{{info.newWords || 0}}个，复习单词{{info.reviewWords || 0}}个</p>
            </div>
            <div v-else>
              <div class="lesson-avatar no-lesson finish-lesson"></div>
              <h5 class="msg-tit">今日无背单词任务</h5>
              <p class="msg-tips">劳逸结合，休息补充能量，明天再来</p>
            </div>
          </div>
        </template>
        <div class="lesson-finish-msg flex1 flex flex-v flex-pack-around flex-align-center" v-else>
          <div>
            <div class="lesson-avatar no-lesson finish-lesson"></div>
            <h5 class="msg-tit">{{info.bookName}}</h5>
            <p class="msg-tips" v-if="info.status === 1 && !info.review">已经学习完成<br/>明天进入第{{info.reviewNum}}轮总复习</p>
            <p class="msg-tips" v-else-if="(info.status === 1 && info.review && !info.finish) || (info.status === 2 && !info.finish)">已经学习完成<br/>快开始第{{info.reviewNum}}轮总复习</p>
            <p class="msg-tips" v-else>第{{info.reviewNum}}轮总复习已完成<br/>你可以选择</p>
          </div>
        </div>

        <div class="progress-box">
          <div class="main progress-msg flex flex-pack-justify flex-align-center">
            <div class="progress-num">已学完{{(info.wordsNum && info.wordsNum > 0) ? parseInt(info.finishNum /info.wordsNum * 100) : 0}}%</div>
            <!--<a class="more">{{info.wordsDay}}词/天<svg-icon class="right" icon-class="right"></svg-icon></a>-->
          </div>
          <div class="progress-line-wrapper">
            <div class="progress-line" :style="{'width': ((info.wordsNum && info.wordsNum > 0) ? parseInt(info.finishNum / info.wordsNum * 100) : 0) + '%'}">
              <div class="bee" v-if="info.finishNum / info.wordsNum !== 1"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="lesson-bottom flex flex-v flex-align-center flex-pack-center">
        <div class="main flex flex-pack-justify">
          <!--<a class="reset-btn" v-if="info.reviewNum === 4 && info.finish">重新学习</a>-->
          <a class="start-btn flex1 flex flex-pack-center" v-if="info.studyWords || info.needReviewWords" @click="goStudy"><em>开始学习</em><span class="right absolute"><svg-icon icon-class="right"></svg-icon></span></a>
          <a class="start-btn flex1 flex flex-pack-center" v-else-if="info.status === 2 && !info.finish" @click="goFinalExercise"><em>开始复习</em><span class="right absolute"><svg-icon icon-class="right"></svg-icon></span></a>
          <a class="start-btn flex1 flex flex-pack-center" v-else @click="goWordBook"><em>学习其他计划</em><span class="right absolute"><svg-icon icon-class="right"></svg-icon></span></a>
        </div>
        <!--<div class="main flex flex-pack-justify">
          <a class="start-btn flex1 flex flex-pack-center"><em>学习其他计划</em><span class="right absolute"><svg-icon icon-class="right"></svg-icon></span></a>
        </div>-->
        <div class="tips"><svg-icon icon-class="star"></svg-icon>{{tips}}</div>
      </div>
    </div>

    <div class="check-box flex flex-align-center mb" @click="goWordList">
      <a class="check-btn">错题复习<svg-icon icon-class="right"></svg-icon></a>
      <div class="label"></div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'CnWordPractice',
  data () {
    return {
      info: {},
      tips: ''
    }
  },
  components: {},
  created () {
    this.SET_PRACTICE_TAB(2)
    this.getToday()
  },
  mounted () {
    this.getInfo()
  },
  activated () {
  },
  destroyed () {
  },
  watch: {},
  computed: {},
  filters: {},
  methods: {
    // 获取今天时一年中的第几天
    getToday () {
      let today = Math.ceil((new Date() - new Date(new Date().getFullYear().toString())) / (24 * 60 * 60 * 1000)) + 1
      if (today % 2 === 1) {
        this.tips = '坚持就是胜利，每天学习进步'
      } else {
        this.tips = '唯梦想与坚持不可辜负'
      }
    },
    getInfo () {
      this.$api.cnWord.index().then((res) => {
        if (res.rcode === 300) {
          if (res.data) { // 为减少页面代码的修改，在这里直接控制，让info能为null
            let arr = Object.keys(res.data)
            if (arr.length > 0) {
              this.info = res.data
            }
          }
        }
      })
    },
    goWordBook () {
      this.$router.push({
        path: '/cnWordBook'
      })
    },
    goWordList () {
      this.$router.push({
        path: '/cnWordList'
      })
    },
    goStudy () {
      this.$router.push({
        path: '/cnWordCard'
      })
    },
    goFinalExercise () {
      this.$router.push({
        path: '/cnWordCard',
        query: {
          type: 'final'
        }
      })
    },
    ...mapMutations([
      'SET_PRACTICE_TAB'
    ])
  }
}
</script>

<style scoped lang="scss" src="./WordPractice.scss"></style>
