<template>
  <div class="blue-wrapper">
    <BaseTit></BaseTit>
    <div class="main">
      <div class="home-box error-box flex flex-align-center flex-pack-justify" @click="goMathBook">
        <div class="book flex flex-align-center">
          <div class="book-avatar"></div>
          <div class="book-cont flex flex-v flex-pack-around">
            <h3 class="tit">练口算错题本</h3>
            <p>有<em>{{arithmeticWrong}}</em>个错题知识点需要复习</p>
          </div>
        </div>
        <svg-icon class="arrow-icon" icon-class="right"></svg-icon>
      </div>
      <!--<div class="home-box error-box flex flex-align-center flex-pack-justify">
        <div class="book flex flex-align-center">
          <div class="book-avatar"></div>
          <div class="book-cont flex flex-v flex-pack-around">
            <h3 class="tit">背单词错题本</h3>
            <p>有<em>10</em>个高频出错单词需要复习</p>
          </div>
        </div>
        <svg-icon class="arrow-icon" icon-class="right"></svg-icon>
      </div>-->
      <!--<div class="home-box error-box flex flex-align-center flex-pack-justify">
        <div class="book flex flex-align-center">
          <div class="book-avatar"></div>
          <div class="book-cont flex flex-v flex-pack-around">
            <h3 class="tit">识生词错题本</h3>
            <p>有<em>10</em>个高频出错生词需要复习</p>
          </div>
        </div>
        <svg-icon class="arrow-icon" icon-class="right"></svg-icon>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorReport',
  data () {
    return {
      arithmeticWrong: 0
    }
  },
  components: {},
  created () {
    this.getWrongInfo()
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
    getWrongInfo () {
      this.$api.my.getWrongInfo().then((res) => {
        if (res.rcode === 300) {
          this.arithmeticWrong = res.data.arithmeticWrong
        }
      })
    },
    goMathBook () {
      this.$router.push({
        path: '/book'
      })
    }
  }
}
</script>

<style scoped lang="scss" src="./ErrorReport.scss"></style>
