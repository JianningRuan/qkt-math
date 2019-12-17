<template>
  <div class="challenge flex flex-v">
    <div class="top flex flex-align-center">
      <div  class="top-item">
        <div class="top-item-warp flex flex-align-center">
          <a class="back-btn" @click="goBack"></a>
        </div>
      </div>
      <div class="top-item flex1">
        <div class="top-item-warp flex flex-align-center">
          <span class="cont">
            <img class="icon" src="@/assets/images/challenge/clock.png"/>
            <span class="value">{{timeString}}</span>
          </span>
        </div>
      </div>
      <div class="top-item flex1">
        <div class="top-item-warp flex flex-align-center">
          <span class="cont">
            <img class="icon" src="@/assets/images/challenge/right.png"/>
            <span class="value">{{score}}/{{questions.length}}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="main-warp flex1 flex flex-align-center">
      <!--题目-->
      <div class="topic">
        <div class="topic-list" ref="topic-list">
          <template v-if="questions.length>0">
            <div class="topic-item flex flex-align-center" v-for="(ques,index) in questions"
                 :key="index" :class="{'active':index==currentTopicIndex}">
              <div class="topic-item-warp flex1 text-center">
                <template v-if="ques.fraction">
                  <template v-for="(item,itemIndex) in ques.topic">
                    <template v-if="typeOfString(item)">
                      <span class="fraction fraction-warp" :key="itemIndex">{{item}}</span>
                    </template>
                    <span v-else class="fraction" :key="itemIndex">
                    <template v-if="item.length==3">
                      <span class="fraction-left fraction-warp"
                            :class="{'fraction-result-warp':itemIndex==ques.topic.length-1}"
                            @click="changeFractionFocusIndex(itemIndex,0)">
                        <template v-if="itemIndex==ques.topic.length-1">
                            {{ques.answers[0]}}<span class="cursor" v-if="cursorIndex==0"></span>
                          </template>
                          <template v-else>{{item[0]}}</template>
                      </span>
                      <span class="fraction-right">
                        <div class="fraction-warp" :class="{'fraction-result-warp':itemIndex==ques.topic.length-1}"
                             @click="changeFractionFocusIndex(itemIndex,1)">
                          <template v-if="itemIndex==ques.topic.length-1">
                            {{ques.answers[1]}}<span class="cursor" v-if="cursorIndex==1"></span>
                          </template>
                          <template v-else>{{item[1]}}</template>
                        </div>
                        <div class="fraction-line"></div>
                        <div class="fraction-warp" :class="{'fraction-result-warp':itemIndex==ques.topic.length-1}"
                             @click="changeFractionFocusIndex(itemIndex,2)">
                          <template v-if="itemIndex==ques.topic.length-1">
                            {{ques.answers[2]}}<span class="cursor" v-if="cursorIndex==2"></span>
                          </template>
                          <template v-else>{{item[2]}}</template>
                        </div>
                      </span>
                    </template>
                    <template v-else>
                      <span class="fraction-right">
                        <div class="fraction-warp" :class="{'fraction-result-warp':itemIndex==ques.topic.length-1}"
                             @click="changeFractionFocusIndex(itemIndex,0)">
                          <template v-if="itemIndex==ques.topic.length-1">
                            {{ques.answers[0]}}<span class="cursor" v-if="cursorIndex==0"></span>
                          </template>
                          <template v-else>{{item[0]}}</template>
                        </div>
                        <div class="fraction-line"></div>
                        <div class="fraction-warp" :class="{'fraction-result-warp':itemIndex==ques.topic.length-1}"
                             @click="changeFractionFocusIndex(itemIndex,1)">
                          <template v-if="itemIndex==ques.topic.length-1">
                            {{ques.answers[1]}}<span class="cursor" v-if="cursorIndex==1"></span>
                          </template>
                          <template v-else>{{item[1]}}</template>
                        </div>
                      </span>
                    </template>
                  </span>
                  </template>
                </template>
                <template v-else>
                  <template v-for="(item,itemIndex) in ques.topic">
                    <span v-if="item!='#'" :key="itemIndex">{{item}}</span>
                    <span v-else class="result-num" @click="cursorIndex=itemIndex" :key="itemIndex">
                    <span class="value">{{ques.answers && ques.answers[itemIndex]?ques.answers[itemIndex]:''}}</span>
                    <span class="cursor" v-if="cursorIndex==itemIndex"></span>
                  </span>
                  </template>
                </template>
                <img v-if="ques.isRight==true" class="result-icon success" src="@/assets/images/challenge/success.png"/>
                <img v-else-if="ques.isRight==false" class="result-icon error" src="@/assets/images/challenge/error.png"/>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="keyboard">
      <!--<table cellspacing="10" v-if="questions[currentTopicIndex] && questions[currentTopicIndex].type !== 4">
        <tr>
          <td><a v-tap="{methods : keyDown , val : 1}">1</a></td>
          <td><a v-tap="{methods : keyDown , val : 2}">2</a></td>
          <td><a v-tap="{methods : keyDown , val : 3}">3</a></td>
          <td><a v-tap="{methods : removeAttr}" >删除</a></td>
        </tr>
        <tr>
          <td><a v-tap="{methods : keyDown , val : 4}">4</a></td>
          <td><a v-tap="{methods : keyDown , val : 5}">5</a></td>
          <td><a v-tap="{methods : keyDown , val : 6}">6</a></td>
          <td rowspan="4" class="enter">
            <a class="flex flex-align-center" v-tap="{methods : finish}">
              <span>下一题</span>
            </a>
          </td>
        </tr>
        <tr>
          <td><a v-tap="{methods : keyDown , val : 7}">7</a></td>
          <td><a v-tap="{methods : keyDown , val : 8}">8</a></td>
          <td><a v-tap="{methods : keyDown , val : 9}">9</a></td>
        </tr>
        <tr>
          <td colspan="2"><a v-tap="{methods : keyDown , val : 0}">0</a></td>
          <td><a v-tap="{methods : keyDown , val : '.'}">.</a></td>
        </tr>
      </table>
      <table cellspacing="10" v-if="questions[currentTopicIndex] && questions[currentTopicIndex].type === 4">
        <tr>
          <td><a v-tap="{methods : keyDown , val : '<'}">&lt;</a></td>
        </tr>
        <tr>
          <td><a v-tap="{methods : keyDown , val : '>'}">&gt;</a></td>
        </tr>
        <tr>
          <td><a v-tap="{methods : keyDown , val : '='}">=</a></td>
        </tr>
        <tr>
          <td class="enter">
            <a class="flex flex-align-center" v-tap="{methods : finish}">
              <span>下一题</span>
            </a>
          </td>
        </tr>
      </table>-->
      <table cellspacing="10" v-if="questions[currentTopicIndex] && questions[currentTopicIndex].type !== 4">
        <tr>
          <td><a @touchstart.stop.prevent="touchKeyDown(1)">1</a></td>
          <td><a @touchstart.stop.prevent="touchKeyDown(2)">2</a></td>
          <td><a @touchstart.stop.prevent="touchKeyDown(3)">3</a></td>
          <td><a @touchstart.stop.prevent="removeAttr">删除</a></td>
        </tr>
        <tr>
          <td><a @touchstart.stop.prevent="touchKeyDown(4)">4</a></td>
          <td><a @touchstart.stop.prevent="touchKeyDown(5)">5</a></td>
          <td><a @touchstart.stop.prevent="touchKeyDown(6)">6</a></td>
          <td rowspan="4" class="enter">
            <a class="flex flex-align-center next-btn" @touchstart.stop.prevent="finish">
              <!--<span>下一题</span>-->
            </a>
          </td>
        </tr>
        <tr>
          <td><a @touchstart.stop.prevent="touchKeyDown(7)">7</a></td>
          <td><a @touchstart.stop.prevent="touchKeyDown(8)">8</a></td>
          <td><a @touchstart.stop.prevent="touchKeyDown(9)">9</a></td>
        </tr>
        <tr>
          <td colspan="2"><a @touchstart.stop.prevent="touchKeyDown(0)">0</a></td>
          <td><a @touchstart.stop.prevent="touchKeyDown('.')">.</a></td>
        </tr>
      </table>
      <table cellspacing="10" v-if="questions[currentTopicIndex] && questions[currentTopicIndex].type === 4">
        <tr>
          <td><a @touchstart.stop.prevent="touchKeyDown('<')">&lt;</a></td>
        </tr>
        <tr>
          <td><a @touchstart.stop.prevent="touchKeyDown('>')">&gt;</a></td>
        </tr>
        <tr>
          <td><a @touchstart.stop.prevent="touchKeyDown('=')">=</a></td>
        </tr>
        <tr>
          <td class="enter-long">
            <a class="flex flex-align-center next-btn" @touchstart.stop.prevent="finish">
              <!--<span>下一题</span>-->
            </a>
          </td>
        </tr>
      </table>
    </div>
    <BasePop ref="pop"></BasePop>

    <div class="result-modal" v-if="resultModalVisible">
      <div class="mask"></div>
      <div class="result-pop">
        <div class="result-tit"></div>
        <div class="result-main">
          <div class="tit pt">训练结束</div>
          <div class="result-tips">你已完成本次强化训练，请继续加油！反复训练，学习效果更佳</div>
          <div class="result-flex flex flex-align-center flex-pack-justify">
            <div class="result-item flex flex-align-center">
              <img src="@/assets/images/challenge/clock.png"/>
              <span>用时 {{timeString}}</span>
            </div>
            <div class="result-item flex flex-align-center">
              <img src="@/assets/images/challenge/right.png" />
              <span>答对 {{score}}题</span>
            </div>
          </div>
          <a class="pop-btn" @click="goBack">返回错题本</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
