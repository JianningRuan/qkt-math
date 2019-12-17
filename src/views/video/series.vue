<template>

  <div id="video-list">
    <div class="base-tit">
      <BaseTit></BaseTit>
    </div>
    <!-- 筛选 -->
    <div class="screen flex flex-align-center">
      <div class="screen-item flex1" @click="showGradeNav">{{grades[gradeIndex].name}}<svg-icon :icon-class="isShowGrades?'top':'down'" ></svg-icon></div>
      <div class="screen-item flex1" @click="showSubjectNav">{{subjects[subjectIndex].name}}<svg-icon :icon-class="isShowSubjects?'top':'down'" ></svg-icon></div>
    </div>

    <!-- 视频 -->
    <div class="section-list">
      <div class="section-item" v-for="course in courses" :key="course.id">
        <div class="section-top flex flex-align-center">
          <div class="section-title flex1">{{course.name}}</div>
          <span class="more" @click="toCourseList(course)">更多<svg-icon icon-class="right" class="right-icon"></svg-icon></span>
        </div>
        <div class="section-cont">
          <div class="resources-box-list">
            <div class="resources-box-item" v-for="video in course.lessonList" @click="toVideoDetail(video)" :key="video.id">
              <div class="cover">
                <img :src="video.videoModel.videoPic" :alt="video.videoModel.videoName" :title="video.videoModel.videoName" />
              </div>
              <div class="cont">
                <div class="title">{{video.videoModel.videoName}}</div>
                <div class="msg">
                  <span class="views"><svg-icon icon-class="eye" class="eye-icon"></svg-icon>{{video.videoModel.playCount  }} </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 选择科目 -->
    <div class="mask flex flex-v" v-if="isShowSubjects" @click.stop.prevent="closeOrder">
      <div class="mask-warp flex1">
        <div class="subject-list">
          <div class="subject-item flex flex-align-center" v-for="(subject,index) in subjects" :key="index" @click.stop.prevent="changeSubject(index)">
            <template v-if="subject.value === 0">
              <img src="@/assets/images/course/all-icon.png" />
            </template>
            <template v-else-if="subject.value === 1">
              <img src="@/assets/images/course/en-icon.png" />
            </template>
            <template v-else-if="subject.value === 2">
              <img src="@/assets/images/course/math-icon.png" />
            </template>
            <template v-else-if="subject.value === 3">
              <img src="@/assets/images/course/cn-icon.png" />
            </template>
            <div class="name">{{subject.name}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 选择年级 -->
    <div class="mask flex flex-v" v-if="isShowGrades" @click.stop.prevent="closeOrder">
      <div class="mask-warp flex1">
        <div class="subject-list">
          <div class="subject-item flex flex-align-center" v-for="(grade,index) in grades" :key="index" @click.stop.prevent="changeGrade(index)">
            <div class="name">{{grade.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'video-list',
  data () {
    return {
      courses: [],
      grades: [
        { name: '全部年级', value: 0 },
        { name: '一年级', value: 1 },
        { name: '二年级', value: 2 },
        { name: '三年级', value: 3 },
        { name: '四年级', value: 4 },
        { name: '五年级', value: 5 },
        { name: '六年级', value: 6 }
      ],
      subjects: [
        { name: '全部学科', value: 0 },
        { name: '英语', value: 1 },
        { name: '语文', value: 2 },
        { name: '数学', value: 3 }
      ],
      gradeIndex: parseInt(localStorage.getItem('courseGradeIndex')) || 0,
      subjectIndex: parseInt(localStorage.getItem('courseSubjectIndex')) || 0,
      params: {
        offSet: 0,
        offSize: 50
      },
      isShowSubjects: false,
      isShowGrades: false
    }
  },
  methods: {
    showGradeNav () {
      this.isShowSubjects = false
      this.isShowGrades = !this.isShowGrades
    },
    showSubjectNav () {
      this.isShowGrades = false
      this.isShowSubjects = !this.isShowSubjects
    },
    async getCourse () {
      let res = await this.$api.course.getCourse({
        gradeOrder: this.grades[this.gradeIndex].value,
        subject: this.subjects[this.subjectIndex].value,
        ...this.params
      })
      if (res && res.rcode === 300) {
        if (res.data === null) {
          this.courses = []
        } else {
          this.courses = res.data.courseList
        }
      }
    },
    closeOrder () {
      this.isShowGrades = false
      this.isShowSubjects = false
    },
    // 更改科目
    changeSubject (index) {
      this.isShowGrades = false
      this.isShowSubjects = false
      if (this.subjectIndex === index) {
        return false
      }
      this.subjectIndex = index
      this.getCourse()
    },
    // 更改年级
    changeGrade (index) {
      this.isShowGrades = false
      this.isShowSubjects = false
      if (this.gradeIndex === index) {
        return false
      }
      this.gradeIndex = index
      this.getCourse()
    },
    // 去课程列表页
    toCourseList (course) {
      this.$router.push({
        name: 'courseList',
        query: {
          courseId: course.id,
          gradeOrder: this.grades[this.gradeIndex].value
        }
      })
    },
    // 去视频详细
    toVideoDetail (video) {
      this.$router.push({
        name: 'videoDetail',
        query: {
          videoId: video.videoModel.videoId
        }
      })
    }
  },
  created () {
    this.getCourse()
  }
}
</script>

<style scoped  lang="scss" src="./series.scss"></style>
