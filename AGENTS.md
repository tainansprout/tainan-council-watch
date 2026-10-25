# AGENTS.md

台南市議會觀測站（https://tcco.tnsprout.org），台南新芽製作。Nuxt 4（Vue 3）靜態網站，資料以 JSON／Markdown 放在 repo 內，由 `server/api` 在 `nuxt generate` 時讀取，預先產生成靜態頁，部署到 GitHub Pages。

詳細說明在 `notes/`：

- `notes/專案架構與資料流.md`：技術組成、目錄、資料腳本、CI、已知問題
- `notes/資料格式.md`：每個資料檔的欄位與範例、Google Sheet 欄位、PDF 切片規則
- `notes/台南市議會官網探索.md`：議會官網的議員名單與議事錄網址、Word／PDF 結構
- `notes/第四屆資料更新路徑.md`：把網站切到第四屆要做的事
- `notes/tncc-data逐字稿清理資料.md`：`../tncc-data` 已清好的第四屆逐字稿 CSV，以及接到本站還缺什麼

## 目錄

```
tcw-ui/                 網站與資料腳本（所有指令都在這裡執行）
  pages/[[round]]/      首頁（/ 與 /{屆}）
  pages/[round]/        依屆次的頁面：district/[[district]]、councilor/[[councilor]]、interpellation
  server/api/           讀 content/ 的 JSON、Markdown 給頁面用（只在 dev 和 generate 時執行）
  content/council/{屆}/ 議員、選區、質詢資料
  content/meta/         政黨、局處、同義詞、頁尾設定（CMS 可編）
  content/article/      分析文章（CMS 新增）
  tools/                資料腳本，round-defs.js 是每屆的資料來源設定
  static/               靜態檔（dir.public 指到這裡，不是 Nuxt 預設的 public/）
  static/admin/         Decap CMS 設定（config.yml）
.github/workflows/      PR lint、push 部署、每日更新
```

相關 repo（本機都在同一層）：

- `../tainan-council-data`（`tainansprout/tainan-council-data`）：議事錄 PDF 切片，前端開原文用。
- `../tncc-data`：第四屆議事錄逐字稿清理成 `speaker,content` CSV（第 1～6 次定期會），是產生第四屆質詢資料的起點。

## 環境

- **Node 24**（LTS，CI 也是 24）。`npm ci` 之後會自動跑 `nuxt prepare`，產生 `.nuxt/`（ESLint 設定也在裡面）。
- npm 11 會警告 jpegtran-bin、pngquant-bin 等套件的 install script 沒有核准；網站建置用不到，只有 `get-councilors.mjs` 壓縮照片會用到這兩個執行檔。
- `tcw-ui/.env`：`ALGOLIA_APP_ID`、`ALGOLIA_DATA_API_KEY`、`ALGOLIA_SEARCH_API_KEY`、`ALGOLIA_INDEX_NAME` 必填；`SENTRY_*`、`JANDI_HOOK` 選填。

## 常用指令

```sh
cd tcw-ui
npm ci
npm run dev                 # 開發
npm run lint                # PR 會跑這個
npm run generate            # 靜態輸出到 .output/public/（generate:gh 會再刪掉 admin/）
npm test                    # 對 .output/public/ 跑端對端測試（要先 generate；第一次先 npx playwright install chromium）

# 資料腳本（依序）
node tools/get-councilors.mjs -r 4th          # 爬議會官網議員名單與照片
node tools/gen-district-map.js 4th            # 選區地圖（兩屆選區相同，通常不用跑）
node tools/extract-interpellation.js -r 3rd   # Google Sheet → sayit/*.json
node tools/sync-search-index.js 3rd [取樣%]   # sayit → Algolia（會覆蓋整個索引）
```

前兩支用 `-r`，後兩支用位置參數。

## 寫程式的慣例

- Vue 檔用 Pug 模板 + SCSS，樣式以 tachyons 工具類為主，元件庫用 Buefy。
- ESLint 用 `@nuxt/eslint`（`eslint.config.mjs`），風格照原本 standard：不加分號、單引號、函式名稱後面空一格；`console` 只允許 `warn`、`error`、`info`。Pug 模板 ESLint 讀不到，`<script setup>` 裡只在模板用到的變數會被當成沒用到，所以頁面多用 `defineNuxtComponent` 的 Options API。
- 元件、composables 自動 import，不用手動註冊。
- 頁面資料用 `useFetch('/api/...')` 取，邏輯寫在 `server/api/`。generate 時資料會存進每頁的 `_payload.json`，正式站沒有 API。
- 從 CommonJS 套件取具名匯出（`import { x } from 'lodash'`）在 SSR 會失敗，lodash 要用 `lodash-es`。Vue 2 時代的元件庫要加進 `build.transpile`（buefy 已加）。
- 屆次 key 用 `3rd`、`4th`；選區 id 用 `1st`～`13th`；議員 id 是官網 `mainid` 前 8 碼，**換屆後同一人 id 會變**。
- 選區名稱對照在 `libs/defs.js` 和 `tools/utils.js` 各有一份，改一邊要同步另一邊。

