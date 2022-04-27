<template lang="pug">
  .conSum
    h2.fw4.f4.f3-l.mt3.mt0-l 選區情報
    .conSum__article.o-50 待製作， 05/11 登場
    h2.fw4.f4.f3-l.mt4.mt0-l 議員關注議題
    .conSum__statsList.mt3.mt0-l
      org-stats-tag(
        v-for="stats in relatedOrgStats"
        :key="stats.name"
        :stats="stats"
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
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.conSum {

  @include large-screen {
    display: grid;
    grid-template-columns: 13rem 1fr;
    column-gap: 5rem;
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
}
</style>
