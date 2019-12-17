<template>
  <div>
    <BaseInnerPageHead :tit="tit">
      <div slot="nav" v-if="task.isMyself === true && task.major === false">
        <a class="out-btn" @click="delTask"></a>
      </div>
    </BaseInnerPageHead>
    <div class="main">
      <!--任务-->
      <div class="home-box task-cont flex flex-pack-justify mb">
        <div class="task-info flex1 flex flex-v flex-pack-justify">
          <div class="task-name">
            <h2>{{task.title}}</h2>
            <p>{{task.content}}</p>
          </div>
          <div class="label-tips flex flex-align-center" v-if="task.isMyself"><span class="flash"><svg-icon icon-class="flash"></svg-icon></span><em>{{task.academicValue}}</em><i>|</i>已完成<em>{{task.days}}天</em></div>
          <div class="label-tips flex flex-align-center" v-else><span class="flash"><svg-icon icon-class="flash"></svg-icon></span>完成任务得<em>{{allAcademicValue}}学力值</em></div>
        </div>
        <div class="task-pic">
          <img :src="task.banner" />
        </div>
      </div>
      <!--任务-end-->
      <!--单日任务详情-->
      <div class="home-box task-detail mb">
        <div class="task-journey">
          <div class="task-journey-tit">
            <svg-icon icon-class="train" class="train-icon"></svg-icon>
            <em>任务旅程</em>
          </div>
          <div class="task-journey-cont">
            <div class="task-journey-scroll" ref="scroll">
              <!--车箱-->
              <div class="car-box" ref="car" v-for="(subTask, index) in task.subTaskList" :key="subTask.subTaskId" :class="[carNum(index), isCurrent(subTask), noStartCurrent(index)]" @click="setCarTab(index)">
                <div class="car-day">{{subTask.num}}天</div>
                <div class="car-fraction" v-if="subTask.done"><svg-icon icon-class="great" class="great-icon"></svg-icon></div>
                <div class="car-fraction flex flex-align-center flex-pack-center" v-else-if="index + 1 === task.subTaskList.length"><img src="@/assets/images/task/box.png"/></div>
                <div class="car-fraction" v-else>+{{subTask.academicValue}}</div>
              </div>
              <!--车箱-end-->
            </div>
          </div>
        </div>
        <div class="task-line-wrapper"></div>
        <div class="children-task" v-if="subTaskList.length > 0">
          <div class="flex flex-pack-justify">
            <div class="tit"><svg-icon icon-class="flag" class="flag-icon"></svg-icon>第{{subTaskList[subTaskIndex].num}}天</div>
            <div class="task-result pass" v-if="subTaskList[subTaskIndex].done && subTaskList[subTaskIndex].result"></div>
            <div class="task-result fail" v-if="subTaskList[subTaskIndex].done && !subTaskList[subTaskIndex].result"></div>
          </div>
          <div class="cont mb">
            <div class="cont-list flex flex-pack-justify">
              <div class="list-tit">任务目标</div>
              <div class="list-cont">口算闯关取得{{subTaskList[subTaskIndex].stars | Arab2Chn}}颗星<span class="reward-status" :class="{'finish': subTaskList[subTaskIndex].result}"><svg-icon icon-class="great"></svg-icon></span></div>
              <div class="list-pic book-pic"></div>
            </div>
            <div class="cont-list flex flex-pack-justify">
              <div class="list-tit">任务奖励</div>
              <div class="list-cont">学力值+{{subTaskList[subTaskIndex].academicValue}}<span class="reward-status" :class="{'finish': subTaskList[subTaskIndex].result}"><svg-icon icon-class="great"></svg-icon></span></div>
              <div class="list-pic star-pic"></div>
            </div>
          </div>
          <a class="join-btn mb" @click="join" v-if="!task.isMyself">加入训练<van-loading class="loading" size="20px" type="spinner" color="#ffffff" v-if="joinLoading" /></a>
          <a class="join-btn mb" v-else-if="!task.finish && task.isMyself && subTaskList[subTaskIndex].status === 1 && !subTaskList[subTaskIndex].done" @click="goPlay">开始闯关</a>
          <a class="join-btn mb" v-else-if="!task.finish && task.isMyself && subTaskList[subTaskIndex].status === 0 && !subTaskList[subTaskIndex].done" @click="goPlay">补做任务</a>
          <a class="join-btn mb" v-else-if="!task.finish && task.isMyself && subTaskList[subTaskIndex].status !== 2 && subTaskList[subTaskIndex].done" @click="goPlay">再次闯关</a>
          <a class="join-btn mb" v-else-if="!task.finish && task.isMyself && subTaskList[subTaskIndex].status === 2">尚未开始</a>
        </div>
      </div>
      <!--单日任务详情-end-->
    </div>
    <BasePop :basePop="basePop" :popShow="popShow" @submitPop="submitPop" @cancelPop="cancelPop"/><!--超出任务个数弹窗-->
    <BasePop :basePop="delPop" :popShow="delPopShow" @submitPop="keepTaskPop" @cancelPop="delTaskPop"/><!--删除任务弹窗-->
  </div>
