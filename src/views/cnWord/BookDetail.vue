<template>
  <div>
    <template v-if="status === 1">
      <BaseInnerPageHead/>
      <div class="main overflow">
        <div class="home-box book-box flex flex-pack-justify mb">
          <div class="book-avatar">
            <img :src="book.pic" />
          </div>
          <div class="book-info flex1 flex flex-v flex-pack-justify">
            <div>
              <div class="flex flex-pack-justify">
                <h2>{{book.name}}</h2>
              </div>
              <p>共<em>{{book.wordsNum}}</em>个单词</p>
            </div>
            <!--<div class="study-msg">
              <p>已掌握{{book.finishNum}}个</p>
              <div class="study-progress">
                <div class="progress" :style="{width: parseInt(book.finishNum / book.wordsNum * 100) + '%'}"></div>
              </div>
            </div>-->
            <a v-if="book.isJoin && !book.isFinish" class="label-btn flex-self-end" @click="goStudy">开始学习</a>
          </div>
        </div>
        <!--列表-->

          <div class="home-box word-box">
            <van-list
              v-model="loading"
              :finished="finished"
              :finished-text="finishedText"
              @load="getBookWordList"
            >
              <div v-for="(word, index) in wordsList" :key="index">
                <div class="tit">{{word.seq | toCnNum}}、《{{word.title}}》</div>
                <div class="cont flex flex-wrap-wrap mb">
                  <div class="word-item" v-for="wordItem in word.wordsListResultModels" :key="wordItem.id" :class="wordItem.isFinish ? 'right' : ''" @click="showDetail(wordItem.id)">{{wordItem.chinese}}</div>
                </div>
              </div>
              <BaseNone class="pt" v-if="wordsList.length === 0 && !firstLoad">
                <p slot="tips">暂无单词</p>
              </BaseNone>
            </van-list>
          </div>
        <!--列表-end-->
      </div>

      <div class="join-wrapper flex flex-pack-justify flex-align-center" v-if="!book.isJoin">
        <div class="tips"> 可学习生词：<i>{{book.wordsNum}}</i>个</div>
        <a class="start-btn" @click="addBook"><em>加入学习计划</em><span class="right absolute"><svg-icon icon-class="right"></svg-icon></span></a>
      </div>
    </template>

    <div class="wrapper main flex fle-v" v-else>
      <div class="home-box card-box flex1 flex flex-v mt mb">
        <div class="card-cont practice-card-cont flex1">
          <div class="word-msg">
            <div class="word-pic mb">
              <img :src="word.pic" />
            </div>
            <h2>{{word.chinese}}</h2>
            <h4 class="flex flex-align-center"><em>{{word.py}}</em><a class="audio-btn" :class="{'play': wordPlay}" @click="playWord"></a></h4>
          </div>
          <div class="eg-cont">
            <h3>释义</h3>
            <p>{{word.explain}}</p>
          </div>
          <div class="eg-cont">
            <h3>例句</h3>
            <p>{{word.sentence}}</p>
          </div>
        </div>
        <div class="bottom flex flex-align-center flex-pack-justify">
          <div></div>
          <a @click="back"><em>返回</em><svg-icon icon-class="forward"></svg-icon></a>
        </div>
      </div>
    </div>

    <audio ref="audio" :src="audioSrc" autoplay="autoplay" @ended="audioEnded" @error="audioEnded"></audio>
  </div>
</template>

<script>
export default {
  name: 'CnBookDetail',
  data () {
    return {
      status: 1,
      id: '',
      book: {},
      offSet: 1,
      offSize: 10,
      finished: false,
      loading: false,
      total: 0,
      wordsList: [],
      firstLoad: true,
      finishedText: '',
      audioSrc: '',
      wordPlay: false
    }
  },
  components: {},
  created () {
    this.id = this.$route.query.id
  },
  mounted () {
    this.getBookDetail()
  },
  activated () {
  },
  destroyed () {
  },
  watch: {
    total (newVal) {
      if (newVal > 0) {
        this.finishedText = '没有更多了'
      } else {
        this.finishedText = ''
      }
    }
  },
  computed: {},
  filters: {
    toCnNum (value) {
      const cnNum = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十']
      return cnNum[value]
    }
  },
  methods: {
    getBookDetail () {
      const params = {
        id: this.id
      }
      this.$api.cnWord.textbookDetail(params).then((res) => {
        if (res.rcode === 300) {
          this.book = res.data
        }
      })
    },
    getBookWordList () {
      const params = {
        id: this.id,
        offSet: this.offSet,
        offSize: this.offSize
      }
      this.$api.cnWord.getWordsListByTextbook(params).then((res) => {
        if (res.rcode === 300) {
          let wordsList = res.data.wordList
          this.wordsList = this.wordsList.concat(wordsList)
          this.total = res.data.totalPages
          this.offSet++
          if (this.offSet > this.total) {
            this.finished = true
          }
        } else {
          this.finished = true
        }
        this.loading = false
        this.firstLoad = false
      }).catch(() => {
        this.loading = false
        this.firstLoad = false
      })
    },
    goStudy () {
      if (this.book.current) {
        this.$router.push({
          path: '/index/practiceHome/cnWordPractice'
        })
      } else {
        const params = {
          id: this.id,
          relearn: false
        }
        this.$api.cnWord.changeTextbook(params).then((res) => {
          if (res.rcode === 300) {
            // 切换成功
            this.$toast.success('切换成功')
            this.$router.push({
              path: '/index/practiceHome/cnWordPractice'
            })
          }
        })
      }
    },
    addBook () {
      const params = {
        id: this.id
      }
      this.$api.cnWord.addTextbook(params).then((res) => {
        if (res.rcode === 300) {
          this.$toast.success('添加成功')
          this.$router.push({
            path: '/index/practiceHome/cnWordPractice'
          })
        }
      })
    },
    showDetail (id) {
      this.$api.cnWord.details({ wordId: id }).then((res) => {
        if (res.rcode === 300) {
          this.word = res.data.word
          this.status = 2
        }
      })
    },
    back () {
      this.status = 1
      this.audioEnded()
    },
    playWord () {
      this.audioSrc = this.word.audio
      this.wordPlay = true
    },
    audioEnded () {
      this.audioSrc = ''
      this.wordPlay = false
    }
  }
}
</script>

<style scoped lang="scss" src="./BookDetail.scss"></style>
