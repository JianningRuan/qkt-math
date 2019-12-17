<template>
  <div id="course-list">
    <div class="base-tit">
      <BaseTit :tit="tit"></BaseTit>
    </div>
    <div class="screen flex flex-align-center">
      <div class="screen-item flex1" @click="isShowOrders = !isShowOrders">
        {{orders[videoType].name}}
        <svg-icon :icon-class="isShowOrders?'top':'down'"></svg-icon>
      </div>
    </div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getCourseList">
      <div class="course-list">
        <course-item :courses="courses" @clickDetail="clickDetail"></course-item>
      </div>
    </van-list>

    <!-- 选择排序 -->
    <div class="mask flex flex-v" v-if="isShowOrders" @click.stop.prevent="closeOrder">
      <div class="mask-warp flex1">
        <div class="subject-list">
          <div class="subject-item flex flex-align-center" v-for="(sort,index) in orders" :key="index"
               @click.stop.prevent="changeSort(index)">
            <div class="name">{{sort.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import courseItem from '@/components/course-item/course-item'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'list',
  components: {
    'course-item': courseItem
  },
  data () {
    return {
      courseId: '',
      gradeOrder: 0,
      loading: false,
      finished: false,
      offSet: 0,
      offSize: 10,
      courses: [],
      orders: [
        { name: '默认排序', value: 0 },
        { name: '热度排序', value: 1 }
      ],
      // orderIndex: 0,
      isShowOrders: false,
      tit: '课程列表'
    }
  },
  computed: {
    ...mapGetters('video', [
      'currentVideoId', 'videoPage', 'videoType'
    ])
  },
  methods: {
    getCourseList () {
      this.loading = true
      this.$api.course.getCourseList({
        order: this.orders[this.videoType].value,
        courseId: this.courseId,
        offSet: this.offSet,
        offSize: this.videoPage ? this.videoPage * this.offSize : this.offSize,
        gradeOrder: this.gradeOrder
      }).then((res) => {
        if (res.rcode === 300) {
          if (res.data.lessonList !== null) {
            res.data.lessonList.map((item) => {
              item.playPercent = item.videoUserModel.readTime / item.videoModel.videoTime * 100
            })
            this.courses = this.courses.concat(res.data.lessonList)
            if (this.courses.length > 0) {
              this.tit = this.courses[0].courseName
            }
            this.offSet++
          } else {
            this.finished = true
          }
          // 如果vuex中有记录曾经翻到的页数,则改变当前页数，清楚vuex记录
          if (this.videoPage) {
            this.offSet = this.videoPage
            this.SET_VIDEO_PAGE(null)
            // 跳到相对应位置
            this.$nextTick(() => {
              let div = document.getElementById('video' + this.currentVideoId)
              if (div) {
                window.scrollTo(0, div.offsetTop)
                this.SET_CURRENT_VIDEO_ID('')
              }
            })
          }
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    closeOrder () {
      this.isShowOrders = false
    },
    // 更改排序
    changeSort (index) {
      this.isShowOrders = false
      if (this.videoType === index) {
        return false
      }
      // this.orderIndex = index
      this.SET_VIDEO_TYPE(index)
      this.offSet = 0
      this.finished = false
      this.courses = []
      this.getCourseList()
    },
    clickDetail (course, index) {
      this.SET_CURRENT_VIDEO_ID(course.videoId)
    },
    ...mapMutations('video', [
      'SET_VIDEO_PAGE', 'SET_CURRENT_VIDEO_ID', 'SET_VIDEO_TYPE'
    ])
  },
  created () {
    this.courseId = this.$route.query.courseId
    this.gradeOrder = this.$route.query.gradeOrder
  },
  beforeRouteLeave (to, from, next) {
    // 离开的时候，判断是前进还是后退，前进的话，记录当前页数，后退的话，销毁页数
    if (to.path === '/videoDetail') {
      // 记录页数
      this.SET_VIDEO_PAGE(this.offSet)
    } else {
      // 清除页数
      this.SET_VIDEO_PAGE(null)
      this.SET_CURRENT_VIDEO_ID('')
      this.SET_VIDEO_TYPE(0)
    }
    next()
  }
}
</script>

<style scoped lang="scss" src="./list.scss"></style>
