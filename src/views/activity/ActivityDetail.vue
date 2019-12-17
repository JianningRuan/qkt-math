<template>
  <div class="white-wrapper input-padding-bottom">
    <BaseTit :tit="tit"></BaseTit>
    <div class="main activity-detail">
      <h1>{{topic.title}}</h1>
      <p class="activity-info">{{topic.authorName}}<em class="pl">{{topic.createTimestamp | moment('YYYY-MM-DD')}}</em></p>
      <div class="activity-cont mt" v-html="topic.content"></div>
      <div class="join-box mt" v-if="topic.isCanJoin">
        <a class="light-btn join-btn mb" v-if="!topic.isSelfJoin" @click="join">参与</a>
        <a class="btn joined-btn mb" v-else>已参与</a>
        <p>{{topic.joinCount}}人己参与</p>
      </div>
    </div>
    <div class="reply-list">
      <h2 class="pl pr">精彩评论（{{topic.summaryCount}}）</h2>
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        @load="getSummaryList"
      >
        <BaseReplyList :summaryList="summaryList" @like="getLike" @reply="getReply" @showMoreReply="showMoreReply"></BaseReplyList>
      </van-list>
    </div>

    <!--回复框-->
    <div class="reply-wrapper pl pr flex flex-align-center" @click="goReply">
      <div class="reply-input flex1 mr-30">我来说两句</div>
      <a class="light-btn reply-submit">提交</a>
      <!-- <svg-icon class="pic-btn" icon-class="pic-btn"></svg-icon> -->
    </div>
    <!--回复框-end-->
  </div>
</template>

<script>
import BaseReplyList from '../../components/baseReplyList/BaseReplyList'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'ActivityDetail',
  data () {
    return {
      tit: '热门话题',
      id: '',
      topic: {},
      offSet: 1,
      offSize: 10,
      total: 0,
      finished: false,
      loading: false,
      summaryList: [],
      likeSwitch: true,
      showMoreReplySwitch: true,
      finishedText: ''
    }
  },
  components: { BaseReplyList },
  created () {
    this.id = this.$route.query.id
    this.getTopic()
  },
  mounted () {
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
  computed: {
    ...mapGetters('topic', [
      'replyPage', 'replyId'
    ])
  },
  filters: {},
  methods: {
    getTopic () {
      const params = {
        id: this.id
      }
      this.$api.topic.getCompusTopicDetail(params).then((res) => {
        if (res.rcode === 300 && res.data) {
          this.topic = res.data
        }
      })
    },
    getSummaryList () {
      // 如果vuex中有记录曾经翻到的页数，则传入
      let replyNum = null
      if (this.replyPage !== null && this.replyPage !== 1) {
        replyNum = this.replyPage * this.offSize
      }
      const params = {
        id: this.id,
        offSet: this.offSet,
        offSize: replyNum || this.offSize
      }
      this.loading = true
      this.$api.topic.getSummaryList(params).then(res => {
        if (res.rcode === 300) {
          let list = res.data.list
          list.forEach((value) => {
            // value.answerList = []
            value.pageIndex = 1
          })
          this.summaryList = this.summaryList.concat(res.data.list)
          this.total = res.data.totalPages
          // 如果vuex中有记录曾经翻到的页数,则改变当前页数，清楚vuex记录
          if (this.replyPage !== null && this.replyPage !== 1) {
            this.offSet = this.replyPage
            this.SET_REPLY_PAGE(null)
            // 跳到相对应位置
            this.$nextTick(() => {
              let div = document.getElementById('topic' + this.replyId)
              if (div) {
                window.scrollTo(0, div.offsetTop)
                this.SET_REPLY_ID('')
              }
            })
          }
          this.offSet++
          if (this.offSet > this.total) {
            this.finished = true
          }
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    join () {
      const params = {
        id: this.id
      }
      this.$api.topic.joinCompusTopic(params).then((res) => {
        if (res.rcode === 300) {
          this.$toast(res.message)
          this.topic.isSelfJoin = true
          this.topic.joinCount = res.data.joinCount
        }
      })
    },
    getLike (summary, index) {
      if (!this.likeSwitch) {
        return
      }
      this.likeSwitch = false
      let params = {
        resourceId: summary.id,
        type: 1
      }
      this.$api.label.updateLike(params).then((res) => {
        if (res.rcode === 300) {
          let userIsLike = summary.isLike
          if (userIsLike === false) {
            this.summaryList[index].isLike = true
            this.summaryList[index].likeCount++
            this.$toast('点赞成功')
          } else {
            this.summaryList[index].isLike = false
            this.summaryList[index].likeCount--
          }
        }
        this.likeSwitch = true
      })
    },
    getReply (summary, index) {
      this.SET_REPLY_ID(summary.id)
      this.$router.push({
        path: '/reply',
        query: {
          id: this.id,
          type: 2,
          replyType: 2,
          resourceId: summary.id
        }
      })
    },
    showMoreReply (summary, index) {
      if (summary.pageIndex > 1 && Math.ceil(summary.quoteCount / 5) <= summary.pageIndex) {
        this.$toast('没有更多回复')
        return
      }
      if (!this.showMoreReplySwitch) {
        return
      }
      this.showMoreReplySwitch = false
      let replyParams = {
        offSet: summary.pageIndex,
        offSize: 5,
        id: summary.id
      }
      this.$api.topic.getReplyList(replyParams).then((res) => {
        if (res.rcode === 300 && res.data !== null) {
          let reply = res.data
          if (summary.pageIndex === 1) {
            this.summaryList[index].answerList = reply.list
          } else {
            this.summaryList[index].answerList = summary.answerList.concat(reply.list)
          }
          this.summaryList[index].pageIndex++
        }
        this.showMoreReplySwitch = true
      }).catch(() => {
        this.showMoreReplySwitch = true
      })
    },
    goReply () {
      this.$router.push({
        path: '/reply',
        query: {
          id: this.id,
          type: 2,
          replyType: 1
        }
      })
    },
    ...mapMutations('topic', [
      'SET_REPLY_PAGE', 'SET_REPLY_ID'
    ])
  },
  beforeRouteLeave (to, from, next) {
    // 离开的时候，判断是前进还是后退，前进的话，记录当前页数，后退的话，销毁页数
    if (to.path === '/reply') {
      // 记录页数
      this.SET_REPLY_PAGE(this.offSet)
    } else {
      // 清除页数
      this.SET_REPLY_PAGE(null)
    }
    next()
  }
}
</script>
<style scoped lang="scss" src="./ActivityDetail.scss"></style>
