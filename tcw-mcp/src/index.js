// 台南市議會觀測站 MCP 伺服器（Cloudflare Workers，Streamable HTTP，不用登入、不用 API key）
// 資料讀網站 /data/{屆}/ 的靜態 JSON，沒有資料庫，也沒有任何寫入功能
import { createMcpHandler, McpServer, originValidationResponse } from '@modelcontextprotocol/server'
import * as z from 'zod'
import { createData } from './data.js'
import {
  ROUNDS, DEFAULT_ROUND, MAX_LIMIT, ToolError,
  listCouncilors, getCouncilor, listInterpellations, searchInterpellations
} from './tools.js'

const VERSION = '1.0.0'
// 瀏覽器帶 Origin 來的只接受這些網域；claude.ai 等服務從後端連線不帶 Origin，照規格放行
const ALLOWED_ORIGINS = ['claude.ai', 'tcco.tnsprout.org', 'localhost', '127.0.0.1']

const INSTRUCTIONS = `台南市議會觀測站（https://tcco.tnsprout.org）整理的台南市議員質詢紀錄，資料來自台南市議會議事錄。
- 有第三屆（2018–2022）和第四屆（2022–2026）定期會的質詢，預設第四屆。
- 先用 list_councilors 找議員 ID，再用 get_councilor 看經歷、list_interpellations 看某位議員的質詢。
- search_interpellations 跨議員搜摘要和局處；要搜發言內容，用 list_interpellations 的 keyword。
- 每筆質詢附議事錄原文 PDF（pdfUrl），引用時以原文為準。`

const roundArg = z.enum(ROUNDS).default(DEFAULT_ROUND).describe('屆次：3rd 是第三屆（2018–2022），4th 是第四屆（2022–2026）')
const councilorArg = z.string().min(1).max(20).describe('議員 ID（例如 053E553A）或姓名')
const orgArg = z.string().max(20).optional().describe('局處，例如「教育局」「工務局」，要完全相同')
const fromArg = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('起日 YYYY-MM-DD（含）')
const toArg = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('迄日 YYYY-MM-DD（含）')
const limitArg = z.number().int().min(1).max(MAX_LIMIT).default(10).describe(`一次回傳幾筆，最多 ${MAX_LIMIT}`)
const offsetArg = z.number().int().min(0).default(0).describe('從第幾筆開始（分頁用）')
const READ_ONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false }

function result (run) {
  return async (args) => {
    try {
      return { content: [{ type: 'text', text: JSON.stringify(await run(args)) }] }
    } catch (err) {
      // 參數錯誤回給模型自己修正；其他錯誤（讀不到資料）也照實說
      return { isError: true, content: [{ type: 'text', text: err instanceof ToolError ? err.message : `${err.message}` }] }
    }
  }
}

function createServer (data) {
  const server = new McpServer({ name: 'tainan-council-watch', version: VERSION }, { instructions: INSTRUCTIONS })

  server.registerTool('list_councilors', {
    title: '列出議員',
    description: '列出某一屆的台南市議員：ID、姓名、政黨、選區、行政區、質詢數。可以依選區、姓名、政黨篩選。',
    inputSchema: z.object({
      round: roundArg,
      district: z.string().max(10).optional().describe('選區（「第一選區」或「1st」）或行政區（「新營」「東區」）'),
      name: z.string().max(10).optional().describe('姓名（部分符合即可）'),
      party: z.string().max(20).optional().describe('政黨（部分符合即可），例如「民主進步黨」「中國國民黨」「無黨籍」')
    }),
    annotations: READ_ONLY
  }, result(args => listCouncilors(data, args)))

  server.registerTool('get_councilor', {
    title: '議員資料',
    description: '查一位議員：選區、公職經歷、任期狀態、政治關係或黨職、各局處的質詢次數、觀測站和議會官網的網址。',
    inputSchema: z.object({ round: roundArg, councilor: councilorArg }),
    annotations: READ_ONLY
  }, result(args => getCouncilor(data, args)))

  server.registerTool('list_interpellations', {
    title: '議員的質詢',
    description: '列出一位議員的質詢議題（新到舊），含摘要、發言內容、相關局處、議事錄頁碼和原文 PDF 網址。keyword 會搜摘要和發言內容。',
    inputSchema: z.object({
      round: roundArg,
      councilor: councilorArg,
      keyword: z.string().max(50).optional().describe('關鍵字，空白分開的每個詞都要出現'),
      org: orgArg,
      from: fromArg,
      to: toArg,
      limit: limitArg,
      offset: offsetArg
    }),
    annotations: READ_ONLY
  }, result(args => listInterpellations(data, args)))

  server.registerTool('search_interpellations', {
    title: '搜尋質詢',
    description: '跨議員搜尋質詢議題（新到舊）。只搜摘要和局處，回傳摘要、議員、選區、議事錄頁碼和原文 PDF 網址；要看發言內容，再用 list_interpellations。',
    inputSchema: z.object({
      query: z.string().min(1).max(50).describe('關鍵字，空白分開的每個詞都要出現，例如「停車 收費」'),
      round: roundArg,
      councilor: councilorArg.optional(),
      district: z.string().max(10).optional().describe('選區（「第一選區」或「1st」）或行政區（「新營」）'),
      org: orgArg,
      from: fromArg,
      to: toArg,
      limit: limitArg,
      offset: offsetArg
    }),
    annotations: READ_ONLY
  }, result(args => searchInterpellations(data, args)))

  return server
}

let handler = null

export default {
  async fetch (request, env) {
    const url = new URL(request.url)
    if (url.pathname === '/') {
      return new Response(`台南市議會觀測站 MCP 伺服器。MCP 端點：${url.origin}/mcp（Streamable HTTP，不用登入）\n說明：https://github.com/tainansprout/tainan-council-watch/tree/main/tcw-mcp\n`, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      })
    }
    if (url.pathname !== '/mcp') {
      return new Response('Not found', { status: 404 })
    }
    const rejected = originValidationResponse(request, ALLOWED_ORIGINS)
    if (rejected) {
      return rejected
    }
    if (!handler) {
      const data = createData(env.DATA_BASE)
      handler = createMcpHandler(() => createServer(data))
    }
    return handler.fetch(request)
  }
}
