<template lang="pug">
  .ccl(:class="{'ccl--minified': minified}")
    button.ccl__toggle.pointer.flex.items-center.justify-between.pa2.mb3.w-100.db.dn-l(
      v-if="minified"
      @click="toggleList"
    )
      span 查看選區議員
      i.fa-solid.fa-chevron-down(v-show="!isOpened")
      i.fa-solid.fa-chevron-up(v-show="isOpened")
    .db-l(:class="{'dn': !isOpened}")
      .ccl__list
        .ccl__ccc(v-for="cons in consList" :key="cons")
          con-con-card.h-100-l(:data="map[cons]" :round="round" :minified="minified")
</template>
<script>
import { DISTRICT_KEY_LIST } from '~/libs/defs'
export default {
  props: {
    map: {
      type: Object,
      required: true
    },
    round: {
      type: String,
      required: true
    },
    minified: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOpened: !this.minified
    }
  },
  computed: {
    consList () {
      return DISTRICT_KEY_LIST
    }
  },
  watch: {
    $route () {
      this.closeList()
    }
  },
  methods: {
    toggleList () {
      this.isOpened = !this.isOpened
    },
    closeList () {
      this.isOpened = false
    }
  }
}
</script>
<style lang="scss" scoped>
.ccl {
  &__toggle {
    border: 1px solid $yellow;
    background: none;
  }
  &__ccc {
    margin-bottom: 0.75rem;
  }
  @include large-screen {
    &__list {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      column-gap: 1rem;
      row-gap: 1.5rem;
      align-items: stretch;
    }
  }
  &--minified {
    .ccl__ccc {
      margin: 0;
    }
  }
}
</style>
