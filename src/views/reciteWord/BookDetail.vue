<template>
  <div>
    <BaseInnerPageHead :tit="tit" />
    <div class="main">
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
          <div class="study-msg" v-if="book.isJoin">
            <p>已掌握{{book.finishNum}}个</p>
            <div class="study-progress">
              <div class="progress" :style="{width: parseInt(book.finishNum / book.wordsNum * 100) + '%'}"></div>
            </div>
          </div>
          <a v-else class="label-btn flex-self-end" @click="addBook">开始背书</a>
        </div>
      </div>
      <!--列表-->
      <div class="home-box audio-box">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getBookWordList"
        >
          <BaseWordList :wordsList="wordsList" :isJoin="book.isJoin" @playAudio="playAudio" />
          <BaseNone class="pt" v-if="wordsList.length === 0 && !firstLoad">
            <p slot="tips">暂无单词</p>
          </BaseNone>
        </van-list>
      </div>
      <!--列表-end-->
    </div>
    <a class="btn study-btn" v-if="!book.current && book.isJoin && !book.isFinish" @click="goHome">学习该书本</a>
    <a class="btn study-btn" v-if="!book.current && book.isJoin && book.isFinish" @click="goHome">复习该书本</a>
    <audio ref="audio" :src="audioSrc" autoplay="autoplay" @ended="audioEnded" @error="audioEnded"></audio>
  </div>
</template>

<script>
import BaseWordList from '@/components/baseWordList/BaseWordList'
export default {
  name: 'WordBookDetail',
  data () {
    return {
      tit: '书本详情',
      id: '',
      book: {},
      offSet: 1,
      offSize: 10,
      finished: false,
      loading: false,
      total: 0,
      wordsList: [],
      firstLoad: true,
      audioSrc: ''
    }
  },
  components: { BaseWordList },
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
  watch: {},
  computed: {},
  filters: {},
  methods: {
    getBookDetail () {
      const params = {
        id: this.id
      }
      this.$api.word.bookDetail(params).then((res) => {
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
      this.$api.word.getWordsListByBook(params).then((res) => {
        if (res.rcode === 300) {
          let wordsList = res.data.wordsList
          wordsList.forEach(value => {
            value.playState = false
          })
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
    goHome () {
      const params = {
        id: this.id,
        relearn: false
      }
      this.$api.word.changeBook(params).then((res) => {
        if (res.rcode === 300) {
          // 切换成功
          this.$toast.success('切换成功')
          this.$router.push({
            path: '/index/practiceHome/wordPractice'
          })
        }
      })
    },
    addBook () {
      const params = {
        id: this.id
      }
      this.$api.word.addBook(params).then((res) => {
        if (res.rcode === 300) {
          this.$toast.success('添加成功')
          this.$router.push({
            path: '/index/practiceHome/wordPractice'
          })
        }
      })
    },
    playAudio (val, index) {
      this.wordsList.forEach((value, inx) => {
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
    audioEnded () {
      this.audioSrc = ''
      this.wordsList.forEach(value => {
        if (value.playState) {
          value.playState = false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss" src="./BookDetail.scss"></style>
