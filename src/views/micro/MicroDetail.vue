<template>
  <div :class="micro.type === 0 ? 'white-wrapper': ''"><!--white-wrapper-->
    <template v-if="micro.type === 0">
      <BaseTit></BaseTit>
      <div class="main activity-detail">
        <h1>{{micro.title}}</h1>
        <p class="activity-info">{{micro.authorName || '全课通'}}<em class="pl">浏览次数：{{views}}</em> <em class="pl">{{micro.createTimestamp | moment('YYYY-MM-DD')}}</em></p>
        <div class="micro-pic pt pb">
          <img :src="micro.pic" />
        </div>
        <div class="activity-cont mt" v-html="micro.content"></div>
      </div>
    </template>
    <template v-if="micro.type === 1">
      <BaseInnerPageHead :tit="micro.title" />
      <div class="audio-main">
        <div class="audio-cover flex flex-pack-center">
          <img class="cover" :src="micro.pic" />
        </div>
        <div class="progress-wrapper">
          <div class="progress" ref="progress">
            <div class="progress-line" :style="'width:'+ sliderTime +'%'">
              <div class="progress-btn" ref="progressBtn" @touchstart="onTouchStart" @touchmove.stop.prevent="onTouchMove" @touchend.stop.prevent="onTouchEnd" @touchcancel.stop.prevent="onTouchEnd">{{ audio.currentTime | realFormatSecond}}/{{ audio.maxTime | realFormatSecond}}</div>
            </div>
          </div>
        </div>
        <div class="play-wrapper flex flex-pack-center flex-align-center">
          <div class="play-btn" @click="startPlayOrPause">
            <svg-icon :icon-class="audio.playing ? 'stop' : 'play'"></svg-icon>
          </div>
        </div>
      </div>
      <div class="micro-box bb">
        <h1>{{micro.title}}</h1>
        <h5>{{views}}次播放<span class="pl">{{micro.createTimestamp | moment('YYYY-MM-DD')}}</span></h5>
      </div>
      <div class="micro-box bb">
        <div class="tit">讲师</div>
        <div class="author-box flex flex-align-center">
          <div class="author-avatar">
            <img :src="writer.pic" />
          </div>
          <div class="author-cont flex1 flex flex-v flex-pack-around">
            <h2>{{writer.name}}</h2>
            <p>{{writer.title}}</p>
          </div>
        </div>
        <div class="author-share" v-html="writer.intro"></div>
      </div>
      <div class="micro-box">
        <div class="tit">内容详情</div>
        <div class="cont pl pr" :class="showMore ? '' : 'set-height'" v-html="micro.content"></div>
        <div class="more" v-if="!showMore" @click="toShowMore"><svg-icon icon-class="double-down"></svg-icon>查看全部</div>
      </div>
      <audio ref="audio" @pause="onPause" @play="onPlay" @timeupdate="onTimeUpdate" @loadedmetadata="onLoadedMetadata" :src="micro.voiceUrl"></audio><!--http://txh-cdn.96qbhy.com/20180817175211dtC1vE3z.mp3-->
    </template>
  </div>
</template>

<script>
export default {
  name: 'MicroDetail',
  data () {
    return {
      id: '',
      micro: {},
      writer: {},
      sliderTime: 0,
      dragStatus: '',
      audio: {
        playing: false,
        currentTime: 0,
        maxTime: 0,
        minTime: 0,
        step: 1
      },
      showMore: false,
      views: 0,
      touchStartLeft: 0
    }
  },
  components: {},
  created () {
    this.id = this.$route.query.id
    this.getWkDetail()
    this.postVisited()
  },
  mounted () {
  },
  activated () {
  },
  destroyed () {
  },
  watch: {},
  computed: {},
  filters: {
    realFormatSecond (second) {
      const secondType = typeof second

      if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second)

        let hours = Math.floor(second / 3600)
        second = second - hours * 3600
        let minute = Math.floor(second / 60)
        second = second - minute * 60

        return ('0' + minute).slice(-2) + ':' + ('0' + second).slice(-2)
      } else {
        return '00:00'
      }
    }
  },
  methods: {
    getWkDetail () {
      let params = {
        id: this.id
      }
      this.$api.micro.getWkDetail(params).then((res) => {
        if (res.rcode === 300) {
          this.micro = res.data
          if (res.data.type === 1) {
            this.writer = res.data.writer
          }
        }
      })
    },
    postVisited () {
      let params = {
        targetId: this.id,
        targetType: 4
      }
      this.$api.until.post_visited(params).then(res => {
        if (res.rcode === 300) {
          this.views = res.data.views
        }
      })
    },
    onPause () {
      this.audio.playing = false
    },
    onPlay () {
      this.audio.playing = true
    },
    onTimeUpdate (res) {
      this.audio.currentTime = res.target.currentTime
      this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
    },
    onLoadedMetadata (res) {
      this.audio.maxTime = parseInt(res.target.duration)
    },
    // 播放音频
    play () {
      this.$refs.audio.play()
    },
    // 暂停音频
    pause () {
      this.$refs.audio.pause()
    },
    onTouchStart (event) {
      this.setValue(event.touches[0], true)
    },
    onTouchMove (event) {
      this.setValue(event.changedTouches[0])
    },
    onTouchEnd (event) {
      this.setValue(event.changedTouches[0])
    },
    toShowMore () {
      this.showMore = true
    },
    setValue (e, isTouchStart = false) {
      // const $el = this.$el
      const $progress = this.$refs.progress
      const $progressBtn = this.$refs.progressBtn
      const {
        maxTime,
        minTime,
        step
      } = this.audio
      if (isTouchStart) {
        this.touchStartLeft = parseInt(e.clientX - $progressBtn.getBoundingClientRect().left)
      }
      let value = (e.clientX - $progress.getBoundingClientRect().left - this.touchStartLeft) / $progress.offsetWidth * (maxTime - minTime)
      value = Math.round(value / step) * step + minTime
      value = parseFloat(value.toFixed(5))

      if (value > maxTime) {
        value = maxTime
      } else if (value < minTime) {
        value = minTime
      }
      this.$refs.audio.currentTime = value
      this.sliderTime = parseInt(value / this.audio.maxTime * 100)
    },
    startPlayOrPause () {
      return this.audio.playing ? this.pause() : this.play()
    }
  }
}
</script>

<style scoped lang="scss" src="./MicroDetail.scss"></style>
