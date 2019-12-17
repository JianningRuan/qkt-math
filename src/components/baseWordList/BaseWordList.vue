<template>
  <div class="audio-list">
    <div class="audio-item flex flex-align-center" v-for="(word, index) in wordsList" :key="index" @click="showCnWord(index)">
      <a class="audio-btn" :class="{'play': word.playState}" @click.stop.prevent="playAudio(word, index)"></a>
      <div class="word flex1 flex flex-v flex-pack-center">
        <h2>{{word.word}}</h2>
        <p v-if="!isJoin || currentIndex === index">{{word.wordcn}}</p>
      </div>
      <!--<div class="word-type">未学习</div>-->
      <div v-if="isJoin" class="word-type" :class="{'study': word.status === 1}">{{statusArr[word.status]}}</div>
      <div v-if="showErrorNum" class="word-type study">{{word.errorNum}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseWordList',
  data () {
    return {
      statusArr: ['未学习', '复习中', '已掌握'],
      currentIndex: ''
    }
  },
  props: {
    wordsList: {
      type: Array,
      default: () => []
    },
    isJoin: {
      type: Boolean,
      default: false
    },
    clickShow: {
      type: Boolean,
      default: false
    },
    showErrorNum: {
      type: Boolean,
      default: false
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
  watch: {},
  computed: {},
  filters: {},
  methods: {
    playAudio (val, index) {
      this.$emit('playAudio', val, index)
    },
    showCnWord (index) {
      if (this.clickShow) {
        this.currentIndex = index
      }
    }
  }
}
</script>

<style scoped lang="scss" src="./BaseWordList.scss"></style>
