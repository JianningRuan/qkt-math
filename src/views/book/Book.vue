<template>
  <div>
    <BaseInnerPageHead :tit="tit">
      <div slot="nav" v-if="grade !== '' && semester !== ''">
        <a class="switch-btn flex flex-align-center" @click="changeGrade"><span><svg-icon icon-class="switch"></svg-icon></span>{{gradeList[grade - 1].name}}{{semesterList[semester - 1].name}}</a>
      </div>
    </BaseInnerPageHead>
    <div class="main">
      <div class="home-box none-box" v-if="wrongList.length === 0">
        <BaseNone class="none pt">
          <p slot="tips">这里没有错题，请继续保持哦</p>
        </BaseNone>
      </div>
      <van-list v-model="loading"
                :finished="finished"
                :finished-text="finishText"
                @load="getWrongList">
        <div class="home-box book-list" v-if="wrongList.length !== 0">
          <!--错题只是点-->
          <div class="error-item" v-for="wrong in wrongList" :key="wrong.id">
            <div class="tit ellipsis">{{wrong.title}}</div>
            <div class="flex">
              <div class="error-info flex1 flex flex-v flex-pack-justify">
                <p>正确率:{{wrong.rate}}%</p>
                <div class="error-progress-box">
                  <div class="error-progress" :style="{width: wrong.rate + '%'}"></div>
                </div>
              </div>
              <a class="btn error-btn" @click="goDetail(wrong)">查看</a>
              <a class="btn error-btn yellow-btn" @click="goPractice(wrong)">强化</a>
            </div>
          </div>
          <!--错题只是点-end-->
        </div>
      </van-list>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        ref="grade"
        show-toolbar
        value-key="name"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { common } from '../../utils/common'

export default {
  name: 'book',
  data () {
    return {
      tit: '错题本',
      offSet: 0,
      offSize: 10,
      loading: false,
      finished: false,
      finishText: '没有更多了',
      grade: '',
      semester: '',
      myGrade: 0,
      mySemester: 1,
      wrongList: [],
      first: true,
      showPicker: false,
      columns: [
        {
          values: common.gradeList
        },
        {
          values: common.semesterList
        }
      ],
      gradeList: common.gradeList,
      semesterList: common.semesterList
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
  watch: {},
  computed: {},
  filters: {},
  methods: {
    getWrongList () {
      let params = {
        semester: this.semester,
        grade: this.grade,
        offSet: this.offSet,
        offSize: this.offSize
      }
      this.$api.wrong.book(params).then((res) => {
        if (res.rcode === 300) {
          this.wrongList = this.wrongList.concat(res.data.wrongList)
          this.myGrade = res.data.grade
          this.mySemester = res.data.semester
          this.offSet++
          this.loading = false
          if (this.first) {
            this.grade = res.data.grade
            this.semester = res.data.semester
          }
          if (this.offSet >= res.data.totalPages) {
            this.finished = true
          }
          if (res.data.totalPages === 0) {
            this.finishText = ''
          } else {
            this.finishText = '没有更多了'
          }
        }
      })
    },
    changeGrade () {
      this.showPicker = true
      this.$nextTick(() => {
        let gradePicker = this.$refs.grade
        gradePicker.setColumnIndex(0, this.grade - 1)
        gradePicker.setColumnIndex(1, this.semester - 1)
      })
    },
    onConfirm (value, index) {
      this.showPicker = false
      this.grade = value[0].id
      this.semester = value[1].id
      this.offSet = 0
      this.wrongList = []
      this.getWrongList()
    },
    goDetail (val) {
      this.$router.push({
        path: '/bookDetail',
        query: {
          id: val.id,
          tit: val.title
        }
      })
    },
    goPractice (val) {
      this.$router.push({
        path: '/practice',
        query: {
          id: val.id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss" src="./Book.scss"></style>
