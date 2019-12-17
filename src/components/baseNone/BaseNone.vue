<!--请使用globals里边的组件。此组件作废-->
<template>
  <div class="none-wrapper pb">
    <div class="none-pic mb"></div>
    <div class="none-tips"><slot name="tips"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'BaseNone',
  data () {
    return {}
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

<style scoped lang="scss" src="./BaseNone.scss"></style>
