<template lang="pug">
  .districtSumWrapper
    .districtSum
      h2.fw4.f4.f3-l.mt3.mt0-l 選區情報
      .districtSum__article
        .o-50(v-if="!intro") 待撰寫
        nuxt-content(v-else :document="intro")
      h2.fw4.f4.f3-l.mt4.mt0-l 議員關注議題
      .districtSum__statsList.mt3.mt0-l
        org-stats-tag(
          v-for="stats in relatedOrgStats.total"
          :key="stats.name"
          :stats="stats"
        )
    .counSum.mt3.pt3.mt5-l.pt5-l.bt.b--moon-gray
      h2.fw4.f4.f3-l 應屆議員
      .counSum__list.mt3.mt4-l
        councilor-card.mt2.mt0-l(
          v-for="person in meta.councilors"
          :key="person.id"
          :person="person"
          :round="round"
          :related-org-stats="relatedOrgStats[person.id] || []"
        )
</template>
<script>
export default {
  props: {
    meta: {
      type: Object,
      required: true
    },
    relatedOrgStats: {
      type: Object,
      required: true
    },
    round: {
      type: String,
      required: true
    }
  },
  computed: {
    intro () {
      return this.meta.intro
    }
  }
}
</script>
<style lang="scss" scoped>
.districtSum {

  @include large-screen {
    display: grid;
    grid-template-columns: 13rem 1fr;
    column-gap: 5rem;
    row-gap: 2rem;
  }

  &__statsList {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    row-gap: 0.5rem;

    @include large-screen {
      grid-template-columns: repeat(4, 1fr);
      column-gap: 1.25rem;
      row-gap: 1rem;
    }
  }

  &__article ::v-deep {
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        line-height: 1.5;
      }
    }
  }
}
.counSum {
  &__list {
    @include large-screen {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 6rem;
      row-gap: 3.5rem;
    }
  }
}
</style>
