<template>
  <div>
    <BaseInnerPageHead/>
    <div class="main">
        <div class="home-box word-box">
          <div class="tit flex flex-pack-justify flex-align-center">
            <p>点击即可复习做题的生词练习</p>
            <div class="drop-down-menu flex flex-pack-justify flex-align-center">
              <span @click.stop.prevent="openNav">{{typeList[params.type].value}}</span><svg-icon icon-class="down"></svg-icon>
              <div class="drop-down-mask" @click.stop.prevent="closeMask" v-show="showNav"></div>
              <div class="drop-down-list" v-show="showNav">
                <div class="drop-down-item" v-for="type in typeList" :key="type.id" @click.stop.prevent="chooseNav(type)">{{type.value}}</div>
              </div>
            </div>
          </div>
          <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="getWordsList">
          <div class="cont flex flex-wrap-wrap mb" v-if="wordsList.length > 0">
            <div class="word-item" v-for="word in wordsList" :key="word.id">{{word.chinese}}</div>
          </div>
          </van-list>
          <BaseNone class="pt mt pb mb" v-if="wordsList.length === 0">
            <p slot="tips">这里没有单词<br/>坚持学习复习能够加深记忆</p>
          </BaseNone>
        </div>
    </div>
    <a class="btn study-btn" @click="goPractice" v-if="wordsList.length > 0">快速复习</a>
  </div>
</template>

<script>
export default {
  name: 'CnWordList',
  data () {
    return {
      loading: false,
      finished: false,
      firstLoad: true,
      params: {
        offSet: 1,
        offSize: 10,
        total: 0,
        type: 0
      },
      typeList: [
        {
          id: 0,
          value: '默认排序'
        },
        {
          id: 1,
          value: '做错最多'
        },
        {
          id: 2,
          value: '最新添加'
        }
      ],
      wordsList: [],
      finishedText: '',
      showNav: false
    }
  },
  components: {},
  created () {
  },
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
    }
  },
  computed: {},
  filters: {},
  methods: {
    getWordsList () {
      this.loading = true
      this.$api.cnWord.getWrongWordsList(this.params).then((res) => {
        if (res.rcode === 300) {
          let wordsList = res.data.wordList
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
    goPractice () {
      this.$router.push({
        path: '/cnWordCard',
        query: {
          type: 'review'
        }
      })
    },
    closeMask () {
      this.showNav = false
    },
    chooseNav (value) {
      this.showNav = false
      this.params = {
        offSet: 1,
        offSize: 10,
        total: 0,
        type: value.id
      }
      this.wordsList = []
      this.getWordsList()
    },
    openNav () {
      this.showNav = true
    }
  }
}
</script>

<style scoped lang="scss" src="./WordList.scss"></style>
