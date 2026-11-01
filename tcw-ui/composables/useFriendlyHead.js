import { friendlyHeader, SITE_DESCRIPTION } from '~/libs/crawlerFriendly'
import { DEFAULT_ROUND } from '~/libs/defs'

// getter 回傳 { title, description, coverUrl, type, jsonLd }，資料變了標題跟著變
// canonical 用目前的路徑；首頁和預設屆次的首頁內容一樣，指向 /{預設屆次}/
export function useFriendlyHead (getter) {
  const route = useRoute()
  useHead(() => {
    const opts = getter()
    const url = route.path === '/' ? `/${DEFAULT_ROUND}/` : route.path
    return friendlyHeader({ ...opts, description: opts.description || SITE_DESCRIPTION, url })
  })
}
