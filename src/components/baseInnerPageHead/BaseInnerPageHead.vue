<!--请使用globals里边的组件。此组件作废-->
<template>
  <div class="inner-head">
    <div class="head-tit ellipsis">{{tit}}</div>
    <a class="back-btn" @click="goBack" v-if="showBack"></a>
    <div class="head-more">
      <slot name="nav"></slot>
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
    showBack: {
      type: Boolean,
      default: true
    },
    // 是否执行默认的返回
    isBack: {
      type: Boolean,
      default: true
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

<style scoped lang="scss" src="./BaseInnerPageHead.scss"></style>
