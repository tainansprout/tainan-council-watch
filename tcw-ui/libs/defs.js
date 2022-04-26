export const NAV_LINKS = [
  { label: '看選區', route: r => `/${r}/選區` },
  { label: '找議員', route: r => `/${r}/議員` },
  { label: '搜質詢', route: r => `/${r}/質詢` }
]

export const INTERPELLATION_LIST = [
  '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三'
].map(i => `第${i}選區`)
