<template>
  <div>
    <BaseInnerPageHead />
    <div class="main">
      <div class="tab-wrapper">
        <div class="tab flex">
          <div class="tab-item flex1 flex flex-pack-center flex-align-center" :class="{'current' : listTab === 0}" @click="setTab(0)"><em></em>已掌握</div>
          <div class="tab-item flex1 flex flex-pack-center flex-align-center" :class="{'current' : listTab === 1}" @click="setTab(1)"><em></em>全部单词</div>
        </div>
      </div>
      <!--列表-->
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="getWordsList" class="overflow">
        <div class="home-box audio-box" v-show="listTab === 0">
          <BaseNone class="pt mt pb mb" v-if="wordsList.length === 0 && !firstLoad">
            <p slot="tips">这里没有单词<br/>坚持学习复习能够加深记忆</p>
          </BaseNone>
          <BaseWordList :wordsList="wordsList" :isJoin="true" :clickShow="true" @playAudio="playAudio" />
        </div>
      </van-list>
      <!--列表-end-->
      <!--列表-->
      <van-list v-model="reLoading" :finished="reFinished" :finished-text="reFinishedText" @load="getAllWordsList">
        <div class="home-box audio-box" v-show="listTab === 1">
            <BaseNone class="pt mt pb mb" v-if="allWordsList.length === 0 && !reFirstLoad">
              <p slot="tips">这里没有单词<br/>坚持学习复习能够加深记忆</p>
            </BaseNone>
            <BaseWordList :wordsList="allWordsList" :isJoin="true" :clickShow="true" @playAudio="playAudio" />
        </div>
      </van-list>
      <!--列表-end-->
    </div>
    <a class="btn study-btn" v-if="listTab === 0 && wordsList.length > 0" @click="goPractice">快速复习</a>
    <audio ref="audio" :src="audioSrc" autoplay="autoplay" @ended="audioEnded"></audio>
  </div>
</template>

<script>
import BaseWordList from '@/components/baseWordList/BaseWordList'
export default {
  name: 'WordList',
  data () {
    return {
      isBack: false,
      listTab: 0,
      loading: false,
      finished: false,
      firstLoad: true,
      params: {
        offSet: 1,
        offSize: 10,
        total: 0,
        type: 1
      },
      wordsList: [],
      finishedText: '',
      reLoading: false,
      reFinished: true,
      reFirstLoad: true,
      reParams: {
        offSet: 1,
        offSize: 10,
        total: 0,
        type: 2
      },
      allWordsList: [],
      reFinishedText: '',
      audioSrc: ''
    }
  },
  components: { BaseWordList },
  created () {},
  mounted () {
  },
  activated () {
  },
  destroyed () {
  },
  watch: {
    'params.total' (newVal) {
      if (newVal > 0) {
        this.finishedText = '没有更多了'
      } else {
        this.finishedText = ''
      }
    },
    'reParams.total' (newVal) {
      if (newVal > 0) {
        this.reFinishedText = '没有更多了'
      } else {
        this.reFinishedText = ''
      }
    }
  },
  computed: {},
  filters: {},
  methods: {
    setTab (val) {
      if (val === this.listTab) {
        return
      }
      if (val === 0) {
        this.finished = false
        this.reFinished = true
        this.reFinishedText = ''
      } else {
        this.finished = true
        this.reFinished = false
        this.finishedText = ''
      }
      this.audioSrc = ''
      this.listTab = val
      setTimeout(() => {
        window.scrollTo(0, 1)
      }, 500)
    },
    getWordsList () {
      this.loading = true
      this.$api.word.getWordsList(this.params).then((res) => {
        if (res.rcode === 300) {
          let wordsList = res.data.wordsList
          wordsList.forEach(value => {
            value.playState = false
          })
          this.wordsList = this.wordsList.concat(wordsList)
          this.params.total = res.data.totalPages
          this.params.offSet++
          if (this.params.offSet > this.params.total) {
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
    getAllWordsList () {
      this.reLoading = true
      this.$api.word.getWordsList(this.reParams).then((res) => {
        if (res.rcode === 300) {
          let wordsList = res.data.wordsList
          wordsList.forEach(value => {
            value.playState = false
          })
          this.allWordsList = this.allWordsList.concat(wordsList)
          this.reParams.total = res.data.totalPages
          this.reParams.offSet++
          if (this.reParams.offSet > this.reParams.total) {
            this.reFinished = true
          }
        } else {
          this.reFinished = true
        }
        this.reLoading = false
        this.reFirstLoad = false
      }).catch(() => {
        this.reLoading = false
        this.reFirstLoad = false
      })
    },
    playAudio (val, index) {
      if (val.audiourl === null) {
        return
      }
      let wordsList = []
      if (this.listTab === 0) {
        wordsList = this.wordsList
      } else {
        wordsList = this.allWordsList
      }
      wordsList.forEach((value, inx) => {
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
      if (this.listTab === 0) {
        this.wordsList = wordsList
      } else {
        this.allWordsList = wordsList
      }
    },
    audioEnded () {
      this.audioSrc = ''
      this.wordsList.forEach(value => {
        if (value.playState) {
          value.playState = false
        }
      })
      this.allWordsList.forEach(value => {
        if (value.playState) {
          value.playState = false
        }
      })
    },
    goPractice () {
      this.$router.push({
        path: '/wordCard',
        query: {
          type: 'review'
        }
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.path === '/wordCard') {
      this.$router.go(-1)
    } else {
      next()
    }
  }
}
</script>

<style scoped lang="scss" src="./WordList.scss"></style>
