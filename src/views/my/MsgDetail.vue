<template>
  <div class="white-wrapper">
    <BaseTit></BaseTit>
    <div class="main">
      <div class="msg-tit">{{msg.title}}</div>
      <div class="msg-info">{{msg.author}}<span class="time">{{msg.createTimestamp | moment}}</span></div>
      <div class="msg-cont" v-html="msg.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MsgDetail',
  data () {
    return {
      id: '',
      msg: {}
    }
  },
  components: {},
  created () {
    this.id = this.$route.query.id
  },
  mounted () {
    this.getMessageInfo()
  },
  activated () {
  },
  destroyed () {
  },
  watch: {},
  computed: {},
  filters: {},
  methods: {
    getMessageInfo () {
      const params = {
        id: this.id
      }
      this.$api.my.getMessageInfo(params).then((res) => {
        if (res.rcode === 300) {
          this.msg = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="scss" src="./MsgDetail.scss"></style>
