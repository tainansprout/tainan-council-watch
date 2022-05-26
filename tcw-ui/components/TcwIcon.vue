<template lang="pug">
  img.tcwIcon(:class="[`tcwIcon--${size}`]" :src="src")
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    size: {
      type: String,
      default: 'regular',
      validator (size) {
        return size === 'regular' || size === 'large'
      }
    }
  },
  computed: {
    src () {
      return `/icons/${this.icon}.svg`
    }
  }
}
</script>
<style lang="scss" scoped>
.tcwIcon {
  font-size: 1rem;
  width: 1em;
  height: 1em;
  object-fit: contain;

  &--large {
    font-size: 1.5rem;
  }
}
</style>
