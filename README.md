# 台南議會觀測站

## 開發者須知

### 技術需求

1. Nuxt / Vue v2
2. Netlify CMS

### 環境準備

本專案支援 [dotenv](https://www.npmjs.com/package/dotenv)，開發時，可在 `tcw_ui` 裡放一個 `.env` 檔

必要設定：

- ALGOLIA_APP_ID: 搜尋服務的 App ID
- ALGOLIA_DATA_API_KEY: 更新搜尋服務使用的金鑰
- ALGOLIA_SEARCH_API_KEY: 執行搜尋使用的金鑰
- ALGOLIA_INDEX_NAME: 搜尋服務的索引名稱

選填設定：

- SENTRY_DSN: [Sentry](sentry.io/) 的 DSN ，會用在前後端的所有錯誤回報中
- source map 相關：
  - SENTRY_AUTH_TOKEN
  - SENTRY_ORG
  - SENTRY_PROJECT

### 開發步驟

```sh
cd tcw-ui
npm i
npm run dev
```

## 資料建立

1. 議員基本資料
   ```
   cd tcw-ui
   node tools/get-councilors.js 3rd
   ```
2. 質詢編碼資料（僅限第三屆）
   ```
   cd tcw-ui
   node tools/extract-interpellation.js
   ```
3. 產生台南選區地圖 (geojson)
   ```
   cd tcw-ui
   node tools/gen-district-map.js 3rd <台南行政區地圖>
   ```
4. 產生搜尋索引
   ```
   cd tcw-ui
   node tools/sync-search-index.js 3rd <取樣機率>
   ```
   - `取樣機率` 預設為 100 ，表示 100% 的質詢會被放進索引中。測試時，可使用 < 100 的取樣機率，方便開發

### 發佈步驟

```sh
cd tcw-ui
npm i
npm run generate
npm run start
```

## 設計與資訊架構

1. 專案詳細資訊，請見[專案共筆](https://hackmd.io/@ddio/SJWBXM4Sq/)
2. 資料來源：
   1. 議員資訊，來自[台南市議會](https://www.tncc.gov.tw/)
   2. 質詢紀錄、編碼，由台南新芽製作
   3. 網站文章、選區說明，由台南新芽製作
   4. 地圖圖資，來自[@ronnywang/twgeojson](https://github.com/ronnywang/twgeojson)

