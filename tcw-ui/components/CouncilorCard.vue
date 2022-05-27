<template lang="pug">
  .counCard
    nuxt-link.counCard__main(:to="councilorLink")
      .aspect-ratio.aspect-ratio--1x1
        .aspect-ratio--object.br-100.overflow-hidden
          img(:src="person.bgUrl" :alt="person.name")
      div
        .f5.f4-l.fw5 {{person.name}}
        party-label.f5.f4-l.pt2.mt1.mt2-l(:party="person.party")
    .counCard__statsList
      .f4.mb2.ls3.fw5 質詢局處
      .flex.flex-wrap
        span(v-if="!relatedOrgStats.length") 尚無質詢
        org-stats-tag(
          v-else
          v-for="stats in relatedOrgStats"
          :key="stats.name"
          :stats="stats"
          :plain-text="true"
        )
</template>
<script>
export default {
  props: {
    person: {
      type: Object,
      required: true
    },
    relatedOrgStats: {
      type: Array,
      required: true
    },
    round: {
      type: String,
      required: true
    }
  },
  computed: {
    councilorLink () {
      return {
        name: 'round-councilor-councilor',
        params: {
          round: this.round,
          councilor: this.person.id
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.counCard {
  border: 1px solid $gray-d;
  border-top: 8px solid $yellow-8;
  padding: 2.25rem 0.5rem;

  &__main {
    padding: 0 0.75rem 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid $gray-d;

    display: grid;
    grid-template-columns: 6rem 1fr;
    column-gap: 1.5rem;
    align-items: center;
    color: $black;
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }
  &__statsList {
    padding: 0 0.75rem;
    .orgTag {
      margin-right: 1.5rem;
      margin-bottom: 0.75rem;
    }
  }

  @include large-screen {
    padding: 2.5rem 1.5rem;

    &__main {
      padding: 0 0.75rem 3rem;
      margin-bottom: 1.5rem;
      column-gap: 2.5rem;
      grid-template-columns: 8.5rem 1fr;
    }

    &__statsList {
      padding: 0;
    }
  }
}
</style>
