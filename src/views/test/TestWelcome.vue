<template>
  <div class="fever flex flex-v">
    <BaseInnerPageHead :showBack="showBack" :bg="false" />
    <div class="flex1"></div>
    <a class="start-btn" @click="goTest">开始测试</a>
  </div>
</template>

<script>
import { bool } from '../../utils/common'
export default {
  name: 'TestWelcome',
  data () {
    return {
      showBack: true,
      first: false
    }
  },
  components: {},
  created () {
    let first = this.$route.query.first
    if (first !== undefined) {
      this.first = bool(first)
    }
    this.showBack = !this.first
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
      this.$router.push({
        path: '/'
      })
    },
    goTest () {
      this.$router.push({
        path: '/test'
      })
    }
  }
  /* beforeRouteLeave (to, from, next) {
    if (to.fullPath === '/index/home' || to.fullPath === '/test') {
      return next()
    } else {
      next('/index/home')
    }
  } */
}
</script>

<style scoped lang="scss" src="./TestWelcome.scss"></style>