## 內容編輯

文章、選區說明、議員經歷、政黨、局處由編輯在 Netlify CMS 修改，CMS 直接 commit 到 `main`（commit 訊息形如「Create 全站 | 分析文章 “…”」）。修改 `content/` 前先 `git pull`，避免和 CMS 的 commit 衝突。

議員名單異動（遞補、補選）時，`static/admin/config.yml` 對應選區要手動加減 `councilor-{id}` 那一行。

## 換屆要改的地方

1. `tools/round-defs.js`：新屆的 `councilorPageId`（議會官網「議員資訊網」的 orcaid）、`sheetUri`、`sheetList`。舊屆移到「歷屆議員」後 orcaid 會變。
2. `libs/defs.js` 的 `DEFAULT_ROUND`，以及 `content/meta/misc.json` 的 `round-list`（加一筆、移動 `isDefault`）。
3. `static/admin/config.yml`：新增該屆 13 個選區的後設資料 collection。
4. `.github/workflows/daily-update.yml`、`ui-deploy.yml` 裡資料腳本的屆次參數。
5. Algolia 索引策略（目前單一索引，同時間只能搜一屆）。
6. `tainan-council-data` 新增 `interpellation/round/{屆}/regular/{NN}/` 的 PDF 切片。

## 已知問題

- `daily-update.yml` 呼叫 `extract-interpellation.js` 沒帶 `-r`，腳本 `return 1` 但 exit code 仍是 0，每日更新實際上沒有抓 Sheet。
- `extract-interpellation.js` 的 `getDistrictId()` 把函式 `districtName2Id` 當物件用，永遠回傳 undefined，議員比對全靠全市同名比對。
- Algolia 上傳欄位叫 `councilorRound`，`attributesForFaceting` 寫成 `councilRound`；前端搜尋也沒依屆次過濾。
- `InterpellationCard.vue` 沒傳 `meeting-type`，PDF 檢視器只支援定期會（`regular`）。
- 第四屆的 `meta-第N選區.md` 全是空檔。
- 第四屆質詢還沒上 Google Sheet：`round-defs.js` 的 `4th` 用 `file` 直接讀 `../tncc-data/interpellation/output/sheet/` 的 CSV（`tncc-data` 的 `export_sheet.py` 產生），所以 `extract-interpellation.js -r 4th` 只能在本機兩個 repo 並排時跑，CI 上沒有這個路徑。
- `static/admin/index.html` 的 Netlify Identity widget 沒有固定版本；`backend: github` 用不到它，但沒確認編輯的登入方式前先不拿掉。

## 測試

`tests/site.spec.mjs`（Playwright）對 `npm run generate` 的輸出跑，因為部署到 GitHub Pages 的就是這份靜態檔，沒有 `/api`。`tests/serve-static.mjs` 照 GitHub Pages 的規則提供檔案（資料夾回 `index.html`、找不到回 `404.html`）。測的是：

- sitemap 的每個網址和它的 `_payload.json` 都在（站內換頁靠 `_payload.json`，少了就壞）；找不到的網址回 404。
- 第三、四屆每位議員頁有名字、「所有局處」總數、最新一筆質詢；每個選區頁有議員和最多的局處。預期值直接讀 `content/` 的 JSON。
- 主要頁面沒有 JavaScript 錯誤、沒有站內請求失敗、沒有打到 `/api`。
- 互動：導覽列和選區頁點進議員頁（不重新載入）、議員頁點局處篩選和捲到底載入更多、選區頁「顯示所有局處」、第三屆質詢卡片打開議事錄原文、頁尾切換屆次。

改完跑 `npm run lint`、`npm run generate`、`npm test`。本機已經有 Chromium 時可以用 `CHROMIUM_PATH=<執行檔路徑> npm test`。CI 在 PR、部署、每日更新都會跑，測不過就不部署（部署流程在更新搜尋索引之前測）。

CMS 後台不在 generate 的輸出裡（`generate:gh` 會刪掉 `admin/`），改了 `static/admin/` 要另外用 `npm run dev` 開 `/admin/index.html` 看。

## 不要做的事

- 不要把議會原始 PDF／zip 放進這個 repo，它們很大（單本可達 300 MB），PDF 切片放 `tainan-council-data`。
- 不要手改 `district-map.json`、`councilor-map.json`、`sayit/*.json`，它們由腳本產生，下次跑會被覆蓋。要補人用 `missing-councilor-list.json`，要改質詢內容去改 Google Sheet。
