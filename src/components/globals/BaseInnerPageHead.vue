<template>
  <div class="inner-head-wrapper" :class="bg ? 'bg': ''">
    <div class="inner-head">
      <div class="head-tit ellipsis">{{tit !=='' ? tit :this.$route.meta.title ? this.$route.meta.title : '' }}</div>
      <a class="back-btn" :class="{'home-btn': backBtnType === 'home'}" @click.stop.prevent="goBack" v-if="showBack"></a>
      <div class="head-more">
        <slot name="nav"></slot>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'BaseInnerPageHead',
  data () {
    return {}
  },
  props: {
    tit: {
      type: String,
      default: ''
    },
    bg: {
      type: Boolean,
      default: true
    },
    showBack: {
      type: Boolean,
      default: true
    },
    // 是否执行默认的返回
    isBack: {
      type: Boolean,
      default: true
    },
    backBtnType: {
      type: String,
      default: 'back'
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
    goBack () {
      this.$emit('goBack')
      if (!this.isBack) {
        return
      }
      if (window.history.length <= 1) {
        this.$router.push({
          path: '/'
        })
        return false
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .inner-head-wrapper {
    height: 0.68rem;
    padding: 0.32rem 0.48rem;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    &.bg {
      background: #8cd2f6;
    }
  }
  .inner-head {
    height: 0.68rem;
    //margin-left: 0.48rem;
    //margin-right: 0.48rem;
    //margin-top: 0.32rem;
    //margin-bottom: 0.32rem;
    position: relative;
    line-height: 0.68rem;
    text-align: center;
    .head-tit {
      max-width: 60%;
      margin: 0 auto;
      color: #fff;
      font-weight: 500;
      font-size: 0.4rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .back-btn {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0.68rem;
      height: 0.68rem;
      background: url("~@/assets/images/common/back-btn.png") left top no-repeat;
      background-size: 1.46rem 0.68rem;
      &:active {
        background: url("~@/assets/images/common/back-btn.png") right top no-repeat;
        background-size: 1.46rem 0.68rem;
      }
      &.home-btn {
        background: url("~@/assets/images/common/home-btn.png") left top no-repeat;
        background-size: 1.46rem 0.68rem;
        &:active {
          background: url("~@/assets/images/common/home-btn.png") right top no-repeat;
          background-size: 1.46rem 0.68rem;
        }
      }
    }
    .head-more {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
</style>
