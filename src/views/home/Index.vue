<template>
  <div class="index">
    <!--头部-->
    <div class="main message-box flex flex-pack-justify flex-align-center">
      <div class="user-box flex1 flex" @click="goMyCenter">
        <div class="user-head">
          <img :src="userInfo.pic || './images/stu-head.png'" />
        </div>
        <div class="user-info flex flex-v flex-pack-around">
          <h2>{{userInfo.userName}}</h2>
          <!--<div class="level-box">
            <div class="level-progress" :style="{width: (userInfo.academicValue - userInfo.lowerValue) / (userInfo.upperValue - userInfo.lowerValue) * 100 + '%'}"></div>
            <div class="level-name">LV{{userInfo.levelNum}}</div>
          </div> -->
        </div>
      </div>
      <!-- <a class="bee-btn" @click="goBee"></a> -->
      <router-link :to="{name:'checkin'}" class="calendar-btn flex flex-align-center flex-pack-center"><svg-icon class="calendar" icon-class="calendar"></svg-icon><span>签到</span></router-link>
    </div>
    <!--头部-end-->
    <router-view/>
    <BaseIndexTab/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BaseIndexTab from '@/components/baseIndexTab/BaseIndexTab.vue'
export default {
  name: 'Index',
  data () {
    return {}
  },
  components: {
    BaseIndexTab
  },
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
      'userInfo'
    ])
  },
  filters: {},
  methods: {
    goMyPower () {
      this.$router.push({
        path: '/power'
      })
    },
    goMyCenter () {
      this.$router.push({
        path: '/myHome'
      })
    }
  }
}
</script>

<style scoped lang="scss" src="./Index.scss"></style>
