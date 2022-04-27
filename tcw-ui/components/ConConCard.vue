<template lang="pug">
  .ccc.br1.pa3(:class="{'ccc--minified': minified}")
    .ccc__constituency.fw5.f4 {{data.areaTitle}}
    .ccc__areaList.fw5.mt2
      span(v-for="area in data.areaList" :key="area") {{area}}
    .ccc__councilorList.mt3(:class="[`ccc__councilorList--${data.councilors.length}`]")
      nuxt-link.councilor.f5.f7-l(
        v-for="person in data.councilors"
        :key="person.id"
        :to="councilorLink(person)"
      )
        span {{person.name}}&nbsp;&nbsp;/&nbsp;&nbsp;
        span {{person.party}}

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
    }
  },
  computed: {
    // constituencyLink () {
    //   return {
    //     name: 'round-議員-constituency',
    //     params: {
    //       round: this.$route.params.round,
    //       constituency: this.data.areaTitle
    //     }
    //   }
    // }
  },
  methods: {
    councilorLink (person) {
      return {
        name: 'round-議員-councilor',
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
.ccc {
  border: 1px solid #D8D8D8;
  border-top: 8px solid $primary;

  &__areaList {
    span + span {
      &:before {
        content: ".";
      }
    }
  }

  &__councilorList {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1.25rem;
    row-gap: 0.5rem;
    justify-content: space-between;

    &--1 {
      grid-template-columns: 1fr;
    }
  }

  &--minified {
    border-top: 1px solid #D8D8D8;
    @media (hover: hover) {
      .ccc {
        &__councilorList {
          display: none;
          margin-top: 0;
        }
      }

      &:hover {
        .ccc {
          &__constituency,
          &__areaList {
            display: none;
          }
          &__councilorList {
            display: grid;
          }
        }
      }
    }
  }
}

.councilor {
  color: $black;
  text-decoration: none;
  @include large-screen {
    text-decoration: underline;
  }
}
</style>
