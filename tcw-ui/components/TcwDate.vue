<template lang="pug">
  span {{value}}
</template>
<script>
import { date } from '~/libs/utils'
export default {
  props: {
    date: {
      type: String,
      required: true
    }
  },
  computed: {
    value () {
      return date(this.date)
    }
  }
}
</script>
