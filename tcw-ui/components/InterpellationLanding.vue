<template lang="pug">
  .intLanding
    .intLanding__stats.stats
      h2.f4.f3-l.mb3 質詢局處
      button.stats__item.ba.b--moon-gray.flex-l.justify-between.f5.f4-l.w-100-l.pa2.pv3-l.ph0-l.mr2.mb2.ma0-l(
        v-for="org in stats.org"
        :key="org.name"
      )
        span.mr2.mr0-l {{org.name}}
        span {{org.count}}
    .intLanding__main.mt3
      interpellation-card(
        v-for="(sayit, index) in sayList"
        :key="index"
        :councilor-map="councilorMap" :sayit="sayit")
</template>
<script>
export default {
  props: {
    councilorMap: {
      type: Object,
      required: true
    },
    sayList: {
      type: Array,
      required: true,
      validator (list) {
        return list.every(sayit => sayit.councilorId && sayit.summary)
      }
    },
    stats: {
      type: Object,
      required: true,
      validator (stats) {
        return stats.org
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.intLanding {
  @include large-screen {
    display: grid;
    grid-template-columns: 14rem 1fr;
    column-gap: 5rem;
    align-items: start;

    &__stats {
      position: sticky;
      top: 4rem;
    }
  }
}

.stats {
  &__item {
    background: none;

    @include large-screen {
      border-width: 0 0 1px 0;
    }
  }
}
</style>
