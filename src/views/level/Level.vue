<template>
  <div>
    <BaseInnerPageHead :tit="tit" />
    <div class="main">
      <div class="my-info-wrapper">
        <div class="light"></div>
        <div class="ribbon-bg"></div>
        <div class="head-box">
          <div class="head-pic">
            <img :src="userInfo.pic || './images/stu-head.png'" />
          </div>
        </div>
        <div class="ribbon">Lv{{userInfo.levelNum}}:{{userInfo.levelName}}</div>
        <div class="my-level">当前学力值：{{userInfo.academicValue}}/{{userInfo.upperValue}}</div>
      </div>
      <div class="home-box level-box mb">
        <h2>如何获得学力值？</h2>
        <p>· 每天学习完成任务即可获得学力值</p>
        <p class="mb">· 完成7天学习任务可获得额外的学力值奖励哦~</p>
        <h2>等级说明</h2>
        <div class="level-list">
          <div class="level-item flex">
            <div class="flex1 level">等级</div>
            <div class="flex2 name">头衔</div>
            <div class="flex2 hp">学力值</div>
          </div>
          <div class="level-item flex" v-for="level in levelList" :key="level.num">
            <div class="flex1 level">Lv{{level.num}}</div>
            <div class="flex2 name">{{level.name}}</div>
            <div class="flex2 hp">{{level.lower}}-{{level.upper}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Level',
  data () {
    return {
      tit: '等级说明',
      levelList: []
    }
  },
  components: {},
  created () {
  },
  mounted () {
    this.getLevelList()
  },
  activated () {
  },
  destroyed () {
  },
  watch: {},
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  filters: {},
  methods: {
    getLevelList () {
      this.$api.power.level().then((res) => {
        if (res.rcode === 300) {
          let levelList = res.data.levelList
          this.levelList = levelList.slice(0, 9)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss" src="./Level.scss"></style>
