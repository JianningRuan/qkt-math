<template>
  <div>
    <div class="practice-tab flex flex-align-center flex-pack-around">
      <a class="practice-tab-item" :class="{'current' : practiceTab === 0}" @click="clickTab(0)">练口算</a>
      <a class="practice-tab-item" :class="{'current' : practiceTab === 1}" @click="clickTab(1)">背单词</a>
      <a class="practice-tab-item" :class="{'current' : practiceTab === 2}" @click="clickTab(2)">识生词</a>
      <a class="practice-tab-item" :class="{'current' : practiceTab === 3}" @click="clickTab(3)">背古诗</a>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  name: 'PracticeHome',
  data () {
    return {}
  },
  components: {},
  created () {
    this.SET_INDEX_TAB(1)
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
      'practiceTab'
    ])
  },
  filters: {},
  methods: {
    clickTab (val) {
      if (this.practiceTab === val) {
        return
      }
      // this.SET_PRACTICE_TAB(val)
      if (val === 0) {
        this.SET_PRACTICE_TAB(val)
        this.$router.push({
          path: '/index/practiceHome/mathPractice'
        })
      } else if (val === 1) {
        this.SET_PRACTICE_TAB(val)
        this.$router.push({
          path: '/index/practiceHome/wordPractice'
        })
      } else if (val === 2) {
        this.SET_PRACTICE_TAB(val)
        this.$router.push({
          path: '/index/practiceHome/cnWordPractice'
        })
      } else {
        this.$dialog.alert({
          message: '暂未开放，敬请期待'
        })
      }
    },
    ...mapMutations([
      'SET_INDEX_TAB', 'SET_PRACTICE_TAB'
    ])
  }
}
</script>

<style lang="scss" scoped src="./PracticeHome.scss"></style>
