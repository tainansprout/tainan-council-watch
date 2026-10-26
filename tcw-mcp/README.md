# 台南市議會觀測站 MCP 伺服器

讓 Claude 等 AI 工具直接查觀測站的台南市議員質詢紀錄。不用登入、不用 API key，只能讀資料。

- 傳輸方式：MCP 的 Streamable HTTP，端點是 `/mcp`。2025 年版和 2026-07-28 版的協定都支援。
- 資料來源：網站 `nuxt generate` 時輸出的 `/data/{屆}/`（`tcw-ui/server/routes/data/`）。
  - `councilors.json`：議員清單，含經歷和各局處質詢數。
  - `search.json`：全站搜尋索引，只有摘要和局處。
  - `sayit/{議員ID}.json`：每位議員的全部質詢。
- 執行環境：Cloudflare Workers。沒有資料庫，資料只用 fetch 讀網站上的公開檔案，在同一個執行個體裡快取 10 分鐘。

## 工具

| 工具 | 做什麼 |
|---|---|
| `list_councilors` | 列出某一屆的議員，可以依選區、行政區、姓名、政黨篩選 |
| `get_councilor` | 一位議員的選區、公職經歷、任期狀態、政治關係或黨職、各局處質詢數 |
| `list_interpellations` | 一位議員的質詢（新到舊），含發言內容。`keyword` 會搜摘要和發言內容，可以依局處、日期篩選 |
| `search_interpellations` | 跨議員搜尋質詢。只搜摘要和局處，可以依議員、選區、局處、日期篩選 |

- 屆次 `round` 可以填 `3rd` 或 `4th`，預設 `4th`。
- 每筆質詢都附議事錄頁碼和原文 PDF 網址（`pdfUrl`，已經帶 `#page=` 跳到那一頁）。
- 一次最多回傳 50 筆，預設 10 筆，用 `offset` 翻頁。

全站搜尋不搜發言內容，原因是 Workers 免費方案每次請求只有 10 毫秒的 CPU 時間。第四屆的摘要索引 2.1MB，解析一次大約 6 毫秒；如果把發言內容也放進去，會超過上限。

## 怎麼接

下面的網址先用 `https://tcco-mcp.<帳號>.workers.dev/mcp` 示意，部署後換成實際網址。

- **claude.ai**：設定 → Connectors → Add custom connector，貼上網址。
- **Claude Code**：`claude mcp add --transport http tcco <網址>`
- **其他支援 MCP 的工具**：選 Streamable HTTP，填同一個網址。

## 開發

```bash
npm ci
npm test        # 先在 ../tcw-ui 跑 npm run generate，測試讀它的 .output/public/data
npm run dev     # wrangler dev；資料預設讀正式站，本機測試加 --var DATA_BASE:http://127.0.0.1:4173/data
```

`npm test` 用官方 MCP client 連 Worker，兩種協定版本都會測。CI 的 `ui-pull-request` 會在網站測試之後跑一次。

## 部署

1. `npx wrangler login`，登入 Cloudflare 帳號。
2. 確認網站已經部署了含 `/data/` 的版本：`https://tcco.tnsprout.org/data/4th/councilors.json` 要打得開。
3. `npm run deploy`，網址是 `https://tcco-mcp.<帳號>.workers.dev/mcp`。
   - 要用自己的網域（例如 `mcp.tnsprout.org`），`tnsprout.org` 要先託管在 Cloudflare，再到 `wrangler.toml` 加 `routes`。

## 安全

- 只能讀：沒有寫入的工具，也沒有資料庫可寫。
- 瀏覽器從其他網站連過來（帶了 `Origin` 標頭）一律回 403，只放行 `claude.ai`、`tcco.tnsprout.org` 和本機。這是 MCP 規格防 DNS rebinding 的要求。claude.ai 等服務從後端連線，不帶 `Origin`，照常服務。
- 參數有長度和範圍限制，`limit` 最多 50。
- 流量目前只靠 Workers 免費方案每天 10 萬次請求的上限擋。真的被灌爆，再加 Cloudflare 的速率限制（Rate Limiting binding）。
