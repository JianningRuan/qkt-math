<template>
  <div class="wrapper">
    <div class="box">
      <BaseInnerPageHead :tit="tit" />
      <div class="main">
        <div class="home-box calendar-box mb">
          <div class="calendar-banner mb">
            <img src="@/assets/images/bee/bee-banner.jpg" />
            <div class="calendar-banner-cont">
              <h2>我已坚持学习{{studyCount}}天</h2>
              <p>好棒呀，请再接再厉！</p>
            </div>
          </div>
          <div id="calendar">
            <!-- 年份 月份 -->
            <div class="month">
              <ul>
                <li class="arrow" @click="pickPre(currentYear,currentMonth)"><svg-icon icon-class="left"></svg-icon></li>
                <li class="year-month" @click="pickYear(currentYear,currentMonth)">{{ currentYear }}年{{ currentMonth }}月</li>
                <li class="arrow" @click="pickNext(currentYear,currentMonth)"><svg-icon icon-class="right"></svg-icon></li>
              </ul>
            </div>
            <!-- 星期 -->
            <ul class="weekdays">
              <li>一</li>
              <li>二</li>
              <li>三</li>
              <li>四</li>
              <li>五</li>
              <li>六</li>
              <li>日</li>
            </ul>
            <!-- 日期 -->
            <ul class="days" ref="days">
              <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
              <li v-for="(dayObject, index) in days" :key="index" :data-no="dayObject.day | moment('YYYY/MM/DD')" :class="getDataPoint(dayObject)">
                <!--本月-->
                <!--如果不是本月  改变类名加灰色-->
                <span v-if="dayObject.day.getMonth()+1 !== currentMonth" class="other-month">{{ dayObject.day.getDate() }}</span>
                <!--如果是本月  还需要判断是不是这一天-->
                <span v-else>
                <!--今天  同年同月同日-->
                <span v-if="dayObject.day.getFullYear() === new Date().getFullYear() && dayObject.day.getMonth() === new Date().getMonth() && dayObject.day.getDate() === new Date().getDate()" class="active">{{ dayObject.day.getDate() }}</span>
                <span v-else>{{ dayObject.day.getDate() }}</span>
              </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="showMonthPiker" position="bottom">
      <van-datetime-picker
        ref="picker"
        v-model="currentDate"
        type="year-month"
        @confirm="dataConfirm"
        @cancel="showMonthPiker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'BeeCalendar',
  data () {
    return {
      tit: '学习日历',
      currentDay: 1,
      currentMonth: '',
      currentYear: '',
      currentWeek: 1,
      days: [],
      dateList: [],
      showMonthPiker: false,
      currentDate: '',
      studyCount: 0
    }
  },
  components: {},
  async created () {
    await this.getDiary()
    this.initData(null)
  },
  mounted () {},
  activated () {},
  watch: {},
  computed: {},
  filters: {},
  methods: {
    getDataPoint (dayObject) {
      let hasPoint = false
      let current = new Date(dayObject.day).getTime()
      for (let i = 0, l = this.dateList.length; i < l; i++) {
        if (current === this.dateList[i]) {
          hasPoint = true
          break
        }
      }
      return { 'point': hasPoint }
    },
    // 获取月份的做任务的日期列表
    async getDiary () {
      let params = {
        yyyyMM: ''
      }
      if (this.currentMonth !== '' && this.currentYear !== '') {
        let currentMonth = this.currentMonth >= 10 ? this.currentMonth : '0' + this.currentMonth
        console.log(currentMonth)
        params.yyyyMM = this.currentYear + currentMonth.toString()
      }
      let res = await this.$api.bee.diary(params)
      if (res.rcode === 300) {
        this.dateList = res.data.diary
        this.studyCount = res.data.studyCount
      }
    },
    // 监听日历打开后回传的值
    pickerOpen (yeah, month) {
      this.$nextTick(() => {
        this.getDiary()
      })
    },
    initData (cur) {
      let date
      if (cur) {
        date = new Date(cur)
      } else {
        let now = new Date()
        let d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1))
        d.setDate(35)
        date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      }
      this.currentDay = date.getDate()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1

      this.currentWeek = date.getDay() // 1...6,0
      if (this.currentWeek === 0) {
        this.currentWeek = 7
      }
      let str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)
      this.days.length = 0
      // 今天是周日，放在第一行第7个位置，前面6个
      // 初始化本周
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        let d = new Date(str)
        d.setDate(d.getDate() - i)
        let dayObject = {} // 用一个对象包装Date对象  以便为以后预定功能添加属性
        dayObject.day = d
        this.days.push(dayObject)// 将日期放入data 中的days数组 供页面渲染使用
      }
      // 其他周
      for (let i = 1; i <= 35 - this.currentWeek; i++) {
        let d = new Date(str)
        d.setDate(d.getDate() + i)
        let dayObject = {}
        dayObject.day = d
        this.days.push(dayObject)
      }
    },
    pickPre (year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      let d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))

      this.pickerOpen(year, month)
    },
    pickNext: function (year, month) {
      console.log(month)
      let d = new Date(this.formatDate(year, month, 1))
      d.setDate(35)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))

      this.pickerOpen(year, month)
    },
    pickYear (year, month) {
      this.currentDate = new Date(year + '/' + month)
      this.$nextTick(() => {
        this.showMonthPiker = true
      })
    },
    dataConfirm (value) {
      this.showMonthPiker = false
      this.initData(value)
      this.getDiary()
    },
    // 返回 类似 2016-01-02 格式的字符串
    formatDate (year, month, day) {
      let y = year
      let m = month
      if (m < 10) m = '0' + m
      let d = day
      if (d < 10) d = '0' + d
      return y + '/' + m + '/' + d
    }
  }
}
</script>
<style scoped lang="scss" src="./BeeCalendar.scss"></style>
