<template lang="pug">
  img.partyIcon(:src="cover" :alt="party")
</template>
<script>
import { partyList as PARTY_LIST } from '~/content/meta/partyList.json'

const PARTY_MAP = PARTY_LIST.reduce((accu, party) => {
  accu[party.name] = party.avatar
  return accu
}, {})

export default {
  props: {
    party: {
      type: String,
      required: true
    }
  },
  computed: {
    cover () {
      return PARTY_MAP[this.party] || ''
    }
  }
}
</script>
<style lang="scss" scoped>
.partyIcon {
  height: 1em;
  width: 1em;
  object-fit: contain;
  border-radius: 100%;
}
</style>
