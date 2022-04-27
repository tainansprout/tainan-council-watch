<template lang="pug">
  .counCard.br1
    .counCard__main.bb.b--moon-gray.pb3.pb4-l
      .aspect-ratio.aspect-ratio--1x1.w
        .aspect-ratio--object.br-100.overflow-hidden
          img(:src="person.bgUrl" :alt="person.name")
      div
        .f5.f4-l {{person.name}}
        .f5.f4-l.mt4-l {{person.party}}
    // .counCard__statsList
      .f5.f4-l 關注議題
      .pa3 {{relatedOrgStats}}
</template>
<script>
// import { countRelatedOrgs } from '~/libs/utils'
export default {
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  computed: {
    // relatedOrgStats () {
    //   return countRelatedOrgs(this.person)
    // }
  }
}
</script>
<style lang="scss" scoped>
.counCard {
  border: 1px solid #D8D8D8;
  border-top: 0.5rem solid $primary;
  padding: 2rem 1.25rem;

  @include large-screen {
    padding: 3rem 1.5rem;
  }
  &__main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
    align-items: center;
    img {
      object-fit: cover;
      height: 100%;
    }
    @include large-screen {
      column-gap: 4rem;
    }
  }
}
</style>
