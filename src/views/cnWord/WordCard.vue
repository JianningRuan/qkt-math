<template>
  <div>
    <div class="wrapper flex flex-v" v-if="status === 1">
      <BaseInnerPageHead />
      <div class="box-wrapper flex1 mb">
        <van-swipe :loop="false" :show-indicators="false" ref="swipe"  @change="onChange">
          <van-swipe-item class="box-swipe" v-for="(card, index) in cardList" :key="card.id">
            <div class="home-box card-box">
              <div class="card-num">{{index + 1 | getNumber}}/{{cardList.length | getNumber}}</div>
              <div class="card-cont flex1">
                <div class="word-msg">
                  <div class="word-pic mb">
                    <img :src="card.pic" />
                  </div>
                  <h2>{{card.chinese}}</h2>
                  <h4 class="flex flex-align-center"><em>{{card.py}}</em><a class="audio-btn" :class="{'play': wordPlay}" @click="playWord(card, index)"></a></h4>
                </div>
                <div class="eg-cont">
                  <h3>释义</h3>
                  <p>{{card.explain}}</p>
                </div>
                <div class="eg-cont">
                  <h3>例句</h3>
                  <p>{{card.sentence}}</p>
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
            <span class="value">需复习：{{reviewList.length / 2}}</span>
          </span>
          </div>
        </div>
      </div>

      <div class="main-warp flex1 flex flex-v flex-pack-center">
        <!--题目-->
        <div class="exercise" v-for="(review, index) in reviewList" :key="index" :class="{'active': index === reviewIndex}">
          <div class="topic topic1" v-if="review.type === 1">
            <h2>{{review.chinese}}</h2>
            <a class="play-btn" :class="{'play': exercisePlay}" @click="playAudio(review.audio)"></a>
          </div>
          <div class="topic topic2 flex flex-pack-center" v-else>
            <div class="topic-item" v-for="(question, qIndex) in review.question" :key="qIndex">
              <div class="topic-tit">{{question.py}}</div>
              <div class="topic-cont" @click="blankWord(question, qIndex)" :class="{'error': question.isTrue === false}">{{question.cn}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="keyboard">
        <div class="option-wrapper flex flex-pack-justify flex-wrap-wrap"  v-if="reviewList[reviewIndex].type === 1">
          <div class="option-item flex flex-pack-center flex-align-center" v-for="(optionItem, index) in reviewList[reviewIndex].option" :key="index" :class="{'error': currentOption === optionItem, 'right': rightOption === optionItem}" @touchstart.stop.prevent="touchKeyDown(optionItem)">
            <span>{{optionItem}}</span>
          </div>
        </div>

        <div class="word-wrapper flex flex-pack-justify flex-wrap-wrap" v-else>
          <div class="word-item mb" v-for="(optionItem, index) in reviewList[reviewIndex].optionArr" :key="index" :class="{'active': optionItem.isActive, 'right': optionItem.isTrue === true}" @touchstart.stop.prevent="touchWordDown(optionItem, index)">{{optionItem.cn}}</div>
        </div>
      </div>
    </div>

    <div v-if="status === 4">
      <BaseInnerPageHead :tit="tit" :backBtnType="'home'" :isBack="false" @goBack="goHome" />
      <div class="main" style="overflow: hidden;">
        <div class="home-box result-box pb">
          <div class="light">
            <div class="avatar"></div>
          </div>
          <p class="main">你已完成本次识生词的学习任务，请继续努力！</p>
          <div class="flash-money flex flex-align-center flex-pack-center">
            <!--<div class="money"></div>-->
            <!--<em>学力值:+5</em>-->
          </div>
          <div class="list-tit flex flex-align-center">
            <div class="word flex1">今日生词</div>
            <div class="error-num">错误次数</div>
          </div>
          <div class="word-list">
            <div class="word-item flex flex-align-center" v-for="(error, index) in errorList" :key="index">
              <div class="word flex1 flex flex-align-center">
                <div class="word-box" v-for="(word, wIndex) in error.wordList" :key="wIndex">
                  <p>{{word.py}}</p>
                  <h2>{{word.cn}}</h2>
                </div>
              </div>
              <div class="word-type" :class="error.errorNum > 0 ? 'study' : ''">{{error.errorNum}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio ref="audio" :src="audioSrc" autoplay="autoplay" @ended="audioEnded" @error="audioEnded"></audio>
    <BasePop ref="pop"></BasePop>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'CnWordCard',
  data () {
    return {
      tit: '学习统计',
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
      submitList: [],
      type: 'study',
      blankIndex: 0, // 空格序号
      optionIndexArr: []
    }
  },
  components: {},
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
  mounted () {
  },
  activated () {
  },
  destroyed () {
  },
  watch: {},
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
      this.$api.cnWord.exercise().then((res) => {
        if (res.rcode === 300) {
          if (res.data.newWords.length > 0) {
            this.cardList = res.data.newWords
          } else {
            this.status = 2
          }
          let reviewList = res.data.reviewList
          reviewList.forEach(value => {
            if (value.type === 2) {
              value.question.forEach(val => {
                val.cn = ''
                val.word = ''
                val.isTrue = ''
              })
              let optionArr = []
              value.option.forEach(val => {
                const params = {
                  cn: val,
                  isActive: false,
                  isTrue: ''
                }
                optionArr.push(params)
              })
              value.optionArr = optionArr
            }
          })
          this.reviewList = reviewList
        }
      })
    },
    async quickReview () {
      let res = await this.$api.cnWord.quickReview()
      if (res.rcode === 300) {
        let reviewList = res.data.qReviewList
        reviewList.forEach(value => {
          if (value.type === 2) {
            value.question.forEach(val => {
              val.cn = ''
              val.word = ''
              val.isTrue = ''
            })
            let optionArr = []
            value.option.forEach(val => {
              const params = {
                cn: val,
                isActive: false,
                isTrue: ''
              }
              optionArr.push(params)
            })
            value.optionArr = optionArr
          }
        })
        this.reviewList = reviewList
      }
    },
    async getFinalExercise () {
      let res = await this.$api.cnWord.finalExercise()
      if (res.rcode === 300) {
        let reviewList = res.data.reviewList
        reviewList.forEach(value => {
          if (value.type === 2) {
            value.question.forEach(val => {
              val.cn = ''
              val.word = ''
              val.isTrue = ''
            })
            let optionArr = []
            value.option.forEach(val => {
              const params = {
                cn: val,
                isActive: false,
                isTrue: '',
                blankIndex: ''
              }
              optionArr.push(params)
            })
            value.optionArr = optionArr
          }
        })
        this.reviewList = reviewList
      }
    },
    onChange (index) {
      this.audioSrc = ''
      this.wordPlay = false
      // this.examplePlay = false
      this.currentCardIndex = index
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
    goBack () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.go(-1)
    },
    playWord (val, index) {
      this.audioSrc = val.audio
      this.wordPlay = true
      // this.examplePlay = false
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
      const rightOptionArr = this.rightOption.split(' ')
      const chineseArr = review.chinese.split('')
      let wordList = []
      for (let i = 0, l = chineseArr.length; i < l; i++) {
        const params = {
          cn: chineseArr[i],
          py: rightOptionArr[i]
        }
        wordList.push(params)
      }
      const submitParams = {
        answer: val,
        type: review.type,
        wordId: review.wordId
      }
      this.submitList.push(submitParams)
      let error = this.errorList.find(item => item.wordId === review.wordId)
      const params = {
        wordId: review.wordId,
        wordList: wordList,
        errorNum: 0
      }
      if (md5(val).toUpperCase() === answer) {
        if (!error) {
          this.errorList.push(params)
        }
        // this.nextPractice()
      } else {
        if (error) {
          error.errorNum++
        } else {
          params.errorNum = 1
          this.errorList.push(params)
        }
        // 显示错误的单词详情解读
        /* this.$api.word.details({ wordId: review.wordId }).then((res) => {
          if (res.rcode === 300) {
            this.word = res.data.word
            this.status = 3
          }
        }) */
      }
      setTimeout(() => {
        this.rightOption = ''
        this.currentOption = ''
        this.nextPractice()
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
        } else if (this.type === 'review') {
          this.submitReview()
        } else {
          this.submitFinal()
        }
      }
    },
    touchWordDown (val, index) {
      if (this.reviewList[this.reviewIndex].optionArr[index].isActive === true) {
        return
      }
      this.reviewList[this.reviewIndex].optionArr[index].isActive = true
      this.reviewList[this.reviewIndex].optionArr[index].blankIndex = this.blankIndex
      this.reviewList[this.reviewIndex].question[this.blankIndex].wordIndex = index
      this.reviewList[this.reviewIndex].question[this.blankIndex].cn = val.cn
      // 序号移到下一个空格， 并判断是否已填满
      let isFull = true
      let question = this.reviewList[this.reviewIndex].question
      for (let i = 0, l = question.length; i < l; i++) {
        if (question[i].cn === '') {
          this.blankIndex = i
          isFull = false
          break
        }
      }
      if (isFull) {
        // 提交
        this.submitItem()
      }
    },
    blankWord (val, index) {
      const wordIndex = this.reviewList[this.reviewIndex].question[index].wordIndex
      this.reviewList[this.reviewIndex].optionArr[wordIndex].isActive = false
      this.reviewList[this.reviewIndex].optionArr[wordIndex].blankIndex = ''
      this.reviewList[this.reviewIndex].question[index].cn = ''
      this.reviewList[this.reviewIndex].question[index].wordIndex = ''

      let question = this.reviewList[this.reviewIndex].question
      for (let i = 0, l = question.length; i < l; i++) {
        if (question[i].cn === '') {
          this.blankIndex = i
          break
        }
      }
    },
    submitItem () {
      if (!this.canAnswer) {
        return
      }
      this.canAnswer = false
      let review = this.reviewList[this.reviewIndex]
      let isAllTrue = true
      let wordList = []
      let answer = ''
      review.question.forEach(value => {
        answer = answer + value.cn
        if (md5(value.cn).toUpperCase() === value.answer) {
          value.isTrue = true
        } else {
          isAllTrue = false
          value.isTrue = false
        }
        for (let i = 0, l = review.optionArr.length; i < l; i++) {
          if (md5(review.optionArr[i].cn).toUpperCase() === value.answer && review.optionArr[i].isTrue === '') {
            if (md5(value.cn).toUpperCase() !== value.answer) {
              review.optionArr[i].isTrue = true
            }
            wordList.push({
              cn: review.optionArr[i].cn,
              py: value.py
            })
            break
          }
        }
      })
      this.reviewList[this.reviewIndex] = review
      const submitParams = {
        answer: answer,
        type: review.type,
        wordId: review.wordId
      }
      this.submitList.push(submitParams)
      const params = {
        wordId: review.wordId,
        wordList: wordList,
        errorNum: 0
      }
      let error = this.errorList.find(item => item.wordId === review.wordId)
      if (isAllTrue) {
        if (!error) {
          this.errorList.push(params)
        }
      } else {
        if (error) {
          error.errorNum++
        } else {
          params.errorNum = 1
          this.errorList.push(params)
        }
      }
      setTimeout(() => {
        this.blankIndex = 0
        this.nextPractice()
      }, 1000)
    },
    submit () {
      this.$api.cnWord.submit({ submitList: this.submitList }).then((res) => {})
    },

    submitReview () {
      this.$api.cnWord.submitReview({ submitList: this.submitList }).then((res) => {})
    },
    submitFinal () {
      this.$api.cnWord.submitFinal({ submitList: this.submitList }).then((res) => {})
    },
    audioEnded () {
      this.audioSrc = ''
      this.wordPlay = false
      // this.examplePlay = false
      this.exercisePlay = false
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
