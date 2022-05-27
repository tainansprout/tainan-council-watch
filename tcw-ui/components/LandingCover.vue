<template lang="pug">
  .landingCover.relative
    img.w-100.db.dn-ns(src="~/assets/cover.svg")
    img.w-100.dn.db-ns(src="~/assets/cover-ns.svg")
    .landingCover__header.absolute
      h1.landingCover__title.fw5 台南市議會觀測站
      .landingCover__subtitle(role="doc-subtitle") {{roundLabel}}

</template>
<script>
import { number2zh } from '~/libs/utils'
import { NUMBER_2_ZH } from '~/libs/defs'

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
      const roundNumber = NUMBER_2_ZH.indexOf(roundZh)

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
  @include not-small-screen {
    &__title {
      letter-spacing: 4px;
    }
    &__subtitle {
      letter-spacing: 3px;
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
