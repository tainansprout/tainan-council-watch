<template lang="pug">
  .intCat
    .tr(v-if="hasMore")
      button.intCat__more.pv2.mb3.pointer(@click="showMore") 閱讀全部 >
    .intCat__title.f3.fw5.pb3.mb4.bb.b--gray.bw2 / {{name}}
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
  &__more {
    outline: none;
    border: none;
    background: none;
  }
}
</style>
