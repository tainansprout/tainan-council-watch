import { friendlyHeader } from '~/libs/crawlerFriendly'

// getter 回傳 { title, description, coverUrl }，資料變了標題跟著變
export function useFriendlyHead (getter) {
  useHead(() => friendlyHeader(getter()))
}
