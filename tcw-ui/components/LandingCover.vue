<template lang="pug">
  .landingCover.relative
    .landingCover__cover
      img.aspect-ratio--object.db.dn-ns(src="~/assets/cover.svg")
      img.aspect-ratio--object.dn.db-ns(src="~/assets/cover-ns.svg")
    .landingCover__header.absolute
      h1.landingCover__title.fw5 台南市議會觀測站
      .landingCover__subtitle(role="doc-subtitle") {{roundLabel}}

</template>
<script>
import { number2zh } from '~/libs/utils'

const START_YEAR = 2010
const YEAR_PER_ROUND = 4

export default {
  props: {
    round: {
      type: String,
      required: true
    }
  },
  computed: {
    roundLabel () {
      const roundZh = number2zh(this.round)
      const roundNumber = Number.parseInt(this.round, 10) || 3

      const yearStart = START_YEAR + (roundNumber - 1) * YEAR_PER_ROUND
      const yearEnd = yearStart + YEAR_PER_ROUND

      return `${yearStart}-${yearEnd} ${roundZh}屆議會`
    }
  }
}
</script>
<style lang="scss" scoped>
.landingCover {
  line-height: normal;
  &__title {
    color: #282828;
    letter-spacing: 2px;
    font-size: 5.75vw;
    margin: 0;
  }
  &__subtitle {
    color: #7a7c7d;
    font-size: 3.75vw;
    letter-spacing: 1px;
    margin-top: 0.5rem;
  }
  &__header {
    top: 13vw;
    left: 7vw;
  }
  &__cover {
    width: 100%;
    padding-top: 74.394%;
  }
  @include not-small-screen {
    &__title {
      letter-spacing: 4px;
    }
    &__subtitle {
      letter-spacing: 3px;
    }
    &__cover {
      padding-top: 57.13%
    }
  }
  @media screen and (min-width: 70em) {
    left: -1.5rem;
    right: -1.5rem;

    &__header {
      top: 8rem;
      left: 5rem;
    }
    &__title {
      letter-spacing: 4px;
      font-size: 3.5rem;
    }
    &__subtitle {
      font-size: 2.25rem;
      letter-spacing: 3px;
    }
  }
}
</style>
