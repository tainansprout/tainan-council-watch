export const NAV_LINKS = [
  { label: '看選區', route: r => `/${r}/district` },
  { label: '找議員', route: r => `/${r}/councilor` },
  { label: '搜質詢', route: r => `/${r}/interpellation` },
  { label: '讀分析', route: () => '/article' }
]

const DISTRICT_MAP = {
  第一選區: '1st',
  第二選區: '2nd',
  第三選區: '3rd',
  第四選區: '4th',
  第五選區: '5th',
  第六選區: '6th',
  第七選區: '7th',
  第八選區: '8th',
  第九選區: '9th',
  第十選區: '10th',
  第十一選區: '11th',
  第十二選區: '12th',
  第十三選區: '13th'
}

export function districtName2Id (districtName) {
  if (districtName in DISTRICT_MAP) {
    return DISTRICT_MAP[districtName]
  }
  throw new Error(`Invalid district: ${districtName}`)
}

export const DISTRICT_KEY_LIST = Object.values(DISTRICT_MAP)

export const DISTRICT_LIST = Object.keys(DISTRICT_MAP)

export const DEFAULT_ROUND = '3rd'

export const NAV_HEIGHT = 60

export const NUMBER_2_ZH = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
