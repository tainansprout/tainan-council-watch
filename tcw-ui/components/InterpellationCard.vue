<template lang="pug">
  .intCard.pb3.bb.b--moon-gray.mb3
    .flex-l.flex-row-reverse.justify-between.mb3
      .f6.gray {{sayit.date}}
      .mt3.mt0-l
        .f6.gray.mb1 質詢議員： {{councilor.name}}
        .f6.gray 選舉區域： {{constituency}}
    h2.f4.f3-l.fw6 {{sayit.summary}}
    p {{sayit.say}}
    .flex-l.justify-between
      .f6 來源出處：第三屆第？次臨時會
      .dn.light-blue.f6 閱讀更多
</template>
<script>
export default {
  props: {
    councilorMap: {
      type: Object,
      required: true
    },
    sayit: {
      type: Object,
      required: true
    }
  },
  computed: {
    councilor () {
      return this.councilorMap[this.sayit.councilorId]
    },
    constituency () {
      return `${this.councilor.areaTitle} | ${this.councilor.areaList.join('.')}`
    }
  }
}
</script>
<style lang="scss" scoped>
.intCard {}
</style>
