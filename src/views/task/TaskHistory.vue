<template>
  <div>
    <BaseInnerPageHead :tit="tit">
      <div slot="nav" v-if="grade !== '' && grade !== undefined"><!--已结束任务才显示按钮-->
        <a class="switch-btn flex flex-align-center" @click="changeGrade"><span><svg-icon icon-class="switch"></svg-icon></span>{{gradeList[grade - 1].name}}</a>
      </div>
    </BaseInnerPageHead>
    <div class="main">
      <div class="tab flex">
        <div class="tab-item flex1 flex flex-pack-center flex-align-center" :class="{'current' : taskTab === 0}" @click="setTab(0)"><em></em>进行中</div>
        <div class="tab-item flex1 flex flex-pack-center flex-align-center" :class="{'current' : taskTab === 1}" @click="setTab(1)"><em></em>已结束</div>
      </div>
      <div class="task-list" v-show="taskTab === 0">
        <div class="home-box pt mb" v-if="ongoingTask.length === 0">
          <BaseNone class="pt">
            <div slot="tips">暂无任务记录</div>
          </BaseNone>
        </div>
        <!--任务-->
        <div class="home-box task-cont flex flex-pack-justify mb" v-else v-for="task in ongoingTask" :key="task.taskId" @click="join(task)">
          <div class="task-pic">
            <img :src="task.banner" />
          </div>
          <div class="task-info flex1 flex flex-v flex-pack-justify">
            <div class="task-name">
              <h2>{{task.title}}</h2>
              <p>已完成<span>{{task.days}}天</span></p>
            </div>
            <a class="label-btn flex flex-align-center flex-self-end">
              <span><svg-icon icon-class="great" class="great-icon"></svg-icon></span><em>去完成</em>
            </a>
          </div>
        </div>
        <!--任务-end-->
      </div>
      <div class="task-list" v-show="taskTab === 1">
        <div class="home-box pt mb" v-if="endTask.length === 0">
          <BaseNone class="pt">
            <div slot="tips">暂无任务记录</div>
          </BaseNone>
        </div>
        <!--任务-->
        <div class="home-box task-cont flex flex-pack-justify mb" v-else v-for="task in endTask" :key="task.taskId" @click="join(task)">
          <div class="task-pic">
            <img :src="task.banner" />
          </div>
          <div class="task-info flex1 flex flex-v flex-pack-justify">
            <div class="task-name">
              <h2>{{task.title}}</h2>
              <p>{{task.content}}</p>
            </div>
            <div class="label-tips">已完成<em>{{task.days}}天</em></div>
          </div>
        </div>
        <!--任务-end-->
      </div>
    </div>

    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        ref="grade"
        show-toolbar
        value-key="name"
        :columns="gradeList"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { common } from '../../utils/common'
export default {
  name: 'TaskHistory',
  data () {
    return {
      tit: '任务记录',
      ongoingTask: [],
      endTask: [],
      grade: '',
      gradeList: common.gradeList,
      showPicker: false,
      isFirst: true
    }
  },
  components: {},
  created () {
  },
  mounted () {
    this.getOngoingTask()
    this.getEndTask()
  },
  activated () {
  },
  destroyed () {
  },
  watch: {},
  computed: {
    ...mapGetters('task', [
      'taskTab'
    ])
  },
  filters: {},
  methods: {
    getOngoingTask () {
      let params = {
        grade: this.grade,
        type: 1
      }
      this.$api.task.getMyTask(params).then((res) => {
        if (res.rcode === 300) {
          this.ongoingTask = res.data.taskList
          if (this.isFirst) {
            this.grade = res.data.grade
            this.isFirst = false
          }
        }
      })
    },
    getEndTask () {
      let params = {
        grade: this.grade,
        type: 2
      }
      this.$api.task.getMyTask(params).then((res) => {
        if (res.rcode === 300) {
          this.endTask = res.data.taskList
          if (this.isFirst) {
            this.grade = res.data.grade
            this.isFirst = false
          }
        }
      })
    },
    join (task) {
      this.$router.push({
        path: '/taskDetail',
        query: {
          id: task.taskId,
          taskUserId: task.taskUserId
        }
      })
    },
    setTab (tab) {
      this.SET_TASK_TAB(tab)
    },
    changeGrade () {
      this.showPicker = true
      this.$nextTick(() => {
        let gradePicker = this.$refs.grade
        gradePicker.setColumnIndex(0, this.grade - 1)
      })
    },
    onConfirm (value, index) {
      console.log(value)
      this.showPicker = false
      this.grade = value.id
      this.$nextTick(() => {
        this.getOngoingTask()
        this.getEndTask()
      })
    },
    ...mapMutations('task', [
      'SET_TASK_TAB'
    ])
  }
}
</script>

<style scoped lang="scss" src="./TaskHistory.scss"></style>
