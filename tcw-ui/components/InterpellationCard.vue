<template lang="pug">
  .intCard
    .intCard__meta.flex-ns.flex-row-reverse.justify-between.ls3
      .f6.gray {{sayit.date}}
      .mt3.mt0-ns
        .f6.gray.mb1 質詢議員： {{councilor.name}}
        .f6.gray 選舉區域： {{district}}
    h2.f4.f3-ns.fw5.ls4 {{sayit.summary}}
    p.ls2 {{sayit.say}}...
    button.intCard__src.plainButton.pointer.flex.justify-between.w-100(@click="gotoPdf")
      .f6.ls1 來源出處： {{roundLabel}}
      .flex.ls2
        .intCard__more.underline.dn.db-ns 閱讀更多
        tcw-icon.ml2(icon="chevron-right-gray")
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
  },
  methods: {
    gotoPdf () {
      alert('待做')
    }
  }
}
</script>
<style lang="scss" scoped>
.intCard {
  border-bottom: 1px solid $gray-9;
  padding-bottom: 1.25rem;
  margin-bottom: 1.25rem;

  &__meta {
    margin-bottom: 0.75rem;
  }

  p {
    margin: 0.75rem 0 1.25rem;
  }

  @include not-small-screen {
    padding-bottom: 4rem;
    margin-bottom: 4rem;

    &__meta {
      margin-bottom: 1.25rem;
    }

    p {
      margin: 1rem 0 2.25rem;
    }

    &__src {
      &:hover {
        .intCard__more {
          color: $blue;
          text-decoration-color: $blue;
        }
      }
    }
  }
}
</style>
