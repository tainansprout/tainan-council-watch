<template lang="pug">
  .ccl
    .ccl__ccc(v-for="cons in consList" :key="cons")
      con-con-card(:data="map[cons]")
</template>
<script>
import { CONSTITUENCY_LIST } from '~/libs/defs'
export default {
  props: {
    map: {
      type: Object,
      required: true
    }
  },
  computed: {
    consList () {
      return CONSTITUENCY_LIST
    }
  }
}
</script>
<style lang="scss" scoped>
.ccl {
  &__ccc {
    margin-bottom: 0.75rem;
  }
  @include large-screen {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: 1rem;
    row-gap: 1.5rem;
  }
}
</style>
