<template>
  <div id="video-detail">
    <BaseTit @goBack="goBack"></BaseTit>
    <div class="video">
      <video-player class="video-player-box"
                    ref="videoPlayer"
                    :options="playerOptions"
                    :playsinline="playInLine"
                    customEventName="customstatechangedeventname"
                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"
                    @loadeddata="onPlayerLoadedData($event)"
                    @statechanged="playerStateChanged($event)"
                    @canplaythrough="onPlayerCanPlayThrough($event)"
                    @ready="playerReadied">
      </video-player>
      <!---
      <video-player  class="video-player-box"
                     ref="videoPlayer"
                     :options="playerOptions"
                     :playsinline="playInLine"
                     customEventName="customstatechangedeventname"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
                     @ended="onPlayerEnded($event)"
                     @waiting="onPlayerWaiting($event)"
                     @playing="onPlayerPlaying($event)"
                     @loadeddata="onPlayerLoadeddata($event)"
                     @timeupdate="onPlayerTimeupdate($event)"
                     @canplay="onPlayerCanplay($event)"
                     @canplaythrough="onPlayerCanplaythrough($event)"
                     @statechanged="playerStateChanged($event)"
                     @ready="playerReadied">
      </video-player>
      -->
      <!--      <img class="cover" src="https://ss0.baidu.com/73x1bjeh1BF3odCf/it/u=4096777981,723949104&fm=85&s=60809C181A3467824A2841C30300E0B2" />-->
      <!--<video
        id="player"
        ref="video"
        controls
        style="object-fit:fill"
        webkit-playsinline='true'
        playsinline="true"
        x5-playsinline="true"
        x-webkit-airplay="true"
        x5-video-player-fullscreen="true"
        x5-video-ignore-metadata="true"
        x5-video-orientation="landscape"
      ></video>-->
    </div>
    <div class="tab flex flex-align-center">
      <a class="flex1 active">简介</a>
    </div>
    <!-- 简介 -->
    <div class="profile">
      <div class="video-profile">
        <div class="top flex flex-align-center">
          <span class="title flex1" v-if="video">{{video.videoName}}</span>
        </div>
        <div class="content" v-if="video">{{video.videoDescr || ''}}</div>
        <div class="msg flex" v-if="videoUserModel">
          <div class="flex1 operate">
            <a @click="addNice" :class="{'active': videoUserModel.userIsLike === 1}">
              <svg-icon  :icon-class="videoUserModel.userIsLike === 1?'baseline-thumb_up':'outline-thumb_up'"></svg-icon>
              <span class="value" v-if="video ">{{video.likeCount}}</span></a>
          </div>
        </div>
      </div>

      <!-- 相关视频 -->
      <div class="course">
        <div class="top-title">相关视频</div>
        <div class="course-list">
          <course-item :courses="lessons"></course-item>
          <div class="more" @click="toCourseSeries">查看全部</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import courseItem from '@/components/course-item/course-item'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
// import qs from 'qs'
window.videojs = require('video.js')
require('video.js/dist/lang/zh-CN')

export default {
  name: 'video-detail',
  components: {
    'course-item': courseItem,
    videoPlayer
  },
  data () {
    return {
      courseId: '',
      currentId: '',
      videoBox: '',
      video: {},
      videoUserModel: {},
      lessons: [],
      playerOptions: {
        // video.js options
        muted: false,
        language: 'zh-CN',
        sources: [],
        poster: '',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true
        }
      },
      timer: 0,
      isPlay: false,
      playInLine: true,
      videoTime: 0, // 视频总时长
      canPlay: false
    }
  },
  computed: {

  },
  watch: {
    /* '$route'(to, from){
      if (to.path === from.path && to.query.videoId !== from.query.videoId){
        Object.assign(this.$data, this.$options.data());
        this.videoInit();
      }
    } */
    '$route.query.videoId' (val) {
      clearInterval(this.setInterval)
      this.getVideoDetail()
      this.getAboutLesson()
    }
  },
  methods: {
    videoInit () {
      if (this.$route.query.videoId) {
        this.getVideoDetail()
        this.getAboutLesson()
      }
      const u = navigator.userAgent
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      const ua = window.navigator.userAgent.toLowerCase()
      const usMatch = ua.match(/MicroMessenger/i)
      if (usMatch && usMatch[0] === 'micromessenger') {
        // 微信
        if (isAndroid) {
          this.playInLine = false
        }
      }
    },
    async getVideoDetail () {
      let res = await this.$api.course.getVideoDetail({ videoId: this.$route.query.videoId })
      if (res && res.rcode === 300) {
        this.courseId = res.data.courseId
        this.currentId = res.data.currentId
        this.video = res.data.videoModel
        this.videoUserModel = res.data.videoUserModel
        this.playerOptions.poster = this.video.videoPic
        this.playerOptions.sources = [{
          type: 'video/mp4',
          src: this.video.videoUrl
        }]
      }
    },
    // 获取相关课程
    async getAboutLesson () {
      let res = await this.$api.course.getAboutLesson({ videoId: this.$route.query.videoId })
      if (res && res.rcode === 300) {
        this.lessons = res.data.lessonList
      }
    },
    // listen event
    onPlayerPlay (player) {
      this.videoBox = player
      this.isPlay = true
      this.setInterval = setInterval(() => {
        this.timer++
        if (this.timer % 30 === 0) {
          this.updateUserPlayStatus(player)
          this.timer = 0
        }
      }, 1000)
    },
    onPlayerPause (player) {
      clearInterval(this.setInterval)
      this.updateUserPlayStatus(player)
      this.isPlay = false
    },
    playerStateChanged (playerCurrentState) {},
    playerReadied (player) {},
    onPlayerEnded (player) {
      this.timer = 0
      // clearInterval(this.setInterval)
      // this.updateUserPlayStatus(player)
      // this.isPlay = false
    },
    onPlayerCanPlayThrough (player) {
      this.canPlay = true
      // 获取总时长  获得的原始数据为秒单位
      this.videoTime = parseInt(player.duration())
    },
    onPlayerLoadedData (player) {
      if (this.videoUserModel && this.videoUserModel.position !== this.video.videoTime) {
        player.currentTime(this.videoUserModel.position)
      }
    },
    // 前往课程系列
    toCourseSeries () {
      this.$router.push({ name: 'courseSeries' })
    },
    // 更新用户播放情况
    async updateUserPlayStatus (player) {
      if (!this.canPlay || !player) {
        return
      }
      let time = parseInt(player.currentTime())
      if (time === 0) { // 定位0秒就不发送了，发送了也是报错
        return
      }
      await this.$api.course.updateVideoBrowse({
        currentId: this.currentId,
        position: time,
        readTime: this.timer,
        videoId: this.video.videoId,
        videoTime: this.videoTime
      })
    },
    async addNice () {
      let res = await this.$api.until.updateLike({
        resourceId: this.video.videoId,
        type: 2
      })
      if (res && res.rcode === 300) {
        this.video.likeCount = res.data.likeCount
        this.videoUserModel.userIsLike = res.data.likeState ? 1 : 0
      }
    },
    goBack () {
      if (this.isPlay) {
        this.updateUserPlayStatus(this.videoBox) // 路由触发的时候，发起一次视频记录更新请求
      }
    }
  },
  mounted () {
    this.videoInit()
  },
  created () {

  },
  beforeDestroy () {
    if (this.isPlay) {
      this.updateUserPlayStatus(this.videoBox) // 路由触发的时候，发起一次视频记录更新请求
    }
  },
  destroyed () {
    clearInterval(this.setInterval)
  }
}
</script>

<style scoped lang="scss" src="./detail.scss"></style>
