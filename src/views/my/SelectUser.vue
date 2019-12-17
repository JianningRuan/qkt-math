<template>
  <div class="white-wrapper">
    <BaseTit></BaseTit>
    <div class="main">
      <div class="user-list">
        <div class="user flex flex-pack-justify flex-align-center" v-for="user in userList" :key="user.id" @click="changeUser(user)">
          <div class="user-info flex flex-align-center">
            <div class="user-avatar">
              <img :src="user.pic || './images/stu-head.png'" />
            </div>
            <span>{{user.name}}</span>
          </div>
          <div class="selected" :class="[user.use ? 'current' : '']">
            <svg-icon icon-class="great" v-if="user.use"></svg-icon>
          </div>
        </div>
      </div>
      <!-- <a class="create-btn flex flex-align-center flex-pack-center">
        <svg-icon icon-class="plus"></svg-icon>
        <span>添加用户</span>
      </a> -->
    </div>
  </div>
</template>

<script>
import { setToken } from '../../utils/auth'
import { mapMutations } from 'vuex'
export default {
  name: 'SelectUser',
  data () {
    return {
      userList: []
    }
  },
  components: {},
  created () {
  },
  mounted () {
    this.getStudentList()
  },
  activated () {
  },
  destroyed () {
  },
  watch: {},
  computed: {},
  filters: {},
  methods: {
    getStudentList () {
      this.$api.my.getStudentList().then((res) => {
        if (res.rcode === 300) {
          this.userList = res.data
        }
      })
    },
    changeUser (user) {
      if (user.use) {
        return
      }
      this.$dialog.confirm({
        message: `是否切换到${user.name}`
      }).then(() => {
        // on confirm
        let params = {
          changeId: user.id,
          clientId: 'lite',
          secret: 'qkt',
          isOA: false
        }
        this.$api.my.change(params).then(res => {
          if (res.rcode === 300) {
            setToken(res.data.access_token)
            this.SET_TOKEN(res.data.access_token)
            this.SET_USER_INFO({})
            this.$router.replace({
              path: '/'
            })
          }
        })
      }).catch(() => {
        // on cancel
      })
    },
    ...mapMutations([
      'SET_TOKEN', 'SET_USER_INFO'
    ])
  }
}
</script>

<style scoped lang="scss" src="./SelectUser.scss"></style>
