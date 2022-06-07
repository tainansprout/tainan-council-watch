<template lang="pug">
  .cid.br1(:class="{'cid--minified': minified}")
    district-text(:district="data" :is-single-element="true")
    .cid__councilorList(:class="[`cid__councilorList--${data.councilors.length}`]")
      nuxt-link.councilor.flex.items-center(
        v-for="person in data.councilors"
        :key="person.id"
        :to="councilorLink(person)"
        :class="{'o-50': isPartyDeactivated(person)}"
      )
        party-icon.mr2(:party="person.party")
        span {{person.name}}
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    minified: {
      type: Boolean,
      default: false
    },
    round: {
      type: String,
      required: true
    },
    activeParty: {
      default: null,
      validator (val) {
        return !val || typeof val === 'string'
      }
    }
  },
  methods: {
    isPartyDeactivated (person) {
      return this.activeParty && this.activeParty !== person.party
    },
    councilorLink (person) {
      return {
        name: 'round-councilor-councilor',
        params: {
          round: this.round,
          councilor: person.id
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.cid {
  border: 1px solid $gray-d;
  border-top: 8px solid $yellow-8;
  padding: 1.25rem 1rem;

  .districtText {
    font-size: 1.25rem;
    font-weight: 500;
    margin-bottom: 1.25rem;
    ::v-deep {
      .districtText__name {
        display: block;
        > .di {
          font-size: 1.25rem;
        }
      }
      .districtText__townList {
        margin-top: 0.375rem;
        display: block;
      }
    }
  }

  &__councilorList {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1.25rem;
    row-gap: 0.625rem;
    justify-content: space-between;

    &--1 {
      grid-template-columns: 1fr;
    }
  }

  &--minified {
    border: none;
    .districtText {
      font-size: 0.875rem;
      font-weight: 300;
      ::v-deep {
        .districtText__name {
          > .di {
            font-size: 0.875rem;
          }
        }
        .districtText__townList {
          margin-top: 0.25rem;
        }
      }
    }
  }

  @include not-small-screen {
    &--minified {
      border: 1px solid $gray-d;
      border-top: 8px solid $yellow-8;
      padding: 1rem;

      @media (hover: hover) {
        .cid__councilorList {
          display: none;
          margin-top: 0;
        }

        .districtText {
          margin-bottom: 0;
        }

        &:hover {
          .districtText {
            display: none;
          }
          .cid__councilorList {
            display: grid;
          }
        }
      }

      .districtText {
        font-weight: 500;
      }
    }
  }

  @include large-screen {
    .districtText {
      ::v-deep {
        .districtText__townList {
          height: 3.75rem;
        }
      }
    }
  }
}

.councilor {
  font-size: 0.875rem;
  text-decoration: underline;
  &:hover {
    color: $blue;
    text-decoration-color: $blue;
    font-weight: 400;
  }
}
</style>
