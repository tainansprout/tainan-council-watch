import dayjs from 'dayjs'
import { NAV_HEIGHT, NUMBER_2_ZH } from './defs'
import { partyList as PARTY_LIST } from '~/content/meta/partyList.json'

const PARTY_MAP = PARTY_LIST.reduce((accu, party) => {
  accu[party.abbr || party.name] = party
  return accu
}, {})

export function normalizeParty (party) {
  if (!party) {
    return undefined
  }
  if (party.name && party.avatar) {
    return party
  }
  let theParty = PARTY_MAP[party]
  if (!theParty) {
    theParty = PARTY_LIST.find(p => p.name === party)
  }
  if (!theParty) {
    throw new Error(`Undefined party: ${party}`)
  }
  return theParty
}

export function date (dateString) {
  return dayjs(dateString).format('YYYY.MM.DD')
}

export function scrollTo (el) {
  if (!el) {
    return
  }
  const offset = el.offsetTop - NAV_HEIGHT
  setTimeout(() => {
    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    })
  })
}

export function number2zh (number) {
  number = number.toString()
  const nthRegex = /st|nd|rd|th/
  const isNth = number.match(nthRegex)
  number = number.replace(nthRegex, '')
  const zh = NUMBER_2_ZH[number]

  if (!zh) {
    throw new Error(`Undefined number: ${number}`)
  }
  if (isNth) {
    return `第${zh}`
  }
  return zh
}
