<template>
  <div>
    <BaseInnerPageHead :tit="tit">
      <a class="grade-btn" slot="nav">{{grade | Arab2Chn}}年级{{semester === 1 ? '上' : '下'}}</a>
    </BaseInnerPageHead>
    <div class="main">
      <!--任务-->
      <div class="home-box task-cont flex flex-pack-justify mb" v-for="task in taskList" :key="task.taskId" @click="join(task)">
        <div class="task-pic">
          <img :src="task.banner" />
        </div>
        <div class="task-info flex1 flex flex-v flex-pack-justify">
          <div class="task-name">
            <h2>{{task.title}}</h2>
            <p>{{task.content}}</p>
          </div>
          <a class="label-btn-end flex-self-end" v-if="task.join">已参加</a>
          <a class="label-btn flex-self-end" v-else>加入训练</a>
        </div>
      </div>
      <!--任务-end-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllTaskList',
  data () {
    return {
      tit: '更多任务',
      grade: 1,
      semester: 1,
      taskList: []
    }
  },
  components: {},
  created () {
  },
  mounted () {
    this.getAllTask()
  },
  activated () {
  },
  destroyed () {
  },
  watch: {},
  computed: {},
  filters: {},
  methods: {
    getAllTask () {
      this.$api.task.getAllTask().then((res) => {
        if (res.rcode === 300) {
          this.taskList = res.data.taskList
          this.grade = res.data.grade
          this.semester = res.data.semester
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
    }
  }
}
</script>

<style scoped lang="scss" src="./AllTaskList.scss"></style>
