import { partyList as PARTY_LIST } from '~/content/meta/partyList.json'

const PARTY_MAP = PARTY_LIST.reduce((accu, party) => {
  accu[party.abbr || party.name] = party
  return accu
}, {})

export const partyMixin = {
  props: {
    party: {
      type: [String, Object],
      required: true
    }
  },
  computed: {
    meta () {
      if (this.party.name && this.party.avatar) {
        return this.party
      }
      let party = PARTY_MAP[this.party]
      if (!party) {
        party = PARTY_LIST.find(p => p.name === this.party)
      }
      if (!party) {
        throw new Error(`Undefined party: ${this.party}`)
      }
      return party
    }
  }
}
