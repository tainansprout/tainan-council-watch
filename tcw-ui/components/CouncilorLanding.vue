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
    .cl__partyList.dn.flex-ns.items-center
      button.cl__party.plainButton.pointer(
        v-for="party in partyList"
        :key="party.party"
        :class="{'o-50': isPartyDeactivated(party.party)}"
        @click="toggleParty(party.party)"
        @mouseover="activateParty(party.party)"
        @mouseleave="activateParty(null)"
      )
        party-label(:party="party.party")
    .cl__list(:class="{dn: minified}")
      .cl__cid(v-for="cons in consList" :key="cons")
        councilor-in-district.h-100-ns(
          :data="map[cons]"
          :round="round"
          :minified="minified"
          :active-party="activeParty"
        )
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
      isOpened: !this.minified,
      slightlyActiveParty: null,
      seriouslyActiveParty: null
    }
  },
  computed: {
    activeParty () {
      return this.slightlyActiveParty || this.seriouslyActiveParty
    },
    consList () {
      return DISTRICT_KEY_LIST
    },
    partyList () {
      const stats = Object
        .values(this.map)
        .filter(district => district.councilors)
        .flatMap(district => district.councilors.map(councilor => councilor.party))
        .reduce((accu, party) => {
          if (!accu[party]) {
            accu[party] = 0
          }
          accu[party] += 1
          return accu
        }, {})

      return Object.keys(stats)
        .map((party) => {
          return { party, count: stats[party] }
        })
        .sort((a, b) => b.count - a.count)
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
    },
    isPartyDeactivated (party) {
      return this.activeParty && this.activeParty !== party
    },
    toggleParty (party) {
      if (this.seriouslyActiveParty !== party) {
        this.seriouslyActiveParty = party
      } else {
        this.seriouslyActiveParty = null
        this.slightlyActiveParty = null
      }
    },
    activateParty (party = null) {
      this.slightlyActiveParty = party
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
  &__cid {
    margin-bottom: 0.75rem;
  }
  &__partyList {
    margin-bottom: 3.5rem;
  }
  &__party {
    + .cl__party {
      margin-left: 1.5rem;
    }
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
    .cl__cid {
      margin: 0;
    }
    @media (hover: hover) {
      .cl__partyList {
        display: none;
      }
    }
  }
}
</style>
