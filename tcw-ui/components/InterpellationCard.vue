<template lang="pug">
  .intCard.pb3.bb.b--moon-gray.mb3
    .flex-l.flex-row-reverse.justify-between.mb3
      .f6.gray {{sayit.date}}
      .mt3.mt0-l
        .f6.gray.mb1 質詢議員： {{councilor.name}}
        .f6.gray 選舉區域： {{district}}
    h2.f4.f3-l.fw6 {{sayit.summary}}
    p {{sayit.say}}
    .flex-l.justify-between
      .f6 來源出處： {{roundLabel}}
      .dn.light-blue.f6 閱讀更多
</template>
<script>
import { DEFAULT_ROUND } from '~/libs/defs'
import { number2zh } from '~/libs/utils'
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
    district () {
      return `${this.councilor.districtTitle} | ${this.councilor.townList.join('.')}`
    },
    roundLabel () {
      const councilorRound = number2zh(this.sayit.councilorRound || DEFAULT_ROUND)
      const meetingRound = number2zh(this.sayit.round)
      return `${councilorRound}屆第${meetingRound}次${this.sayit.type}`
    }
  }
}
</script>
<style lang="scss" scoped>
.intCard {}
</style>
