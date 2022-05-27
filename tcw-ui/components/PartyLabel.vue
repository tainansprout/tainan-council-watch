<template lang="pug">
  .partyLabel.flex.items-center
    party-icon.mr2(:party="fullName")
    | {{fullName}}
</template>
<script>
import { partyList as PARTY_LIST } from '~/content/meta/partyList.json'

const PARTY_MAP = PARTY_LIST.reduce((accu, party) => {
  accu[party.abbr || party.name] = party
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
    fullName () {
      let party = PARTY_MAP[this.party]
      if (!party) {
        party = PARTY_LIST.find(p => p.name === this.party)
      }
      if (!party) {
        throw new Error(`Undefined party: ${this.party}`)
      }
      return party.name
    }
  }
}
</script>
<style lang="scss" scoped>
.partyLabel {
  letter-spacing: 0.083em;
  .partyIcon {
    font-size: calc(1em + 0.25rem);
  }
}
</style>
