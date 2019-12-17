<template>
  <div>
    <BaseInnerPageHead :tit="tit" />
    <div class="main">
      <div class="home-box none-box" v-if="list.length === 0">
        <BaseNone class="none pt">
          <p slot="tips">这里没有错题，请继续保持哦</p>
        </BaseNone>
      </div>
      <van-list v-model="loading"
                :finished="finished"
                :finished-text="finishText"
                @load="getExercises">
        <div v-if="list.length !== 0">
          <!--错题-->
          <div class="home-box book-detail mb" v-for="(item, index) in list" :key="index">
            <div class="tit-info">{{item.questions}}</div>
            <div class="flex">
              <div class="flex1 book-answer right">正确答案:
                <span v-if="item.fraction">{{item.properArr[0]}}<sup>{{item.properArr[1]}}</sup>&frasl;<sub>{{item.properArr[2]}}</sub></span>
                <span v-else>{{item.proper}}</span>
              </div>
              <div class="flex1 book-answer wrong">你的答案:
                <span v-if="item.fraction">{{item.answerArr[0]}}<sup>{{item.answerArr[1]}}</sup>&frasl;<sub>{{item.answerArr[2]}}</sub></span>
                <span v-else>{{item.answer}}</span>
              </div>
            </div>
          </div>
          <!--错题-end-->
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookDetail',
  data () {
    return {
      tit: '',
      id: '',
      offSet: 0,
      offSize: 10,
      loading: false,
      finished: false,
      list: [],
      finishText: '没有更多了'
    }
  },
  components: {},
  created () {
    this.id = this.$route.query.id
    this.tit = this.$route.query.tit
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
    getExercises () {
      let params = {
        id: this.id,
        offSet: this.offSet,
        offSize: this.offSize
      }
      this.$api.wrong.exercises(params).then((res) => {
        if (res.rcode === 300) {
          let list = res.data.list
          list.forEach((value) => {
            if (value.fraction) {
              let answerArr = value.answer.split(',')
              if (answerArr.length === 2) {
                answerArr.unshift('')
              }
              value.answerArr = answerArr
              let properArr = value.proper.split(',')
              if (properArr.length === 2) {
                properArr.unshift('')
              }
              value.properArr = properArr
            }
            if (value.questions) {
              value.questions = value.questions.replace('#', '__')
              value.questions = value.questions.replace(/\//g, '÷')
              value.questions = value.questions.replace(/\*/g, '×')
            }
          })
          this.list = this.list.concat(list)
          this.loading = false
          this.offSet++
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
    }
  }
}
</script>

<style scoped lang="scss" src="./BookDetail.scss"></style>
