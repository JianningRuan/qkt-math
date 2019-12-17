<template>
  <div>
    <div class="wrapper flex flex-v" v-if="status === 1">
      <BaseInnerPageHead :tit="tit" />
      <div class="box-wrapper flex1 mb">
        <van-swipe :loop="false" :show-indicators="false" ref="swipe"  @change="onChange">
          <van-swipe-item class="box-swipe" v-for="(card, index) in cardList" :key="card.id">
            <div class="home-box card-box">
              <div class="card-num">{{index + 1 | getNumber}}/{{cardList.length | getNumber}}</div>
              <div class="card-cont flex1">
                <div class="word-msg">
                  <div class="word-pic">
                    <img :src="card.picurl" />
                  </div>
                  <h2>{{card.word}}</h2>
                  <h4 class="flex flex-align-center"><em>{{card.wordSpellUk}}</em><a v-if="card.audiourlUk !== null" class="audio-btn" :class="{'play': wordPlay}" @click="playWord(card, index)"></a></h4>
                  <p>{{card.wordCn}}</p>
                </div>
                <div class="eg-cont">
                  <h3>例句</h3>
                  <p class="flex flex-align-center"><span>{{card.example}}</span><a v-if="card.exampleAudiourl !== null" class="audio-btn" :class="{'play': examplePlay}" @click="playExample(card, index)"></a></p>
                  <p>{{card.exampleCn}}</p>
                </div>
                <div class="eg-cont" v-if="card.videoPath !== null">
                  <h3>视频讲解</h3>
                  <div class="video-list flex flex-pack-justify flex-wrap-wrap">
                    <div class="video-item" @click="watchVideo(card.videoPath)">
                      <img :src="card.videoPic" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottom flex flex-align-center flex-pack-justify">
                <a @click="prev"><svg-icon icon-class="back" v-if="index !== 0"></svg-icon></a>
                <a @click="next"><em>{{index + 1 === cardList.length ? '开始答题' : '下一个'}}</em><svg-icon icon-class="forward"></svg-icon></a>
              </div>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="challenge flex flex-v" ref="challenge" v-if="status === 2">
      <div class="top flex flex-align-center">
        <div  class="top-item">
          <div class="top-item-warp flex flex-align-center">
            <a class="back-btn" @click="goBack"></a>
          </div>
        </div>
        <div class="top-item flex1">
          <div class="top-item-warp flex flex-align-center">
          <span class="cont">
            <span class="value">需新学：{{cardList.length || 0}}</span>
          </span>
          </div>
        </div>
        <div class="top-item flex1">
          <div class="top-item-warp flex flex-align-center">
          <span class="cont">
            <span class="value">需复习：{{reviewList.length / 3}}</span>
          </span>
          </div>
        </div>
      </div>

      <div class="main-warp flex1 flex flex-v flex-pack-center">
        <!--题目-->
        <div class="exercise" v-for="(review, index) in reviewList" :key="index" :class="{'active': index === reviewIndex}">
          <div class="topic topic1" v-if="review.type === 1">
            <h2>{{review.word}}</h2>
            <p>{{review.spell}}</p>
            <a class="play-btn" :class="{'play': exercisePlay}" @click="playAudio(review.audio)"></a>
          </div>
          <div class="topic topic2" v-else-if="review.type === 2">
            <a class="play-btn flex flex-align-center flex-pack-center" :class="{'play': exercisePlay}" @click="playAudio(review.audio)">
              <span></span>
            </a>
          </div>
          <div class="topic topic3" v-else>
            <h3>{{review.cn}}</h3>
          </div>
        </div>
      </div>

      <div class="keyboard">
        <table cellspacing="10" v-if="reviewList.length > 0">
          <tr v-for="(optionItem, index) in reviewList[reviewIndex].option" :key="index">
            <td :class="{'error': currentOption === optionItem, 'right': rightOption === optionItem}"><a @touchstart.stop.prevent="touchKeyDown(optionItem)">{{optionItem}}</a></td>
          </tr>
        </table>
      </div>
    </div>

    <div class="wrapper main flex fle-v" v-if="status === 3">
      <div class="home-box card-box flex1 flex flex-v mt mb">
        <div class="card-cont practice-card-cont flex1">
          <div class="word-msg">
            <div class="word-pic">
              <img :src="word.picurl" />
            </div>
            <h2>{{word.word}}</h2>
            <h4 class="flex flex-align-center"><em>{{word.wordSpellUk}}</em><a v-if="word.audiourlUk !== null" class="audio-btn" :class="{'play': wordPlay}" @click="playWord(word)"></a></h4>
            <p>{{word.wordCn}}</p>
          </div>
          <div class="eg-cont">
            <h3>例句</h3>
            <p class="flex flex-align-center"><span>{{word.example}}</span><a v-if="word.exampleAudiourl !== null" class="audio-btn" :class="{'play': examplePlay}" @click="playExample(word)"></a></p>
            <p>{{word.exampleCn}}</p>
          </div>
          <div class="eg-cont" v-if="word.videoPath !== null">
            <h3>视频讲解</h3>
            <div class="video-list flex flex-pack-justify flex-wrap-wrap">
              <div class="video-item" @click="watchVideo(word.videoPath)">
                <img :src="word.videoPic" />
              </div>
            </div>
          </div>
        </div>
        <div class="bottom flex flex-align-center flex-pack-justify">
          <div></div>
          <a @click="nextPractice"><em>继续答题</em><svg-icon icon-class="forward"></svg-icon></a>
        </div>
      </div>
    </div>

    <div v-if="status === 4">
      <BaseInnerPageHead :tit="tit" />
      <div class="main" style="overflow: hidden;">
        <div class="home-box result-box pb">
          <div class="light">
            <div class="avatar"></div>
          </div>
          <p class="main">你已完成本次背单词学习任务，请及时复习！加油！</p>
          <div class="flash-money flex flex-align-center flex-pack-center">
            <!--<div class="money"></div>-->
            <!--<em>学力值:+5</em>-->
          </div>
          <div class="list-tit flex flex-align-center">
            <div class="audio">录音</div>
            <div class="word flex1">今日单词</div>
            <div class="error-num">错误次数</div>
          </div>
          <BaseWordList :wordsList="errorList" :showErrorNum="true" @playAudio="playListAudio"></BaseWordList>
        </div>
      </div>
      <a class="btn back-home-btn" @click="goIndex">返回首页</a>
    </div>

    <audio ref="audio" :src="audioSrc" autoplay="autoplay" @ended="audioEnded" @error="audioEnded"></audio>
    <BasePop ref="pop"></BasePop>
    <BaseVideoPop :videoUrl="videoUrl" @closeVideoPop="closeVideoPop" />
  </div>
