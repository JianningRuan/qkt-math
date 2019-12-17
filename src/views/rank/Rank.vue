<template>
  <div class="wrapper">
    <div class="rank-wrapper flex flex-v">
      <BaseInnerPageHead :tit="tit" class="rank-tit" />
      <div class="rank-top">
        <h2>{{rankName[tabIndex]}}</h2>
        <p>{{myRank.rownum === 1 ? '你真棒！恭喜你荣登榜首' : '距离上一名就差一点点啦!'}}</p>
      </div>
      <div class="rank-tab flex">
        <div class="tab-item flex1 flex flex-pack-center flex-align-center" :class="{'current' : tabIndex === 0}" @click="setTabIndex(0)"><span class="star"></span><em>世界榜</em></div>
        <div class="tab-item flex1 flex flex-pack-center flex-align-center" :class="{'current' : tabIndex === 1}" @click="setTabIndex(1)"><span class="star"></span><em>学校榜</em></div>
        <div class="tab-item flex1 flex flex-pack-center flex-align-center" :class="{'current' : tabIndex === 2}" @click="setTabIndex(2)"><span class="star"></span><em>等级榜</em></div>
      </div>
      <div class="rank-cont pb mb flex1" ref="rank">
        <div class="rank-tab-cont">
          <BaseNone class="pt" v-if="rankList.length === 0">
            <p slot="tips">暂无排名，快去学习抢占榜单吧</p>
          </BaseNone>
          <div class="rank-list" v-else>
            <div class="rank-item flex flex-align-center" v-for="(rank, index) in rankList" :key="index">
              <div class="medal first" v-if="index === 0"></div>
              <div class="medal second" v-else-if="index === 1"></div>
              <div class="medal third" v-else-if="index === 2"></div>
              <div class="rank-num" v-else>{{index + 1}}</div>
              <div class="head-pic ml">
                <img :src="rank.pic || './images/stu-head.png'" />
              </div>
              <div class="user-info flex1 flex flex-v flex-pack-justify">
                <div class="name">{{rank.stuname}}</div>
                <div class="level">Lv{{rank.levelnum}}:{{rank.levelname}}</div>
              </div>
              <div class="academic">{{rank.academic}}</div>
              <div class="flash-icon"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="my-rank flex flex-align-center mb">
        <div class="head-pic">
          <img :src="myRank.pic || './images/stu-head.png'" />
        </div>
        <div class="user-info flex1 flex flex-v flex-pack-justify">
          <div class="name">{{myRank.rownum > 50 ? '未上榜' : myRank.rownum}}</div>
          <div class="level">我的排名</div>
        </div>
        <div class="academic">{{myRank.academic}}</div>
        <div class="flash-icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rank',
  data () {
    return {
      tit: '排行榜',
      tabIndex: 0,
      rankName: ['世界榜', '学校榜', '等级榜'],
      rankList: [],
      myRank: {},
      worldRank: [],
      myWorldRank: {},
      schoolRank: [],
      mySchoolRank: {},
      levelRank: [],
      myLevelRank: {}
    }
  },
  components: {},
  created () {
  },
  async mounted () {
    await this.getWorldRank()
    this.setTabIndex(0)
    this.getSchoolRank()
    this.getLevelRank()
  },
  activated () {
  },
  destroyed () {
  },
  watch: {},
  computed: {},
  filters: {},
  methods: {
    setTabIndex (index) {
      this.tabIndex = index
      switch (index) {
        case 0:
          this.rankList = this.worldRank
          this.myRank = this.myWorldRank
          break
        case 1:
          this.rankList = this.schoolRank
          this.myRank = this.mySchoolRank
          break
        default:
          this.rankList = this.levelRank
          this.myRank = this.myLevelRank
      }
      let rank = this.$refs.rank
      rank.scrollTop = 0
    },
    async getWorldRank () {
      let res = await this.$api.rank.world()
      if (res.rcode === 300) {
        this.worldRank = res.data.rankList
        this.myWorldRank = res.data.myRank
      }
    },
    getSchoolRank () {
      this.$api.rank.school().then((res) => {
        if (res.rcode === 300) {
          this.schoolRank = res.data.rankList
          this.mySchoolRank = res.data.myRank
        }
      })
    },
    getLevelRank () {
      this.$api.rank.level().then((res) => {
        if (res.rcode === 300) {
          this.levelRank = res.data.rankList
          this.myLevelRank = res.data.myRank
        }
      })
    }
  }
}
</script>

<style scoped lang="scss" src="./Rank.scss"></style>
