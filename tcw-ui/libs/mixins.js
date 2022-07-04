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

export const dropdownMenuMiixin = {
  beforeDestroy () {
    const html = document.querySelector('html')
    if (html.classList.contains('is-clipped-touch')) {
      html.classList.remove('is-clipped-touch')
    }
  }
}
