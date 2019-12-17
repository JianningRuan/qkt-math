<template>
  <div class="blue-wrapper">
    <BaseTit></BaseTit>
    <div class="main">
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="getMessageList">
        <div class="msg-list" v-for="message in messageList" :key="message.id">
          <div class="msg-date">{{message.createTimestamp | moment}}</div>
          <div class="home-box msg-box pl pr mb" @click="goMsgDetail(message)">
            <div class="msg-tit flex flex-align-center">
          <span class="star-icon">
            <div class="new" v-if="!message.isSee"></div>
          </span>
              <span class="tit ellipsis">{{message.title}}</span>
            </div>
            <div class="msg-cont">{{message.content}}</div>
            <div class="more flex flex-align-center flex-pack-justify">
              <span>查看详情</span>
              <svg-icon class="arrow-icon" icon-class="right"></svg-icon>
            </div>
          </div>
        </div>
        <div class="home-box pt mt" v-if="messageList.length === 0">
          <BaseNone class="pt">
            <p slot="tips">暂无消息</p>
          </BaseNone>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MsgList',
  data () {
    return {
      loading: false,
      finished: false,
      offSet: 1,
      offSize: 5,
      total: 0,
      finishedText: '',
      messageList: []
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
    total (newVal) {
      if (newVal === 0) {
        this.finishedText = ''
      } else {
        this.finishedText = '没有更多了'
      }
    }
  },
  computed: {},
  filters: {},
  methods: {
    getMessageList () {
      let params = {
        offSet: this.offSet,
        offSize: this.offSize
      }
      this.loading = true
      this.$api.my.getMessageList(params).then(res => {
        if (res.rcode === 300) {
          this.messageList = this.messageList.concat(res.data.messageList)
          this.total = res.data.totalPages
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
    goMsgDetail (message) {
      this.$router.push({
        path: '/msgDetail',
        query: {
          id: message.id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss" src="./MsgList.scss"></style>
