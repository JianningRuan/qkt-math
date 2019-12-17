<template>
  <div>
    <div class="practice-tab">
      <div class="practice-scroll">
        <a class="practice-tab-item ml" v-for="tag in tagList" :key="tag.id" :class="{'current' : findTab === tag.id}" @click="clickTab(tag.id)">{{tag.name}}</a>
      </div>
    </div>
    <div class="find-index-banner mb">
      <van-swipe>
        <van-swipe-item v-for="(banner, index) in bannerList" :key="index">
          <a :href="banner.picUrl">
            <img :src="banner.pic" />
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="main">
      <div class="find-box mb" v-if="Object.keys(myTopic).length > 0">
        <div class="find-box-tit">正在参与的活动</div>
        <div class="home-box activity-box flex mb" @click="goDetail()">
          <div class="activity-pic">
            <img :src="myTopic.pic" />
          </div>
          <div class="flex1 flex flex-v flex-pack-justify">
            <div class="activity-info">
              <h2>{{myTopic.title}}</h2>
              <p>{{myTopic.authorName}}<em class="ml">{{myTopic.createTime | moment('YYYY-MM-DD')}}</em></p>
            </div>
            <div class="activity-msg">
              <svg-icon class="activity-icon" icon-class="eye"></svg-icon>{{myTopic.joinCount}}人参与
              <span class="ml"><svg-icon class="activity-icon" icon-class="msg"></svg-icon>{{myTopic.summaryCount}}条留言</span>
            </div>
          </div>
        </div>
      </div>
      <div class="find-box mb">
        <div class="find-box-tit">热门话题</div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="getTopicList"
        >
          <div class="home-box activity-box flex mb" v-for="topic in topicList" :key="topic.id" @click="goDetail(topic)">
            <div class="activity-pic">
              <img :src="topic.pic" />
            </div>
            <div class="flex1 flex flex-v flex-pack-justify">
              <div class="activity-info">
                <h2>{{topic.title}}</h2>
                <p>{{topic.authorName}}<em class="ml">{{topic.createTime | moment('YYYY-MM-DD')}}</em></p>
              </div>
              <div class="activity-msg">
                <span v-if="topic.join" class="mr"><svg-icon class="activity-icon" icon-class="eye"></svg-icon>{{topic.joinCount}}人参与</span>
                <span><svg-icon class="activity-icon" icon-class="msg"></svg-icon>{{topic.summaryCount}}条留言</span>
              </div>
            </div>
          </div>
          <div class="home-box pt" v-if="topicList.length === 0 && !firstLoad">
            <BaseNone class="pt">
              <p slot="tips">暂无话题</p>
            </BaseNone>
          </div>
        </van-list>
        <!-- <div class="home-box activity-box flex mb" @click="goDetail">
          <div class="activity-pic">
            <img src="@/assets/images/activity/activity-pic.jpg" />
          </div>
          <div class="flex1 flex flex-v flex-pack-justify">
            <div class="activity-info">
              <h2>说一说最让你头痛的科目是哪一门？</h2>
              <p>话题菌<em class="ml">2019-07-31</em></p>
            </div>
            <div class="activity-msg">
              <svg-icon class="activity-icon" icon-class="eye"></svg-icon>958人参与
              <span><svg-icon class="activity-icon" icon-class="msg"></svg-icon>36条留言</span>
            </div>
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import { awaitWrap } from '../../utils/common'
export default {
  name: 'PracticeHome',
  data () {
    return {
      tagList: [{
        id: 0,
        name: '热门'
      }],
      offSet: 1,
      offSize: 10,
      total: 0,
      finished: false,
      loading: false,
      topicList: [],
      myTopic: {},
      bannerList: [],
      firstLoad: true // 是否第一次加载
    }
  },
  components: {},
  created () {
    this.SET_INDEX_TAB(2)
    this.SET_FIND_TAB(0)
    this.getLabel()
    this.getMyTopic()
    this.getBanner()
  },
  mounted () {
  },
  activated () {
  },
  destroyed () {
  },
  watch: {},
  computed: {
    ...mapGetters([
      'findTab'
    ])
  },
  filters: {},
  methods: {
    // 获取标签
    async getLabel () {
      const params = {
        type: 2
      }
      let [err, res] = await awaitWrap(this.$api.label.getTag(params))
      if (err) {}
      if (res && res.rcode === 300) {
        let tagList = [{
          id: 0,
          name: '热门'
        }]
        this.tagList = tagList.concat(res.data.tabList)
      }
    },
    clickTab (val) {
      if (this.loading) {
        return
      }
      if (this.findTab === val) {
        return
      }
      this.SET_FIND_TAB(val)
      this.offSet = 1
      this.topicList = []
      this.finished = false
      this.firstLoad = true
      this.getTopicList()
    },
    getTopicList () {
      let params = {
        tagId: this.findTab,
        offSet: this.offSet,
        offSize: this.offSize
      }
      this.loading = true
      this.$api.topic.getCompusTopicList(params).then((res) => {
        if (res.rcode === 300) {
          this.topicList = this.topicList.concat(res.data.list)
          this.total = res.data.totalPages
          this.offSet++
          if (this.offSet > this.total) {
            this.finished = true
          }
        }
        this.loading = false
        this.firstLoad = false
      }).catch(() => {
        this.loading = false
        this.firstLoad = false
      })
    },
    getMyTopic () {
      this.$api.topic.getLastJoinCompusTopic().then((res) => {
        if (res.rcode === 300 && Object.keys(res.data).length !== 0) {
          this.myTopic = res.data.model
        }
      })
    },
    // 获取banner
    getBanner () {
      let params = {
        cType: 3,
        type: 1
      }
      this.$api.home.getBanner(params).then((res) => {
        if (res.rcode === 300) {
          this.bannerList = res.data.bannerList
        }
      })
    },
    goDetail (val) {
      if (val === undefined) {
        val = this.myTopic
      }
      if (val.type === 1) {
        window.location.href = val.url
      } else {
        this.$router.push({
          path: '/activityDetail',
          query: {
            id: val.id
          }
        })
      }
    },
    ...mapMutations([
      'SET_INDEX_TAB', 'SET_FIND_TAB'
    ])
  }
}
</script>

<style scoped lang="scss" src="./FindHome.scss"></style>
<style lang="scss">
  .find-index-banner {
    .van-swipe__indicator {
      background-color: #000;
      opacity: 0.2;
      &.van-swipe__indicator--active {
        background-color: #000;
        opacity: 0.4;
      }
    }
  }
</style>
