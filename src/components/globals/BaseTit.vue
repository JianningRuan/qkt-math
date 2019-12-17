<template>
  <div class="inner-head">
    <div class="head-tit ellipsis">{{tit !=='' ? tit :this.$route.meta.title ? this.$route.meta.title : '' }}</div>
    <a class="back-btn" @click="goBack" v-if="showBack">
      <svg-icon icon-class="left"></svg-icon>
    </a>
    <div class="head-more">
      <slot name="nav"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseTit',
  data () {
    return {}
  },
  props: {
    tit: {
      type: String,
      default: '',
      required: false
    },
    showBack: {
      type: Boolean,
      default: true,
      required: false
    },
    // 是否执行默认的返回
    isBack: {
      type: Boolean,
      default: true,
      required: false
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
  .inner-head {
    background: #ffffff;
    height: 0.88rem;
    padding-left: 0.34rem;
    padding-right: 0.34rem;
    // position: relative;
    line-height: 0.88rem;
    text-align: center;
    border-bottom: 1px solid #ddd;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
    .head-tit {
      font-size: 0.34rem;
      color: #212837;
      font-weight: bold;
    }
    .back-btn {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0.88rem;
      height: 0.88rem;
      color: #212837;
      font-size: 0.34rem;
      &:active {
        background: #f6f6f6;
      }
    }
    .head-more {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
</style>