import { isPhoneDevice, awaitWrap } from '../../utils/common'
export default {
  name: 'Practice',
  data () {
    return {
      id: '',
      isSubmit: false,
      questions: [],
      cursorIndex: 0,
      currentTopicIndex: -1, // 当前问题下标
      result: {},
      score: 0,
      topicScore: 1, // 每题分数
      time: 0, //
      totalTime: 0,
      millisecond: 0, // 毫秒
      interval: null, // 计时器
      isFinish: false, // 是否完成答题或者答题时间结束
      t: 0, // 页面隐藏或显示的时刻
      suspend: false, // 初始答题计时器暂停状态
      isPhone: false,
      resultModalVisible: false
    }
  },
  components: {},
  async created () {
    this.id = this.$route.query.id
    this.isPhone = isPhoneDevice()
    await this.getQuestions()
    this.startMatch()
  },
  mounted () {
  },
  activated () {
  },
  destroyed () {
    this.clearVisibilityChange()
  },
  watch: {},
  computed: {
    timeString () {
      let min = parseInt(this.time / 60).toString()
      if (min.length < 2) {
        min = '0' + min
      }
      let sec = (this.time - ((parseInt(this.time / 60) * 60))).toString()
      if (sec.length < 2) {
        sec = '0' + sec
      }
      return `${min}:${sec}`
    },
    allTimeString () {
      let min = parseInt(this.result.timeAmount / 60).toString()
      if (min.length < 2) {
        min = '0' + min
      }
      let sec = (this.result.timeAmount - ((parseInt(this.result.timeAmount / 60) * 60))).toString()
      if (sec.length < 2) {
        sec = '0' + sec
      }
      return `${min}:${sec}`
    }
  },
  filters: {},
  methods: {
    // 键盘事件
    /* keyDown ({ val }) {
      if (!this.questions[this.currentTopicIndex].answers) {
        this.questions[this.currentTopicIndex].answers = []
      }
      let answers = this.questions[this.currentTopicIndex].answers
      let fraction = this.questions[this.currentTopicIndex].fraction
      let type = this.questions[this.currentTopicIndex].type
      if (answers[this.cursorIndex] && type === 4) {
        answers[this.cursorIndex] = val
        this.$set(this.questions, this.currentTopicIndex, this.questions[this.currentTopicIndex])
      } else if (answers[this.cursorIndex] && !fraction && answers[this.cursorIndex].length >= 6) {
        this.$toast('每个答案不超过6位数哦')
        return false
      } else if (fraction && answers[this.cursorIndex].length >= 3) {
        this.$toast('每个答案不超过3位数哦')
        return false
      } else {
        val = val.toString()
        if (answers[this.cursorIndex]) {
          answers[this.cursorIndex] += val
        } else {
          answers[this.cursorIndex] = val
        }
        this.$set(this.questions, this.currentTopicIndex, this.questions[this.currentTopicIndex])
      }
    }, */
    // 键盘事件
    touchKeyDown (val) {
      if (!this.questions[this.currentTopicIndex].answers) {
        this.questions[this.currentTopicIndex].answers = []
      }
      let answers = this.questions[this.currentTopicIndex].answers
      let fraction = this.questions[this.currentTopicIndex].fraction
      let type = this.questions[this.currentTopicIndex].type
      if (answers[this.cursorIndex] && type === 4) {
        answers[this.cursorIndex] = val
        this.$set(this.questions, this.currentTopicIndex, this.questions[this.currentTopicIndex])
      } else if (answers[this.cursorIndex] && !fraction && answers[this.cursorIndex].length >= 6) {
        this.$toast('每个答案不超过6位数哦')
        return false
      } else if (fraction && answers[this.cursorIndex].length >= 3) {
        this.$toast('每个答案不超过3位数哦')
        return false
      } else {
        val = val.toString()
        if (answers[this.cursorIndex]) {
          answers[this.cursorIndex] += val
        } else {
          answers[this.cursorIndex] = val
        }
        this.$set(this.questions, this.currentTopicIndex, this.questions[this.currentTopicIndex])
      }
    },
    // 更改分数答案的光标位置
    changeFractionFocusIndex (index, value) {
      if (index === this.questions[this.currentTopicIndex].topic.length - 1) {
        this.cursorIndex = value
      }
    },
    /* 删除按钮事件 */
    removeAttr () {
      if (this.questions[this.currentTopicIndex].answers) {
        let answers = this.questions[this.currentTopicIndex].answers
        if (answers[this.cursorIndex] && answers[this.cursorIndex].length > 0) {
          answers[this.cursorIndex] = answers[this.cursorIndex].substring(0, answers[this.cursorIndex].length - 1)
          this.$set(this.questions, this.currentTopicIndex, this.questions[this.currentTopicIndex])
        }
      }
    },
    /* 下一题按钮事件 */
    async finish () {
      if (!this.isSubmit) {
        // 正在提交ing 防止快速点击多次
        this.isSubmit = true
        // 停止计时
        // this.stopTiming()
        let topic = this.questions[this.currentTopicIndex].topic
        let ques = this.questions[this.currentTopicIndex]
        let _answers = [] // 最后需要提交的答案
        // 分数
        if (ques.fraction) {
          // 检查分数所有空格是否已填
          let isAllComplete = true
          for (let i = 0; i < ques.answers.length; i++) {
            if (ques.answers[i] === '') {
              this.cursorIndex = i
              isAllComplete = false
              break
            }
          }
          if (isAllComplete) {
            _answers = ques.answers
          } else {
            this.$toast('答案不能为空哦')
            this.isSubmit = false
            // this.startTiming()
            return false
          }
        } else {
          // 非分数
          let hasCurseIndexArr = []
          // 检查所有空格是否已填
          let isAllComplete = true
          topic.map((item, index) => {
            if (item === '#') {
              hasCurseIndexArr.push(index)
            }
          })
          let answers = this.questions[this.currentTopicIndex].answers
          if (answers) {
            for (let i = 0; i < hasCurseIndexArr.length; i++) {
              if (!answers[hasCurseIndexArr[i]] || (answers[hasCurseIndexArr[i]] && answers[hasCurseIndexArr[i]] === '')) {
                isAllComplete = false
                break
              }
            }
          } else {
            isAllComplete = false
          }
          if (!isAllComplete) {
            this.$toast('答案不能为空')
            this.isSubmit = false
            // this.startTiming()
            return false
          } else {
            this.cursorIndex = -1
            answers.map((item) => {
              if (item) {
                _answers.push(item)
              }
            })
          }
        }
        this.questions[this.currentTopicIndex].time = this.time
        // this.questions[this.currentTopicIndex].answers = _answers
        let currentAnswer = md5(_answers.join(','))
        if (this.questions[this.currentTopicIndex].answer === currentAnswer) {
          this.score += this.topicScore
          this.questions[this.currentTopicIndex].isRight = true
        } else {
          this.questions[this.currentTopicIndex].isRight = false
        }
        /* this.$api.match.submit({
            answer: _answers.join(','),
            exercisesId: this.questions[this.currentTopicIndex].id,
            time: useTime
          }).then((res) => {
            if (res && res.rcode === 300) {
              // 记录每题提交时间
              if (res.data.isRight) {
                this.score += this.topicScore
              }
            }
          }) */
        this.toNextTopic()
      }
    },
    // 下一题
    async toNextTopic () {
      if (this.currentTopicIndex === this.questions.length - 1) {
        /* 已完成答题 */
        this.stopTiming()
        this.finishChallenge()
      } else {
        this.currentTopicIndex = this.currentTopicIndex + 1
        this.transAnimate().then(() => {
          this.setCursorIndex()
          this.isSubmit = false
          // this.startTiming()
        })
      }
    },
    /* 设置初始光标 */
    setCursorIndex () {
      let ques = this.questions[this.currentTopicIndex]
      if (ques.fraction) {
        this.cursorIndex = 0
      } else {
        for (let i = 0; i < ques.topic.length; i++) {
          if (ques.topic[i] === '#') {
            this.cursorIndex = i
            break
          }
        }
      }
    },
    /* 切换动画 */
    transAnimate () {
      return new Promise((resolve) => {
        this.$refs['topic-list'].style.marginTop = '-' + (this.currentTopicIndex * 3) + 'rem'
        setTimeout(() => {
          resolve()
        }, 500)
      })
    },
    startTiming () {
      this.interval = setInterval(() => {
        this.time = this.time + 1
      }, 1000)
    },
    // 字符类型
    typeOfString (val) {
      return typeof (val) === 'string'
    },
    /* 停止计时 */
    stopTiming () {
      clearInterval(this.interval)
      this.interval = null
    },
    // 获取题目
    async getQuestions () {
      return new Promise(async (resolve) => {
        let params = {
          id: this.id
        }
        let res = await this.$api.wrong.strengthen(params)
        if (res && res.rcode === 300) {
          if (res.data.exercisesList.length > 0) {
            res.data.exercisesList.map(item => {
              if (item.fraction) {
                let topic = item.content.replace(/\//g, '÷')
                topic = topic.replace(/\*/g, '×')
                topic = topic.split(' ')
                for (let i = 0; i < topic.length; i++) {
                  if (topic[i].indexOf(',') !== -1) {
                    topic[i] = topic[i].split(',')
                  }
                }
                item.topic = topic
                item.answers = []
                for (let i = 0; i < item.topic[item.topic.length - 1].length; i++) {
                  item.answers[i] = ''
                }
              } else {
                let topic = item.content.split('#')
                for (let i = 0; i < topic.length; i++) {
                  topic[i] = topic[i].replace(/\//g, '÷')
                  topic[i] = topic[i].replace(/\*/g, '×')
                  if (i !== (topic.length - 1)) {
                    topic.splice(i + 1, 0, '#')
                    i++
                  }
                }
                item.topic = topic
              }
            })
          }
          this.questions = res.data.exercisesList
          this.batchId = res.data.batchId
        }
        resolve()
      })
    },
    /* 开始比赛 */
    startMatch () {
      this.currentTopicIndex = 0
      this.isFinish = false
      this.transAnimate().then(() => {
        this.setCursorIndex()
        this.startTiming()
      })
      if (this.isPhone) {
        // 加载页面状态的监听
        this.suspend = false
        this.t = 0
        // 监听页面离开  因为当页面离开时，计时器会暂停。不符合需求。所以需要计算离开期间的时间
        document.addEventListener('visibilitychange', this.visibilityChange)
      }
    },
    // 页面隐藏或显示时执行的脚本
    visibilityChange () {
      if (!this.suspend) { // 第一次进入  -- 也就是隐藏了界面
        this.suspend = true
        this.t = this.getTime()
      } else {
        let diffTime = this.getTime() + this.t
        this.time = this.time + Math.round(diffTime / 1000)
        this.suspend = false
      }
    },
    // 获取时间
    getTime () {
      return Date.now()
    },
    clearVisibilityChange () {
      document.removeEventListener('visibilitychange', this.visibilityChange)
    },
    // 结束答题，完成全部
    async finishChallenge () {
      this.clearVisibilityChange()
      let answerArray = []
      // 如果一题都没答
      for (let i = 0, l = this.questions.length; i < l; i++) {
        if (this.questions[i].answers === undefined) {
          break
        }
        // 清除answers中empty空选项
        let answers = this.questions[i].answers
        let lastAnswers = []
        for (let i = 0, l = answers.length; i < l; i++) {
          let item = answers[i]
          if (item !== undefined) {
            lastAnswers.push(item)
          }
        }
        let answerItem = {
          answer: lastAnswers.join(','),
          id: this.questions[i].id,
          wrongId: this.questions[i].wrongId
        }
        answerArray.push(answerItem)
      }
      let params = {
        answerArray,
        batchId: this.batchId
      }
      let [err, res] = await awaitWrap(this.$api.wrong.submit(params))
      this.isFinish = true
      if (err) {
        return
      }
      if (res && res.rcode === 300) {
        this.resultModalVisible = true
      }
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.isFinish) {
      next()
    } else {
      this.$refs['pop'].openModal({
        type: 'confirm',
        tit: '温馨提示',
        content: '中途退出强化练习将会不记录成绩哦，再坚持一下吧~',
        submitBtnText: '继续答题',
        cancelBtnText: '我要离去',
        showCloseBtn: false
      }).then(() => {
        next(false)
      }).catch(() => {
        next()
      })
    }
  }
}
</script>

<style scoped lang="scss" src="./Practice.scss"></style>
