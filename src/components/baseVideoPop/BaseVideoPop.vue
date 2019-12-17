<template>
  <div class="video-box" v-if="show">
    <van-overlay :show="true" :z-index="10" />
    <a class="close-btn" @click="closeVideoPop">
      <svg-icon icon-class="close"></svg-icon>
    </a>
    <div class="video-cont">
      <video
        ref="video"
        controls="controls"
        controlslist="nodownload"
        name="media"
        width="100%"
        :src="videoUrl"
      >
        <source :src="videoUrl" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseVideoPop',
  data () {
    return {
      show: false
    }
  },
  props: {
    videoUrl: {
      type: String,
      default: ''
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
  watch: {
    videoUrl (newVal) {
      if (newVal !== '') {
        this.show = true
      } else {
        this.show = false
      }
    }
  },
  computed: {},
  filters: {},
  methods: {
    closeVideoPop () {
      this.$emit('closeVideoPop')
    }
  }
}
</script>

<style scoped lang="scss" src="./BaseVideoPop.scss"></style>
