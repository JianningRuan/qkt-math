<template>
  <div>
    <BaseInnerPageHead :tit="tit" />
    <div class="main">
      <div class="home-box about-box">
        <div class="logo"></div>
        <div class="about">
          <p>优教口算是一款口算能力训练与提升小工具，适合小学的学生使用，帮助孩子锻炼出又快又准的数学计算能力。同时，平台根据测评给予学生定制科学学习计划，通过学习-练习-测评-提升循环，全面提升孩子学习能力。<br/><br/>
            我们致力于探索更多好玩的学习方法，如果你有更多有趣的想法和建议，欢迎通过【意见反馈】给我们留言。<br/><br/>
            祝你在学习的道路上能取得更大的进步。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      tit: '关于我们'
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
  methods: {}
}
</script>

<style scoped lang="scss" src="./About.scss"></style>