</template>

<script>
export default {
  name: 'TaskDetail',
  data () {
    return {
      tit: '口算训练',
      basePop: {},
      popShow: false,
      taskId: '',
      taskUserId: '',
      task: {},
      subTaskList: [],
      subTaskIndex: 0, // 当前子任务
      currentTask: {},
      allAcademicValue: 0, // 总共的学力值
      delPop: {},
      delPopShow: false,
      joinLoading: false,
      delLoading: false
    }
  },
  components: {},
  async created () {
    this.taskId = this.$route.query.id
    this.taskUserId = this.$route.query.taskUserId
    await this.getTaskDetail()
  },
  mounted () {},
  activated () {
  },
  destroyed () {
  },
  watch: {},
  computed: {},
  filters: {},
  methods: {
    async getTaskDetail () {
      let params = {
        taskId: this.taskId,
        taskUserId: this.taskUserId
      }
      let res = await this.$api.task.getTaskDetail(params)
      if (res.rcode === 300) {
        this.task = res.data
        let reIndex = false
        this.subTaskList = res.data.subTaskList
        for (let i = 0, l = this.subTaskList.length; i < l; i++) {
          this.allAcademicValue += this.subTaskList[i].academicValue
          if (this.subTaskList[i].status === 1 && !reIndex) {
            this.subTaskIndex = i
            reIndex = true
          }
          if (this.task.isMyself && !reIndex && l === i + 1) {
            this.subTaskIndex = i
          }
        }
        // 如果当前天数超过7，这需要滚动到当前天数的车车
        this.$nextTick(() => {
          if (this.subTaskIndex >= 7) {
            let scroll = this.$refs.scroll
            let car = this.$refs.car[this.subTaskIndex]
            let left = car.offsetLeft
            scroll.scrollTo(left, 0)
          }
        })
      }
    },
    carNum (num) {
      let remainder = num % 7 + 1
      return 'car-box-' + remainder
    },
    isCurrent (subTask) {
      if (subTask.done) {
        return 'finish'
      } else {
        if (subTask.status === 1) {
          return 'current'
        } else {
          return ''
        }
      }
    },
    noStartCurrent (index) {
      if (!this.task.isMyself && index === 0) {
        return 'current'
      } else {
        return ''
      }
    },
    setCarTab (index) {
      this.subTaskIndex = index
    },
    join () {
      if (this.joinLoading) {
        return
      }
      this.joinLoading = true
      let params = {
        id: this.taskId
      }
      this.$api.task.addTask(params).then((res) => {
        this.joinLoading = false
        if (res.rcode === 300) {
          if (res.data.result) {
            // this.task.isMyself = true
            this.taskUserId = res.data.taskUserId
            // window.location.hash = `/taskDetail?id=${this.taskId}&taskUserId=${this.taskUserId}`
            window.location.replace(`#/taskDetail?id=${this.taskId}&taskUserId=${this.taskUserId}`)
            this.$toast.success('加入成功')
            this.getTaskDetail()
          } else {
            this.basePop = {
              type: 'alert', // alert, confirm
              submitBtnText: '好的', // 确定按钮的文字
              content: '你已有多个任务进行中的任务啦，请先完成其他任务吧~'
            }
            this.popShow = true
          }
        }
      })
    },
    goPlay () {
      this.$router.push({
        path: '/challenge',
        query: {
          taskId: this.taskId,
          taskUserId: this.taskUserId,
          subTaskId: this.subTaskList[this.subTaskIndex].subTaskId,
          count: this.subTaskList[this.subTaskIndex].count,
          duration: this.task.duration,
          stars: this.subTaskList[this.subTaskIndex].stars,
          result: this.subTaskList[this.subTaskIndex].result
        }
      })
    },
    delTask () {
      this.delPop = {
        tit: '删除任务',
        type: 'confirm', // alert, confirm
        submitBtnText: '保留任务', // 确定按钮的文字
        cancelBtnText: '确定删除',
        content: `是否确定要删除 <em style="color: #79d0ff;">${this.task.title}</em> 任务？`,
        showCloseBtn: false
      }
      this.delPopShow = true
    },
    keepTaskPop () {
      this.delPopShow = false
    },
    delTaskPop () {
      if (this.delLoading) {
        return
      }
      this.delLoading = true
      let params = {
        taskId: this.taskId,
        taskUserId: this.taskUserId
      }
      this.$api.task.delTask(params).then((res) => {
        this.delLoading = false
        if (res.rcode === 300) {
          this.$toast('删除成功')
          this.$router.go(-1)
        } else {
          this.$toast(res.message)
        }
      })
    },
    submitPop () {
      this.popShow = false
    },
    cancelPop () {
      this.popShow = false
    }
  }
}
</script>

<style scoped lang="scss" src="./TaskDetail.scss"></style>
