<template>
  <div class="white-wrapper">
    <BaseTit></BaseTit>
    <div class="head-box">
      <div class="user-head">
        <img :src="userInfo.pic || './images/stu-head.png'" />
      </div>
      <div class="user-name flex flex-align-center flex-pack-center">{{userInfo.userName}}<span class="level-btn">LV{{userInfo.levelNum}}</span></div>
      <!--<div class="sign-label">己连签8天</div>-->
    </div>
    <div class="my-intro flex flex-pack-center flex-align-center">
      <div class="intro" @click="goErrorReport">
        <div class="intro-icon report-icon">
          <svg-icon icon-class="error-report"></svg-icon>
        </div>
        <p>错题本</p>
      </div>
      <div class="intro" @click="goMsgList">
        <div class="intro-icon msg-icon">
          <svg-icon icon-class="message"></svg-icon>
        </div>
        <p>消息</p>
      </div>
    </div>
    <div class="setting-list">
      <div class="setting flex flex-align-center flex-pack-justify" @click="goData">
        <div class="setting-cont flex flex-align-center">
          <svg-icon class="setting-icon" icon-class="file"></svg-icon>
          <span>个人资料</span>
        </div>
        <svg-icon class="arrow-icon" icon-class="right"></svg-icon>
      </div>
      <div class="setting flex flex-align-center flex-pack-justify" @click="goSelectUser">
        <div class="setting-cont flex flex-align-center">
          <svg-icon class="setting-icon" icon-class="user"></svg-icon>
          <span>切换用户</span>
        </div>
        <svg-icon class="arrow-icon" icon-class="right"></svg-icon>
      </div>
      <div class="setting flex flex-align-center flex-pack-justify" @click="goFeedback">
        <div class="setting-cont flex flex-align-center">
          <svg-icon class="setting-icon" icon-class="feedback"></svg-icon>
          <span>帮助与反馈</span>
        </div>
        <svg-icon class="arrow-icon" icon-class="right"></svg-icon>
      </div>
    </div>
    <!--<div class="head-box">
      <div class="user-head" @click="goMyPower">
        <img :src="userInfo.pic || './images/stu-head.png'" />
      </div>
      <h2>{{userInfo.name}}</h2>
      <div class="level-box">
        <div class="level-progress" :style="{width: userInfo.academicValue / userInfo.upperValue * 100 + '%'}"></div>
        <div class="level-name">Lv{{userInfo.levelNum}}:{{userInfo.levelName}}</div>
      </div>
    </div>
    <div class="my-menu">
      <a class="item flex flex-align-center" @click="goData">
        <div class="img modify"></div>
        <span class="flex1">修改资料</span>
        <svg-icon icon-class="right" class="right-icon"></svg-icon>
      </a>
      <a class="item flex flex-align-center" @click="goFeedback">
        <div class="img msg"></div>
        <span class="flex1">意见反馈</span>
        <svg-icon icon-class="right" class="right-icon"></svg-icon>
      </a>
      <a class="item flex flex-align-center" @click="goAbout">
        <div class="img about"></div>
        <span class="flex1">关于我们</span>
        <svg-icon icon-class="right" class="right-icon"></svg-icon>
      </a>
    </div> -->
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'MyHome',
  data () {
    return {}
  },
  components: {},
  created () {
    this.SET_INDEX_TAB(2)
  },
  mounted () {
  },
  activated () {
  },
  destroyed () {
  },
  watch: {},
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  filters: {},
  methods: {
    goMsgList () {
      this.$router.push({
        path: '/msgList'
      })
    },
    goSelectUser () {
      this.$router.push({
        path: '/selectUser'
      })
    },
    goErrorReport () {
      this.$router.push({
        path: '/errorReport'
      })
    },
    goData () {
      this.$router.push({
        path: '/data'
      })
    },
    goFeedback () {
      this.$router.push({
        path: '/feedback'
      })
    },
    goAbout () {
      this.$router.push({
        path: '/about'
      })
    },
    goMyPower () {
      this.$router.push({
        path: '/power'
      })
    },
    ...mapMutations([
      'SET_INDEX_TAB'
    ])
  }
}
</script>

<style scoped lang="scss" src="./MyHome.scss"></style>
