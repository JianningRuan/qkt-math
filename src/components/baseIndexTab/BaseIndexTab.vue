<template>
  <div class="nav flex flex-pack-around flex-align-center">
    <a class="nav-item" :class="{'current': indexTab === 0}" @click="clickTab(0)">
      <span class="nav-icon play-icon"></span>
      <p>学一学</p>
    </a>
    <a class="nav-item" :class="{'current': indexTab === 1}" @click="clickTab(1)">
      <span class="nav-icon practice-icon"></span>
      <p>练一练</p>
    </a>
    <a class="nav-item" :class="{'current': indexTab === 2}" @click="clickTab(2)">
      <span class="nav-icon find-icon"></span>
      <p>逛一逛</p>
    </a>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'BaseIndexTab',
  data () {
    return {}
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
  computed: {
    ...mapGetters([
      'indexTab'
    ])
  },
  filters: {},
  methods: {
    clickTab (val) {
      if (this.indexTab === val) {
        return
      }
      this.SET_INDEX_TAB(val)
      if (val === 0) {
        this.$router.push({
          path: '/index/home'
        })
      } else if (val === 1) {
        this.$router.push({
          path: '/index/practiceHome/mathPractice'
        })
      } else {
        this.$router.push({
          path: '/index/findHome'
        })
      }
    },
    ...mapMutations([
      'SET_INDEX_TAB'
    ])
  }
}
</script>

<style scoped lang="scss" src="./BaseIndexTab.scss"></style>
