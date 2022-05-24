<template lang="pug">
  .counCard.br1
    nuxt-link.counCard__main.bb.b--moon-gray.pb3.pb4-l(:to="councilorLink")
      .aspect-ratio.aspect-ratio--1x1
        .aspect-ratio--object.br-100.overflow-hidden
          img(:src="person.bgUrl" :alt="person.name")
      div
        .f5.f4-l {{person.name}}
        .f5.f4-l.mt3.mt4-l {{person.party}}
    .counCard__statsList
      .f5.f4-l.mt3.mb2.fw5 關注議題
      .flex.flex-wrap
        org-stats-tag(
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
  border: 1px solid #D8D8D8;
  border-top: 0.5rem solid $yellow;
  padding: 2rem 1.25rem;

  @include large-screen {
    padding: 3rem 1.5rem;
  }
  &__main {
    display: grid;
    grid-template-columns: 3fr 4fr;
    column-gap: 4rem;
    align-items: center;
    color: $black;
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    @include large-screen {
      column-gap: 4rem;
      grid-template-columns: 3fr 4fr;
    }
  }
  &__statsList {
    .orgTag {
      margin-right: 1.5rem;
      margin-top: 0.75rem;
    }
  }
}
</style>
