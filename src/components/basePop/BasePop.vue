<!--请使用globals里边的组件。此组件作废-->
<template>
  <div class="model" v-show="popShow">
    <div class="mask"></div>
    <div class="main-model" ref="basePopBox">
      <div class="close-btn" v-if="showCloseBtn" @click="cancelBtn">
        <svg-icon icon-class="close"></svg-icon>
      </div>
      <div class="model-tit">{{tit || '温馨提示'}}</div>
      <div class="model-cont" v-html="content"></div>
      <div class="model-opa flex flex-pack-justify" v-if="type === 'confirm'">
        <a class="pop-btn pop-cancel" @click="cancelBtn">{{cancelBtnText || '取消'}}</a>
        <a class="pop-btn pop-submit" @click="submitBtn">{{submitBtnText || '确认'}}</a>
      </div>
      <div class="model-opa flex flex-pack-justify" v-else>
        <a class="pop-btn pop-submit flex1" @click="submitBtn">{{submitBtnText || '确认'}}</a>
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
      showCloseBtn: true
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
        // let w = this.popBox.clientWidth || this.popBox.offsetWidth
        let h = this.popBox.clientHeight || this.popBox.offsetHeight
        // let winWidth = document.documentElement.clientWidth || document.body.clientWidth
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight
        this.popBox.style.top = parseInt((winHeight - h) / 2) + 'px'
        // this.popBox.style.left = parseInt((winWidth - w) / 2) + 'px'
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
        // let w = this.popBox.clientWidth || this.popBox.offsetWidth
        let h = this.popBox.clientHeight || this.popBox.offsetHeight
        // let winWidth = document.documentElement.clientWidth || document.body.clientWidth
        let winHeight = document.documentElement.clientHeight || document.body.clientHeight
        this.popBox.style.top = parseInt((winHeight - h) / 2) + 'px'
        // this.popBox.style.left = parseInt((winWidth - w) / 2) + 'px'
      })
    },
    popShow (newVal) {
      if (newVal) {
        this.$nextTick(() => {
          // let w = this.popBox.clientWidth || this.popBox.offsetWidth
          let h = this.popBox.clientHeight || this.popBox.offsetHeight
          // let winWidth = document.documentElement.clientWidth || document.body.clientWidth
          let winHeight = document.documentElement.clientHeight || document.body.clientHeight
          this.popBox.style.top = parseInt((winHeight - h) / 2) + 'px'
          // this.popBox.style.left = parseInt((winWidth - w) / 2) + 'px'
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
    }
  }
}
</script>

<style scoped lang="scss" src="./BasePop.scss"></style>
