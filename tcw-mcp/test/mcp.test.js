// 用官方 MCP client 連 Worker 的 fetch，舊版（2025）和新版（2026-07-28）協定都測
// 資料讀 tcw-ui 的 generate 輸出，先在 tcw-ui 跑 npm run generate
import { test, before } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { Client, StreamableHTTPClientTransport } from '@modelcontextprotocol/client'
import worker from '../src/index.js'

const DATA_DIR = join(import.meta.dirname, '../../tcw-ui/.output/public/data')
const DATA_BASE = 'https://data.test/data'
const ENDPOINT = 'https://mcp.test/mcp'
const env = { DATA_BASE }

before(() => {
  assert.ok(existsSync(DATA_DIR), `找不到 ${DATA_DIR}，先在 tcw-ui 跑 npm run generate`)
  // Worker 讀資料的 fetch 改讀本機檔案
  const realFetch = globalThis.fetch
  globalThis.fetch = async (input, init) => {
    const url = `${input instanceof Request ? input.url : input}`
    if (!url.startsWith(DATA_BASE)) {
      return realFetch(input, init)
    }
    const file = join(DATA_DIR, url.slice(DATA_BASE.length))
    return existsSync(file)
      ? new Response(await readFile(file), { headers: { 'Content-Type': 'application/json' } })
      : new Response('Not found', { status: 404 })
  }
})

const workerFetch = (url, init) => worker.fetch(new Request(url, init), env)

async function connect (versionNegotiation) {
  const client = new Client({ name: 'test', version: '1.0.0' }, { versionNegotiation })
  await client.connect(new StreamableHTTPClientTransport(new URL(ENDPOINT), { fetch: workerFetch }))
  return client
}

async function call (client, name, args) {
  const res = await client.callTool({ name, arguments: args })
  const text = res.content[0].text
  return res.isError ? { error: text } : JSON.parse(text)
}

for (const [label, negotiation] of [['2025 協定', undefined], ['2026-07-28 協定', { mode: { pin: '2026-07-28' } }]]) {
  test(`${label}：列出四個唯讀工具`, async () => {
    const client = await connect(negotiation)
    const { tools } = await client.listTools()
    assert.deepEqual(tools.map(t => t.name).sort(), ['get_councilor', 'list_councilors', 'list_interpellations', 'search_interpellations'])
    assert.ok(tools.every(t => t.annotations.readOnlyHint))
    await client.close()
  })

  test(`${label}：查議員、看質詢、搜尋`, async () => {
    const client = await connect(negotiation)
    const list = await call(client, 'list_councilors', { district: '新營' })
    assert.ok(list.councilors.some(c => c.name === '蔡育輝'))
    assert.ok(list.councilors.every(c => c.district === '第一選區'))

    const councilor = await call(client, 'get_councilor', { councilor: '蔡育輝' })
    assert.equal(councilor.id, '053E553A')
    assert.match(councilor.jobHistory, /台南市議會第1（遞補）、2、3、4屆議員/)

    const ints = await call(client, 'list_interpellations', { councilor: '053E553A', limit: 3 })
    assert.equal(ints.items.length, 3)
    assert.ok(ints.total > 3 && ints.hasMore)
    assert.ok(ints.items[0].date >= ints.items[1].date)
    assert.match(ints.items[0].pdfUrl, /\/interpellation\/round\/4th\/regular\/\d{2}\/\d{3}\.pdf#page=\d+$/)

    const found = await call(client, 'search_interpellations', { query: '停車', limit: 5 })
    assert.ok(found.total > 0)
    assert.ok(found.items.every(i => i.summary.includes('停車') || i.relatedOrgs.includes('停車')))

    const third = await call(client, 'search_interpellations', { query: '停車', round: '3rd', limit: 1 })
    assert.match(third.items[0].meeting, /^第三屆/)
    await client.close()
  })
}

test('議事錄 PDF 網址和網站的切片規則一樣', async () => {
  const { pdfUrl } = await import('../src/tools.js')
  const base = 'https://tainansprout.github.io/tainan-council-data/interpellation/round/4th/regular/06'
  assert.equal(pdfUrl('4th', 6, 605), `${base}/061.pdf#page=5`)
  assert.equal(pdfUrl('4th', 6, 610), `${base}/061.pdf#page=10`)
  assert.equal(pdfUrl('4th', 6, 611), `${base}/062.pdf#page=1`)
})

test('參數有問題時回錯誤訊息，讓模型自己修正', async () => {
  const client = await connect()
  assert.match((await call(client, 'get_councilor', { councilor: '不存在的人' })).error, /找不到議員/)
  const bad = await client.callTool({ name: 'list_interpellations', arguments: { councilor: '蔡育輝', limit: 500 } })
  assert.ok(bad.isError)
  await client.close()
})

test('瀏覽器從其他網站連線會被擋，不帶 Origin 的照常服務', async () => {
  const body = JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'ping' })
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' }
  const evil = await workerFetch(ENDPOINT, { method: 'POST', body, headers: { ...headers, Origin: 'https://evil.example' } })
  assert.equal(evil.status, 403)
  const ok = await workerFetch(ENDPOINT, { method: 'POST', body, headers: { ...headers, Origin: 'https://claude.ai' } })
  assert.notEqual(ok.status, 403)
  assert.equal((await workerFetch('https://mcp.test/other')).status, 404)
})
