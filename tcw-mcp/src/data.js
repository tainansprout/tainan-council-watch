// 讀觀測站網站 /data/{屆}/ 的靜態 JSON（tcw-ui 的 nuxt generate 產生）
// 同一個 Worker 執行個體裡快取一段時間，網站重新部署後最慢 CACHE_MS 就會讀到新資料
const CACHE_MS = 10 * 60 * 1000
const cache = new Map()

async function fetchJson (url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`讀取資料失敗：${url}（HTTP ${res.status}）`)
  }
  return res.json()
}

function cached (url, load) {
  const hit = cache.get(url)
  if (hit && Date.now() - hit.time < CACHE_MS) {
    return hit.value
  }
  // 存 Promise，同時進來的請求共用同一次下載；失敗就清掉，下次重抓
  const value = load(url).catch((err) => {
    cache.delete(url)
    throw err
  })
  cache.set(url, { time: Date.now(), value })
  return value
}

export function createData (dataBase) {
  return {
    // { round, districts: [...], councilors: [...] }
    councilors: round => cached(`${dataBase}/${round}/councilors.json`, fetchJson),
    // 全站搜尋索引，rows 轉成物件
    searchRows: round => cached(`${dataBase}/${round}/search.json`, async (url) => {
      const { fields, rows } = await fetchJson(url)
      return rows.map(row => Object.fromEntries(fields.map((field, i) => [field, row[i]])))
    }),
    // 某位議員的全部質詢 { id, sayit: [...], stats }
    sayit: (round, councilorId) => cached(`${dataBase}/${round}/sayit/${councilorId}.json`, fetchJson)
  }
}
