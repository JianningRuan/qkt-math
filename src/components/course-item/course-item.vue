<template>
  <div>
    <div class="course-item flex" v-for="(course, index) in courses" :key="course.id" @click="toLessDetail(course, index)" :id="setDiveId(course.videoId)">
      <div class="cover" v-if="course.videoModel" :class="{'overflow': course.videoUserModel.browsing === 2}">
        <img class="pic" :src="course.videoModel.videoPic"/>
        <div class="complete" v-if="course.videoUserModel.browsing === 2">已看</div>
        <div class="time" v-if="course.videoModel.videoTime !== 0">{{course.videoModel.videoTime | formatSecond}}</div>
        <div class="schedule" v-if="course.videoUserModel.browsing === 1">
          <div class="schedule-line" :style="{width: course.playPercent + '%  '}"></div>
        </div>
      </div>
      <div class="cont flex1 flex flex-v flex-pack-justify" v-if="course.videoModel">
        <div>
          <div class="title">{{course.videoModel.videoName}}</div>
          <div class="teacher">讲师: {{course.videoModel.authorName}}</div>
        </div>
        <div class="msg">
          <a>
            <svg-icon icon-class="eye"></svg-icon>
            {{course.videoModel.playCount}}
          </a>
        </div>
      </div>
    </div>
    <div class="home-box pt" v-if="courses.length === 0">
      <BaseNone class="pt">
        <p slot="tips">暂无视频</p>
      </BaseNone>
    </div>
  </div>
</template>

<script>
export default {
  name: 'course-item',
  components: {},
  props: {
    courses: {
      type: Array,
      default: () => [],
      required: false
    }
  },
  filters: {
    formatSecond (val) {
      let min = parseInt(val / 60)
      let second = val - (min * 60)
      min = min.toString()
      second = second.toString()
      if (min.length < 2) {
        min = '0' + min
      }
      if (second.length < 2) {
        second = '0' + second
      }
      return `${min}:${second}`
    }
  },
  methods: {
    setDiveId (id) {
      return `video${id}`
    },
    toLessDetail (course, index) {
      this.$emit('clickDetail', course, index)
      this.$router.push({
        name: 'videoDetail',
        query: {
          videoId: course.videoModel.videoId
        }
      })
    }
  }
}
</script>

<style scoped lang="scss" src="./course-item.scss"></style>
