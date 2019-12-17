<template>
  <div class="section-cont">
    <div class="resources-box-list">
      <div class="resources-box-item" v-for="resources in resourcesList" :key="resources.id" @click="clickResource(resources)">
        <div class="cover">
          <img :src="resources.pic" />
        </div>
        <div class="cont">
          <div class="title">{{resources.title}}</div>
          <div class="msg">
            <span class="views"><svg-icon icon-class="eye" class="view-icon"></svg-icon>{{resources.count}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="home-box pt mb" v-if="resourcesList.length === 0 && !firstLoad">
      <BaseNone class="pt">
        <p slot="tips">暂无学习资源</p>
      </BaseNone>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseHomeLessonList',
  data () {
    return {}
  },
  props: {
    resourcesList: {
      type: Array,
      default: () => []
    },
    firstLoad: {
      type: Boolean,
      default: true
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
    clickResource (val) {
      this.$emit('goResource', val)
    }
  }
}
</script>

<style scoped lang="scss" src="./BaseHomeLessonList.scss"></style>
