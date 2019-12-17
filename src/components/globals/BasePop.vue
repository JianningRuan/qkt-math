<template>
  <div class="model" v-show="show">
    <div class="mask"></div>
    <div class="main-model" ref="basePopBox">
      <div class="close-btn" v-if="showCloseBtn" @click="cancelBtn">
        <svg-icon icon-class="close"></svg-icon>
      </div>
      <div class="model-tit">{{tit || '温馨提示'}}</div>
      <div class="model-cont" v-html="content"></div>
      <div class="model-opa flex flex-pack-justify">
        <a class="pop-btn pop-cancel" ref="cancel" @click="cancelBtn" v-show="type === 'confirm'">{{cancelBtnText || '取消'}}</a>
        <a class="pop-btn pop-submit" :class="{' flex1': type ==='alert'}" ref="submit" @click="submitBtn">{{submitBtnText || '确认'}}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasePop',
  data () {
    return {
      popBox: '',
      type: 'alert',
      submitBtnText: '确认',
      cancelBtnText: '取消',
      tit: '温馨提示',
      content: '',
      showCloseBtn: true,
      show: this.popShow
    }
  },
  props: {
    popShow: {
      type: Boolean,
      default: false
    },
    basePop: {
      type: Object,
      default () {
        return {
          type: 'alert', // alert, confirm
          submitBtnText: '确认', // 确定按钮的文字
          cancelBtnText: '取消', // 取消按钮的文字
          tit: '温馨提示',
          content: '', // 弹窗内容
          showCloseBtn: true // 是否显示关闭按钮
        }
      }
    }
  },
  components: {},
  created () {
  },
  mounted () {
    this.popBox = this.$refs.basePopBox
    if (this.basePop.type !== undefined) {
      this.type = this.basePop.type
    }
    if (this.basePop.submitBtnText !== undefined) {
      this.submitBtnText = this.basePop.submitBtnText
    }
    if (this.basePop.cancelBtnText !== undefined) {
      this.cancelBtnText = this.basePop.cancelBtnText
    }
    if (this.basePop.tit !== undefined) {
      this.tit = this.basePop.tit
    }
    if (this.basePop.content !== undefined) {
      this.content = this.basePop.content
    }
    if (this.basePop.showCloseBtn !== undefined) {
      this.showCloseBtn = this.basePop.showCloseBtn
    }
    if (this.popShow) {
      this.$nextTick(() => {
        this.setPopPosition()
      })
    }
  },
  activated () {
  },
  destroyed () {
  },
  watch: {
    basePop (newVal) {
      if (newVal.type !== undefined) {
        this.type = newVal.type
      }
      if (newVal.submitBtnText !== undefined) {
        this.submitBtnText = newVal.submitBtnText
      }
      if (newVal.cancelBtnText !== undefined) {
        this.cancelBtnText = newVal.cancelBtnText
      }
      if (newVal.tit !== undefined) {
        this.tit = newVal.tit
      }
      if (newVal.content !== undefined) {
        this.content = newVal.content
      }
      if (newVal.showCloseBtn !== undefined) {
        this.showCloseBtn = newVal.showCloseBtn
      }
      this.$nextTick(() => {
        this.setPopPosition()
      })
    },
    popShow (newVal) {
      this.show = newVal
      if (newVal) {
        this.$nextTick(() => {
          this.setPopPosition()
        })
      }
    }
  },
  computed: {},
  filters: {},
  methods: {
    cancelBtn () {
      this.$emit('cancelPop')
    },
    submitBtn () {
      this.$emit('submitPop')
    },
    openModal (otherText) {
      this.type = otherText.type || 'alert'
      this.submitBtnText = otherText.submitBtnText || '确认'
      this.cancelBtnText = otherText.cancelBtnText || '取消'
      this.tit = otherText.tit || '温馨提示'
      this.content = otherText.content || ''
      this.showCloseBtn = otherText.showCloseBtn === undefined ? true : otherText.showCloseBtn
      this.show = true

      this.$nextTick(() => {
        this.setPopPosition()
      })
      let pms = new Promise((resolve, reject) => {
        this.$nextTick(() => {
          console.log(this.$refs)
          this.$refs['submit'].addEventListener('click', () => {
            this.show = false
            resolve()
          })
          this.$refs['cancel'].addEventListener('click', () => {
            this.show = false
            reject(new Error())
          })
        })
      })
      return pms
    },
    setPopPosition () {
      // let w = this.popBox.clientWidth || this.popBox.offsetWidth
      let h = this.popBox.clientHeight || this.popBox.offsetHeight
      // let winWidth = document.documentElement.clientWidth || document.body.clientWidth
      let winHeight = document.documentElement.clientHeight || document.body.clientHeight
      this.popBox.style.top = parseInt((winHeight - h) / 2) + 'px'
      // this.popBox.style.left = parseInt((winWidth - w) / 2) + 'px'
    }
  }
}
</script>

<style scoped lang="scss">
  .model {
    position: fixed;
    z-index: 9;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    .mask {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      background: rgba(0,0,0,0.6);
    }
    .main-model {
      width: 5.9rem;
      padding: 0.48rem 0.66rem;
      box-sizing: border-box;
      position: relative;
      z-index: 10;
      margin: 0 auto;
      border-radius: 0.15rem;
      background: #fff;
      .close-btn {
        width: 0.28rem;
        height: 0.28rem;
        font-size: 0.28rem;
        color: #8bd1e7;
        position: absolute;
        top: 0.2rem;
        right: 0.2rem;
      }
      .model-tit {
        line-height: 0.62rem;
        font-size: 0.34rem;
        text-align: center;
        color: #2e3133;
        font-weight: bold;
      }
      .model-cont {
        line-height: 0.56rem;
        color: #999;
        font-size: 0.3rem;
      }
      .model-opa {
        padding-top: 0.32rem;
        .pop-btn {
          display: block;
          &.pop-cancel {
            width: 2.1rem;
            height: 0.84rem;
            border: 0.02rem solid #79d0ff;
            border-radius: 0.15rem;
            text-align: center;
            line-height: 0.84rem;
            font-size: 0.34rem;
            color: #79d0ff;
          }
          &.pop-submit {
            width: 2.14rem;
            height: 0.88rem;
            border-radius: 0.15rem;
            text-align: center;
            line-height: 0.88rem;
            font-size: 0.34rem;
            color: #fff;
            background: #79d0ff;
            box-shadow: 0 -0.08rem 0 0 #34a8e6 inset;
          }
        }
      }
    }
  }
</style>
