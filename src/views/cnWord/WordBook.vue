<template>
  <div>
    <BaseInnerPageHead :tit="tit" />
    <div class="main">
      <div class="tab-wrapper">
        <div class="tab flex">
          <div class="tab-item flex1 flex flex-pack-center flex-align-center" :class="{'current' : cnWordTab === 0}" @click="setTab(0)"><em></em>我的单词书</div>
          <div class="tab-item flex1 flex flex-pack-center flex-align-center" :class="{'current' : cnWordTab === 1}" @click="setTab(1)"><em></em>推荐单词书</div>
        </div>
      </div>
      <div class="book-list overflow" v-if="cnWordTab === 0">
        <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="getMyBook">
          <div class="home-box book-box flex flex-pack-justify mb" v-for="myBook in myBookList" :key="myBook.id" @click="goDetail(myBook.id)">
            <div class="book-avatar">
              <img :src="myBook.pic" />
              <div class="label" :class="{'ing-label': myBook.current, 'finish-label': myBook.status === 1 || myBook.status === 2 || myBook.status === 3}"></div>
            </div>
            <div class="book-info flex1 flex flex-v flex-pack-justify">
              <div>
                <div class="flex flex-pack-justify">
                  <h2>{{myBook.name}}</h2>
                  <a class="change" v-if="!myBook.current" @click.stop.prevent="changeBook(myBook)"><svg-icon icon-class="switch"></svg-icon></a>
                </div>
                <p>共<em>{{myBook.wordsNum}}</em>个单词</p>
              </div>
              <div class="study-msg">
                <p v-if="myBook.status === 2">第{{myBook.reviewNum}}轮总复习{{myBook.reviewType === 1 ? '中': '完'}}</p>
                <p v-else-if="myBook.status === 3">已完成所有复习</p>
                <p v-else>已掌握{{myBook.finishNum}}个</p>
                <div class="study-progress">
                  <div class="progress" :style="{width: parseInt(myBook.finishNum / myBook.wordsNum * 100) + '%'}"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="home-box pt mb" v-if="myBookList.length === 0 && !firstLoad">
            <BaseNone class="pt">
              <p slot="tips">暂无单词书</p>
            </BaseNone>
          </div>
        </van-list>
      </div>
      <div class="book-list overflow" v-if="cnWordTab === 1">
        <!--推荐-->
        <van-list v-model="reLoading" :finished="reFinished" :finished-text="reFinishedText" @load="getRecommendBook">
          <div class="home-box book-cont flex flex-pack-justify mb" v-for="book in recommendBook" :key="book.id" @click="goDetail(book.id)">
            <div class="task-pic">
              <img :src="book.pic" />
            </div>
            <div class="task-info flex1 flex flex-v flex-pack-justify">
              <div class="task-name">
                <h2>{{book.name}}</h2>
                <p>共<span>{{book.wordsNum}}</span>个单词</p>
              </div>
              <a class="label-btn flex-self-end" @click.stop.prevent="addBook(book)">开始背书</a>
            </div>
          </div>
          <div class="home-box pt mb" v-if="recommendBook.length === 0 && !reFirstLoad">
            <BaseNone class="pt">
              <p slot="tips">暂无推荐单词书</p>
            </BaseNone>
          </div>
        </van-list>
        <!--推荐-end-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'CnWordBook',
  data () {
    return {
      tit: '教材切换',
      loading: false,
      finished: false,
      firstLoad: true,
      params: {
        offSet: 1,
        offSize: 5,
        total: 0
      },
      myBookList: [],
      finishedText: '',
      reLoading: false,
      reFinished: false,
      reFirstLoad: true,
      reParams: {
        offSet: 1,
        offSize: 5,
        total: 0
      },
      recommendBook: [],
      reFinishedText: ''
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
    },
    'reParams.total' (newVal) {
      if (newVal > 0) {
        this.reFinishedText = '没有更多了'
      } else {
        this.reFinishedText = ''
      }
    }
  },
  computed: {
    ...mapGetters('word', [
      'cnWordTab'
    ])
  },
  filters: {},
  methods: {
    setTab (tab) {
      if (tab === this.cnWordTab) {
        return
      }
      if (tab === 0) {
        this.finished = false
        this.reFinished = true
      } else {
        this.finished = true
        this.reFinished = false
      }
      this.SET_CN_WORD_TAB(tab)
      this.$nextTick(() => {
        window.scrollTo(2, 1)
      })
    },
    getMyBook () {
      this.loading = true
      this.$api.cnWord.getMyTextbook(this.params).then((res) => {
        if (res.rcode === 300) {
          this.myBookList = this.myBookList.concat(res.data.bookList)
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
    getRecommendBook () {
      this.reLoading = true
      this.$api.cnWord.recommendTextbook(this.reParams).then((res) => {
        if (res.rcode === 300) {
          this.recommendBook = this.recommendBook.concat(res.data.bookList)
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
    changeBook (val) {
      const params = {
        id: val.id,
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
    },
    addBook (val) {
      const params = {
        id: val.id
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
    goDetail (id) {
      this.$router.push({
        path: '/cnWordBookDetail',
        query: {
          id
        }
      })
    },
    ...mapMutations('word', [
      'SET_CN_WORD_TAB'
    ])
  }
}
</script>

<style scoped lang="scss" src="./WordBook.scss"></style>