</template>

<script>
import md5 from 'js-md5'
import BaseWordList from '@/components/baseWordList/BaseWordList'
import BaseVideoPop from '@/components/baseVideoPop/BaseVideoPop'
export default {
  name: 'WordCard',
  data () {
    return {
      tit: '单词学习',
      cardList: [],
      reviewList: [],
      currentCardIndex: 0,
      wordPlay: false,
      examplePlay: false,
      audioSrc: '',
      status: 1, // 1:看卡片， 2：做题， 3; 单词解释 4：结果
      reviewIndex: 0,
      exercisePlay: false,
      // errorOptionIndex: '',
      rightOption: '',
      currentOption: '',
      errorList: [],
      canAnswer: true,
      word: {},
      submitList: [],
      type: 'study',
      videoUrl: ''
    }
  },
  components: { BaseVideoPop, BaseWordList },
  async created () {
    if (this.$route.query.type === 'review') {
      await this.quickReview()
      this.type = 'review'
      this.status = 2
    } else if (this.$route.query.type === 'final') {
      await this.getFinalExercise()
      this.type = 'final'
      this.status = 2
    } else {
      this.getExercise()
    }
  },
  mounted () {},
  activated () {
  },
  destroyed () {
  },
  watch: {
    status (newVal) {
      if (newVal === 1) {
        this.tit = '单词学习'
      } else if (newVal === 4) {
        this.tit = '答题统计'
      }
    }
  },
  computed: {},
  filters: {
    getNumber (value) {
      if (value > 9) {
        return value
      } else {
        return '0' + value
      }
    }
  },
  methods: {
    getExercise () {
      this.$api.word.exercise().then((res) => {
        if (res.rcode === 300) {
          if (res.data.newWords.length > 0) {
            this.cardList = res.data.newWords
          } else {
            this.status = 2
          }
          this.reviewList = res.data.reviewList
        }
      })
    },
    async quickReview () {
      let res = await this.$api.word.quickReview()
      if (res.rcode === 300) {
        this.reviewList = res.data.qReviewList
      }
    },
    async getFinalExercise () {
      let res = await this.$api.word.finalExercise()
      if (res.rcode === 300) {
        this.reviewList = res.data.reviewList
      }
    },
    prev () {
      if (this.currentCardIndex === 0) {
        return
      }
      this.currentCardIndex--
      this.$refs.swipe.swipeTo(this.currentCardIndex)
    },
    next () {
      if (this.currentCardIndex + 1 < this.cardList.length) {
        this.currentCardIndex++
        this.$refs.swipe.swipeTo(this.currentCardIndex)
      } else {
        this.status = 2
      }
    },
    onChange (index) {
      this.audioSrc = ''
      this.wordPlay = false
      this.examplePlay = false
      this.currentCardIndex = index
    },
    playWord (val, index) {
      this.audioSrc = val.audiourlUk
      this.wordPlay = true
      this.examplePlay = false
    },
    playExample (val, index) {
      this.audioSrc = val.exampleAudiourl
      this.wordPlay = false
      this.examplePlay = true
    },
    audioEnded () {
      this.audioSrc = ''
      this.wordPlay = false
      this.examplePlay = false
      this.exercisePlay = false
      if (this.status === 4) {
        this.errorList.forEach(value => {
          if (value.playState) {
            value.playState = false
          }
        })
      }
    },
    playAudio (url) {
      if (url === null) {
        return
      }
      this.audioSrc = url
      this.exercisePlay = true
    },
    touchKeyDown (val) {
      if (!this.canAnswer) {
        return
      }
      this.canAnswer = false
      const review = this.reviewList[this.reviewIndex]
      const answer = review.answer
      const option = review.option
      for (let i = 0, l = option.length; i < l; i++) {
        if (md5(option[i]).toUpperCase() === answer) {
          this.rightOption = option[i]
          this.currentOption = val
          break
        }
      }
      const submitParams = {
        answer: val,
        type: review.type,
        wordId: review.wordId
      }
      this.submitList.push(submitParams)
      setTimeout(() => {
        this.rightOption = ''
        this.currentOption = ''
        let error = this.errorList.find(item => item.word === review.word)
        const params = {
          wordId: review.wordId,
          word: review.word,
          wordcn: review.cn,
          audiourl: review.audio,
          errorNum: 0,
          playState: false
        }
        if (md5(val).toUpperCase() === answer) {
          if (!error) {
            this.errorList.push(params)
          }
          this.nextPractice()
        } else {
          if (error) {
            error.errorNum++
          } else {
            params.errorNum = 1
            this.errorList.push(params)
          }
          // 显示错误的单词详情解读
          this.$api.word.details({ wordId: review.wordId }).then((res) => {
            if (res.rcode === 300) {
              this.word = res.data.word
              this.status = 3
            }
          })
        }
      }, 1000)
    },
    nextPractice () {
      if (this.reviewIndex + 1 < this.reviewList.length) {
        this.reviewIndex++
        this.canAnswer = true
        this.status = 2
        this.audioEnded()
      } else {
        this.status = 4
        if (this.type === 'study') {
          this.submit()
        } else {
          this.submitFinal()
        }
      }
    },
    submit () {
      this.$api.word.submit({ submitList: this.submitList }).then((res) => {})
    },
    submitFinal () {
      this.$api.word.submitFinal().then((res) => {})
    },
    playListAudio (val, index) {
      this.errorList.forEach((value, inx) => {
        if (inx === index) {
          if (!value.playState) {
            value.playState = true
            this.audioSrc = value.audiourl
            // this.audioSrc = `http://ky.dgextrain.52ku.com//audio/example_mp3/31${Math.floor(Math.random() * 9 + 1)}.mp3`
          } else {
            value.playState = false
            this.audioSrc = ''
          }
        } else {
          value.playState = false
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    goIndex () {
      this.$router.push({
        path: '/index/practiceHome/wordPractice'
      })
    },
    watchVideo (url) {
      this.videoUrl = url
    },
    closeVideoPop () {
      this.videoUrl = ''
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.status === 1 || this.status === 4) {
      next()
    } else {
      this.$refs['pop'].openModal({
        type: 'confirm',
        tit: '温馨提示',
        content: '中途退出任务将会不记录成绩哦，再坚持一下吧~',
        submitBtnText: '继续答题',
        cancelBtnText: '我要离去',
        showCloseBtn: false
      }).then(() => {
        next(false)
      }).catch(() => {
        next()
      })
    }
  }
}
</script>

<style scoped lang="scss" src="./WordCard.scss"></style>
