import { normalizeParty } from './utils'

export const partyMixin = {
  props: {
    party: {
      type: [String, Object],
      required: true
    }
  },
  computed: {
    meta () {
      return normalizeParty(this.party)
    }
  }
}
