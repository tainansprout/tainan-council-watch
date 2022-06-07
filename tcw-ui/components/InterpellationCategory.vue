<template lang="pug">
  .intCat
    .intCat__title.flex.justify-between.items-center
      .f3.fw5.flex.items-center
        img.mt1.mr3(src="~/assets/slash.svg")
        .ml2 {{name}}
      button.intCat__more.pv2.plainButton.underline.pointer.flex.items-center(v-if="hasMore" @click="showMore")
        | 局處所有相關質詢
        tcw-icon.ml2(icon="chevron-right-gray")
    interpellation-card(
      v-for="(sayit, index) in sayList"
      :key="index"
      :councilor-map="councilorMap" :sayit="sayit"
    )
</template>
<script>
export default {
  props: {
    councilorMap: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    sayList: {
      type: Array,
      required: true,
      validator (list) {
        return list.every(sayit => sayit.councilorId && sayit.summary)
      }
    },
    hasMore: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showMore () {
      this.$emit('more')
    }
  }
}
</script>
<style lang="scss" scoped>
.intCat {
  &__title {
    padding-bottom: 1.5rem;
    border-bottom: 4px solid $gray-9;
    margin-bottom: 3.5rem;

    img {
      width: 0.625rem;
    }
  }
}
</style>
