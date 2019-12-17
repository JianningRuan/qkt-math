<template>
  <div>
    <div class="level-wrapper flex flex-align-center flex-pack-justify" v-if="status">
      <span>口算等级：<em>{{userInfo.levelNum}}</em>级</span>
      <a class="detail-btn" @click="goMyPower">详情</a>
    </div>
    <div class="main pt">
      <!--头部-->
      <!-- <div class="message-box flex flex-pack-justify flex-align-center">
        <div class="user-box flex1 flex">
          <div class="user-head" @click="goMyPower">
            <img :src="userInfo.pic || './images/stu-head.png'" />
          </div>
          <div class="user-info flex flex-v flex-pack-around">
            <h2>{{userInfo.name}}</h2>
            <div class="level-box">
              <div class="level-progress" :style="{width: (userInfo.academicValue - userInfo.lowerValue) / (userInfo.upperValue - userInfo.lowerValue) * 100 + '%'}"></div>
              <div class="level-name">Lv{{userInfo.levelNum}}:{{userInfo.levelName}}</div>
            </div>
          </div>
        </div>
        <a class="bee-btn" @click="goBee"></a>
      </div> -->
      <!--头部-end-->
      <div class="home-box task-box" v-if="!status">
        <div class="test-tips mb">
          <div class="test-tips-cont flex flex-align-center">
            <div class="tips-pic"></div>
            <div class="tips-text flex1">开始练习之前，需要花费大概5分钟测测你目前的口算能力！</div>
          </div>
          <a class="test-btn" @click="goTest">开始测评</a>
        </div>
      </div>
      <!--任务-->
      <div class="home-box task-box" v-else>
        <div class="task-tit flex">
          <div class="task-num flex1">今日任务<span>（{{finishTask}}/{{taskList.length}}）</span></div>
          <a class="home-btn" @click="goHistory">记录</a>
          <a class="home-btn" @click="goMore">更多</a>
        </div>
        <BaseNone v-if="taskList.length === 0">
          <div slot="tips">暂无任务，快去测试或者领取</div>
        </BaseNone>
        <div class="task-swipe" v-else>
          <van-swipe>
            <van-swipe-item v-for="task in taskList" :key="task.id">
              <div class="task-cont flex flex-pack-justify" @click="goTask(task)">
                <div class="task-pic">
                  <img :src="task.banner" />
                </div>
                <div class="task-info flex1 flex flex-v flex-pack-justify">
                  <div class="task-name">
                    <h2>{{task.title}}</h2>
                    <p>已完成<span>{{task.days}}天</span></p>
                  </div>
                  <a class="label-btn flex flex-align-center flex-self-end">
                    <span><svg-icon icon-class="great" class="great-icon"></svg-icon></span>
                    <em v-if="!task.status">去完成</em>
                    <em v-else>已完成</em>
                  </a>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
      <!--任务-end-->
      <div class="flex flex-pack-justify mb">
        <!--排行榜-->
        <div class="home-box ranking-box flex1 flex flex-v flex-pack-justify" @click="goRank">
          <div>
            <h2>排行榜</h2>
            <p>Ranking</p>
          </div>
          <p class="tips" v-if="status">积分排名榜第<em>{{mathUserInfo.myRankNum}}</em>名</p>
        </div>
        <!--排行榜-end-->
        <!--错题本-->
        <div class="home-box review-box flex1 flex flex-v flex-pack-justify" @click="goBook">
          <div>
            <h2>错题本</h2>
            <p>Review</p>
          </div>
          <p class="tips" v-if="status">还有<em>{{mathUserInfo.wrongCount}}</em>个知识点未强化训练</p>
          <div class="practice-label"></div>
        </div>
        <!--错题本-end-->
      </div>
      <!--去测试-->
      <div class="test-btn-wrapper" v-if="status">
        <div class="test-bg"></div>
        <a @click="goTest">5分钟测测你的口算能力<svg-icon icon-class="right" class="right-icon"></svg-icon></a>
      </div>
      <!--去测试-end-->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'practice',
  data () {
    return {
      taskList: [],
      finishTask: 0,
      status: false,
      mathUserInfo: {}
    }
  },
  components: {},
  created () {
    this.SET_PRACTICE_TAB(0)
    this.dataAndTest()
  },
  mounted () {
    this.getTask()
  },
  activated () {
  },
  destroyed () {
  },
  watch: {},
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  filters: {},
  methods: {
    // 判断是否是否第一次注册及是否进入测试
    async dataAndTest () {
      let res = await this.$api.home.getStatus()
      if (res.rcode === 300) {
        this.status = res.data.status
        if (this.status) {
          this.getMathUserInfo()
        }
      }
    },
    goBee () {
      this.$router.push({
        path: '/bee'
      })
    },
    getMathUserInfo () {
      this.$api.home.getInfo().then((res) => {
        if (res.rcode === 300) {
          this.mathUserInfo = res.data
        }
      })
    },
    getTask () {
      this.$api.home.getTasks().then((res) => {
        if (res.rcode === 300) {
          this.taskList = res.data.taskList
          this.taskList.forEach(val => {
            if (val.status) {
              this.finishTask++
            }
          })
        }
      })
    },
    goMyPower () {
      this.$router.push({
        path: '/power'
      })
    },
    goHistory () {
      this.$router.push({
        path: '/taskHistory'
      })
    },
    goMore () {
      this.$router.push({
        path: '/allTaskList'
      })
    },
    goTest () {
      this.$router.push({
        path: '/testWelcome'
      })
    },
    goRank () {
      this.$router.push({
        path: '/rank'
      })
    },
    goBook () {
      this.$router.push({
        path: '/book'
      })
    },
    goTask (task) {
      this.$router.push({
        path: '/taskDetail',
        query: {
          id: task.id,
          taskUserId: task.taskUserId
        }
      })
    },
    ...mapMutations([
      'SET_PRACTICE_TAB'
    ])
  }
}
</script>
<style scoped lang="scss" src="./MathPractice.scss"></style>
<style lang="scss">
  .task-swipe {
    .van-swipe {
      height: 3.3rem;
    }
    .van-swipe__indicators {
      bottom: 8px;
      height: 8px;
      font-size: 0;
      line-height: 8px;
      .van-swipe__indicator {
        background: #8dc6e5;
        opacity: 1;
        &.van-swipe__indicator--active {
          background: #b6e1f9;
        }
      }
    }
  }
</style>
