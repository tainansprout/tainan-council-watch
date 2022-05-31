<template lang="pug">
  .districtSumWrapper
    .districtSum
      div
        h2.f4.f3-ns.nowrap 選區情報
      .districtSum__article
        .o-50(v-if="!intro.body") 待撰寫
        nuxt-content(v-else :document="intro")
      div
        h2.f4.f3-ns.nowrap 質詢相關局處
      .districtSum__statsList.mt3.mt0-ns
        org-stats-tag(
          v-for="stats in relatedStats.total.org"
          :key="stats.name"
          :stats="stats"
          :to="orgInterpellationLink(stats.name)"
        )
    .counSum
      h2.fw5.f3.f2-l.ls4.lh-normal 應屆議員
      .counSum__list
        councilor-card.mb2.mb0-ns(
          v-for="person in meta.councilors"
          :key="person.id"
          :person="person"
          :round="round"
          :related-org-stats="councilorStats(person)"
        )
</template>
<script>
import { get } from 'lodash'
export default {
  props: {
    meta: {
      type: Object,
      required: true
    },
    relatedStats: {
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
  },
  methods: {
    orgInterpellationLink (org) {
      return {
        name: 'round-interpellation',
        params: {
          round: this.round
        },
        query: {
          district: this.meta.districtId,
          catType: 'org',
          catValue: org
        }
      }
    },
    councilorStats (person) {
      return get(this.relatedStats, `${person.id}.org`, [])
    }
  }
}
</script>
<style lang="scss" scoped>
.districtSum {
  padding: 0 0.75rem;

  h2 {
    font-size: 1.25rem;
    letter-spacing: 1.66px;
    margin-top: 0.75rem;

    &:not(:last-child) {
      margin-top: 2.25rem;
    }
  }

  &__statsList {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    row-gap: 0.5rem;
  }

  &__article ::v-deep {
    line-height: normal;
    letter-spacing: 1.33px;
    ul {
      margin: 0;
      padding: 0;
      li {
        list-style: none;
        line-height: 1.5;
      }
    }
  }

  @include not-small-screen {
    padding: 0;
    display: grid;
    grid-template-columns: 12rem 1fr;
    column-gap: 2rem;
    row-gap: 2rem;
    align-items: flex-start;

    h2 {
      border-bottom: 1px solid $gray-9;
      padding-bottom: 1rem;
      margin-top: 0;
      letter-spacing: 2.33px;
      display: inline-block;

      &:not(:last-child) {
        margin-top: 0;
      }
    }

    &__statsList {
      grid-template-columns: repeat(3, 1fr);
      column-gap: 1.25rem;
      row-gap: 1rem;
    }
  }

  @include large-screen {
    grid-template-columns: 13rem 1fr;
    column-gap: 5rem;

    h2 {
      font-size: 1.75rem;
      padding-bottom: 1.5rem;
    }
    &__statsList {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
.counSum {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid $gray-d;

  h2 {
    margin-bottom: 1.25rem;
  }

  @include not-small-screen {
    margin-top: 5.5rem;
    padding-top: 5.5rem;

    h2 {
      margin-bottom: 3.5rem;
    }

    &__list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
      row-gap: 2rem;
    }
  }

  @include large-screen {
    &__list {
      column-gap: 6rem;
      row-gap: 3.5rem;
    }
  }
}
</style>
