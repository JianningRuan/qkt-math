<template>
  <div class="main">
    <!-- 新用户 推荐 -->
    <div class="section-item" v-if="learningList.length === 0">
      <div class="section-top l-tit">您可以选择以下任意一项进行练习，我们会根据您的练习情况，推荐相关的学习资源给您。</div>
      <div class="section-cont">
        <div class="task-list flex flex-wrap-w">
          <div class="task-item" @click="goMath()">
            <img src="@/assets/images/home/task-1.png" />
          </div>
          <div class="task-item" @click="goWordCard">
            <img src="@/assets/images/home/task-2.png" />
          </div>
          <div class="task-item" @click="goCnWordCard">
            <img src="@/assets/images/home/task-3.png" />
          </div>
        </div>
      </div>
    </div>
    <!-- 老用户 学过的内容 -->
    <div class="section-item pt" v-if="learningList.length > 0">
      <div class="section-top flex flex-align-center"><span class="s-title">学习过的内容</span><em>你正在做的练习和学习中的课程</em></div>
      <div class="section-cont">
        <div class="task-list flex flex-wrap-w">
          <div class="task-item" v-for="(task, index) in learningList" :key="index" @click="goLearning(task)">
            <img v-if="task.type === 1" :src="task.pic" />
            <img v-else-if="task.type === 2" src="@/assets/images/home/task-1.png" />
            <img v-else-if="task.type === 3" src="@/assets/images/home/task-2.png" />
            <img v-else src="@/assets/images/home/task-3.png" />
          </div>
        </div>
      </div>
    </div>
    <!-- 针对性学习 推荐 -->
    <div class="section-item" v-if="recommendCourse.length > 0">
      <div class="section-top flex flex-align-center"><div class="s-title">针对性学习</div><em class="flex1">根据你的测评情况和学习进度推荐以下课程</em></div>
      <div class="section-cont">
        <div class="task-list flex flex-wrap-w">
          <div class="task-item" v-for="(recommend, index) in recommendCourse" :key="index" @click="goRecommend(recommend)">
            <img :src="recommend.pic" />
          </div>
        </div>
        <a class="class-more" @click="goClassList">查看更多<svg-icon icon-class="right"></svg-icon></a>
      </div>
    </div>
    <!-- banner -->
    <div class="find-banner mb">
      <van-swipe>
        <van-swipe-item v-for="(banner, index) in bannerList" :key="index">
          <a :href="banner.picUrl">
            <img :src="banner.pic" />
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 正在学习 -->
    <!--<div class="section-item" v-if="Object.keys(courseInfo).length !== 0 || Object.keys(taskInfo).length !== 0">
      <div class="section-top flex flex-align-center">
        <span class="section-title flex1">正在学习</span>
      </div>
      <div class="section-cont">
        <div class="study-list">
          <div class="study-item flex flex-align-center" v-if="Object.keys(courseInfo).length !== 0">
            <span class="tag">课程</span>
            <span class="title flex1">{{courseInfo.coursename}}</span>
            <a class="btn" @click="goVideo">继续</a>
          </div>
          <div class="study-item flex flex-align-center" v-if="Object.keys(taskInfo).length !== 0">
            <span class="tag">数学</span>
            <span class="title flex1">{{taskInfo.title}}</span>
            <a class="btn" @click="goMath">前往</a>
          </div>
        </div>
      </div>
    </div>-->

    <!-- 推荐课程 -->
    <!--<div class="section-item">
      <div class="section-top flex flex-align-center">
        <span class="section-title flex1">推荐课程</span>
        <span class="more" @click="goClassList">更多<svg-icon icon-class="right" class="right-icon"></svg-icon></span>
      </div>
      <div class="section-cont">
        <div class="study-list">
          <div class="find-video-box-list" v-if="recommendCourse.length > 0">
            <div v-for="(course, index) in recommendCourse" :key="course.id" class="home-box find-video-box mb flex flex-v" :class="setBg(index)" @click="goCourse(course)">
              <h2><span class="recommend"></span>{{course.name}}</h2>
              <p class="flex1">{{course.tagValue}}</p>
              <div class="tips"><svg-icon icon-class="start" class="start-icon"></svg-icon>{{course.intro}}</div>
            </div>
          </div>
          <div class="home-box" v-else>
            <BaseNone class="pt pb">
              <div slot="tips">暂无内容，敬请期待</div>
            </BaseNone>
          </div>
        </div>
      </div>
    </div>-->

    <!-- 学习资源 -->
    <div class="section-item">
      <div class="section-top flex flex-align-center">
        <span class="section-title flex1">学习资源</span>
        <div class="tab-btn">
          <a :class="[subject === 1 ? 'active' : '']" @click="getTab(1)">语文</a>
          <a :class="[subject === 2 ? 'active' : '']" @click="getTab(2)">数学</a>
          <a :class="[subject === 3 ? 'active' : '']" @click="getTab(3)">英语</a>
        </div>
      </div>
      <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="getLearningResources">
        <div class="section-cont">
          <div class="resources-box-list"><!-- v-lazy-container="{ selector: 'img' }"-->
            <div class="resources-box-item" v-for="resources in resourcesList" :key="resources.id" @click="goResource(resources)">
              <div class="cover">
                <!--<img :data-src="resources.pic" :key="resources.id"  :data-error="'./images/micro-avatar.png'" />-->
                <img :src="resources.pic || './images/micro-avatar.png'" />
              </div>
              <div class="cont">
                <div class="title">{{resources.title}}</div>
                <div class="msg">
                  <span class="views"><svg-icon icon-class="eye" class="view-icon"></svg-icon>{{resources.count}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="home-box pt mb" v-if="resourcesList.length === 0 && !firstLoad">
            <BaseNone class="pt">
              <p slot="tips">暂无学习资源</p>
            </BaseNone>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'FindHome',
  data () {
    return {
      recommendCourse: [],
      // courseInfo: {},
      // taskInfo: {},
      learningList: [],
      offSet: 1,
      offSize: 4,
      subject: 1,
      finished: false,
      loading: false,
      total: 0,
      resourcesList: [],
      bannerList: [],
      finishedText: '',
      firstLoad: true
    }
  },
  components: {},
  created () {
    this.SET_INDEX_TAB(0)
    // this.dataAndTest()
    this.getMyLearning()
    this.getRecommendCourse()
    this.getBanner()
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
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  filters: {},
  methods: {
    setBg (num) {
      let value = (num % 3) + 1
      return 'bg' + value
    },
    getTab (num) {
      if (this.loading) {
        return
      }
      if (this.subject === num) {
        return
      }
      this.subject = num
      this.offSet = 1
      this.firstLoad = true
      this.resourcesList = []
      this.finished = false
      this.getLearningResources()
    },
    // 判断是否是否第一次注册及是否进入测试
    async dataAndTest () {
      let res = await this.$api.home.getStatus()
      if (res.rcode === 300) {
        let firstLogin = res.data.firstLogin
        if (firstLogin) {
          this.$router.push({
            path: '/personalData'
          })
        }
      }
    },
    // 获取推荐课程
    getRecommendCourse () {
      const params = {
        count: 3
      }
      this.$api.home.getRecommendCourse(params).then((res) => {
        if (res.rcode === 300) {
          /* let recommendCourse = res.data
          recommendCourse.forEach((value) => {
            let tagValue = value.tags
            if (value.grade !== undefined && value.grade !== null && value.grade !== '') {
              tagValue.unshift(value.grade)
            }
            value.tagValue = tagValue.join(' / ')
          })
          this.recommendCourse = res.data */
          this.recommendCourse = res.data.rstList
        }
      })
    },
    // 获取正在学习
    getMyLearning () {
      this.$api.home.getMyLearning().then((res) => {
        if (res.rcode === 300) {
          // this.courseInfo = res.data.courseInfo
          // this.taskInfo = res.data.taskInfo
          this.learningList = res.data.list
        }
      })
    },
    // 获取学习资源
    getLearningResources () {
      let params = {
        offSet: this.offSet,
        offSize: this.offSize,
        subject: this.subject
      }
      let subject = this.subject
      this.loading = true
      this.$api.home.getLearningResources(params).then((res) => {
        if (res.rcode === 300) {
          if (subject !== this.subject) {
            return
          }
          this.resourcesList = this.resourcesList.concat(res.data.resourcesList)
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
    // 获取banner
    getBanner () {
      let params = {
        cType: 2,
        type: 1
      }
      this.$api.home.getBanner(params).then((res) => {
        if (res.rcode === 300) {
          this.bannerList = res.data.bannerList
        }
      })
    },
    goMath (taskInfo) {
      if (taskInfo) {
        this.$router.push({
          path: '/taskDetail',
          query: {
            id: taskInfo.taskId,
            taskUserId: taskInfo.taskUserId
          }
        })
      } else {
        this.$router.push({
          path: '/index/practiceHome/mathPractice'
        })
      }
    },
    goVideo () {
      this.$router.push({
        path: '/courseList',
        query: {
          courseId: this.courseInfo.id
        }
      })
    },
    goCourse (val) {
      this.$router.push({
        path: '/courseList',
        query: {
          courseId: val.id
        }
      })
    },
    goClassList () {
      this.$router.push({
        path: '/courseSeries'
      })
    },
    goRecommend (recommend) {
      if (recommend.id === 0) {
        if (recommend.type === 1) {
          this.goMath()
        } else if (recommend.type === 2) {
          this.goWordCard()
        } else {
          this.goCnWordCard()
        }
      } else {
        this.goCourse(recommend)
      }
    },
    goResource (val) {
      if (val.type === 1) {
        this.$router.push({
          path: '/videoDetail',
          query: {
            videoId: val.id
          }
        })
      } else {
        // type为2时，去微课
        this.$router.push({
          path: '/microDetail',
          query: {
            id: val.id
          }
        })
      }
    },
    goWordCard () {
      this.$router.push({
        // path: '/wordCard'
        path: '/index/practiceHome/wordPractice'
      })
    },
    goCnWordCard () {
      this.$router.push({
        // path: '/cnWordCard'
        path: '/index/practiceHome/cnWordPractice'
      })
    },
    goLearning (task) {
      if (task.type === 1) {
        this.$router.push({
          path: '/courseList',
          query: {
            courseId: task.courseId,
            gradeOrder: this.userInfo.grade
          }
        })
      } else if (task.type === 2) {
        this.goMath()
      } else if (task.type === 3) {
        this.goWordCard()
      } else {
        this.goCnWordCard()
      }
    },
    ...mapMutations([
      'SET_INDEX_TAB'
    ])
  }
}
</script>

<style lang="scss" scoped src="./Home.scss"></style>
