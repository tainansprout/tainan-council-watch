<template lang="pug">
  .cl(:class="{'cl--minified': minified}")
    b-dropdown.dn-ns.w-100(aria-role="menu" v-if="minified")
      template(slot="trigger")
        button.cl__toggle.pointer.flex.items-center.justify-between.w-100
          .ls2 查看選區議員
          tcw-icon(icon="chevron-down-gray")
      b-dropdown-item(
        v-for="cons in consList"
        :key="cons"
        :has-link="true"
        aria-role="menuitem"
      )
        councilor-in-district(:data="map[cons]" :round="round" :minified="true")
    .cl__list(:class="{dn: minified}")
      .cl__ccc(v-for="cons in consList" :key="cons")
        councilor-in-district.h-100-ns(:data="map[cons]" :round="round" :minified="minified")
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
.cl {
  &__toggle {
    border: 1px solid $yellow-8;
    background: none;
    padding: 0.375rem 0.75rem;
  }
  .dropdown ::v-deep {
    .background {
      z-index: 1000;
    }
    .dropdown-trigger {
      width: 100%;
    }
    .dropdown-menu {
      z-index: 1000 !important;
    }
    .dropdown-content {
      padding: 0;
      border-radius: 0;
      border: 1px solid $gray-d;
    }
    .dropdown-menu .dropdown-content .has-link {
      &.is-active {
        background: none;
      }
      + .has-link {
        border-top: 1px solid $gray-d;
      }
      a {
        padding: 0;
        display: flex;
        color: $black;
      }
    }
  }
  &__ccc {
    margin-bottom: 0.75rem;
  }
  @include not-small-screen {
    &__list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      column-gap: 1rem;
      row-gap: 1rem;
      align-items: stretch;
    }
  }
  @include large-screen {
    &__list {
      grid-template-columns: repeat(4, 1fr);
      column-gap: 1rem;
      row-gap: 1.5rem;
    }
  }

  &--minified {
    .cl__ccc {
      margin: 0;
    }
  }
}
</style>
