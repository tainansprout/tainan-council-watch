<template lang="pug">
  .intCard.pointer(@click="gotoPdf")
    .intCard__meta.flex-ns.flex-row-reverse.justify-between.ls3
      .f6.gray {{sayit.date}}
      .mt3.mt0-ns
        .f6.gray.mb1 質詢議員： {{councilor.name}}
        .f6.gray 選舉區域： {{district}}
    h2.f4.f3-ns.fw5.ls4 {{sayit.summary}}
    p.ls2 {{sayit.say}}...
    p.ls2.f6.gray(v-if="sayit.editorNote") 新芽補充： {{sayit.editorNote}}
    button.intCard__src.plainButton.flex.justify-between.w-100(@click.stop="gotoPdf")
      .flex.items-center.f6.ls1
        span 來源出處：
        .intCard__round {{roundLabel}}
      .flex.items-center.ls2.dn
        .intCard__more.underline.dn.db-ns 閱讀更多
        tcw-icon.intCard__moreIcon.dn.db-ns.ml2(icon="chevron-right-black")
        tcw-icon.intCard__moreIcon.db.dn-ns.ml2(icon="chevron-right-blue")
    interpellation-src-viewer(
      :start-page="sayit.src[0]"
      :councilor-round="sayit.councilorRound"
      :meeting-round="sayit.round"
      :highlight="sayit.say"
    )
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

  &__round {
    color: $blue;
    text-decoration: underline;
    text-decoration-color: $blue;
  }

  p {
    margin: 0.75rem 0;

    &:last-of-type {
      margin-bottom: 1.25rem;
    }
  }

  @include not-small-screen {
    padding-bottom: 4rem;
    margin-bottom: 4rem;

    &__meta {
      margin-bottom: 1.25rem;
    }

    &__round {
      color: $black;
      text-decoration: none;
    }

    p {
      margin: 1rem 0;

      &:last-of-type {
        margin-bottom: 2.25rem;
      }
    }

    &:hover {
      .intCard__src {
        .intCard__more {
          color: $blue;
          text-decoration-color: $blue;
        }
        .intCard__moreIcon {
          &.db-ns {
            display: none;
          }
          &.dn-ns {
            display: block;
          }
        }
      }
    }
  }
}
</style>
