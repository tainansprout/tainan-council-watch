# 台南議會觀測站

## 開發者須知

### 技術需求

1. Nuxt / Vue v2
2. Netlify CMS

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
   node tools/get-councilors.js
   ```
2. 質詢編碼資料
   ```
   cd tcw-ui
   node tools/extract-poc.js
   ```
3. 產生台南行政區地圖 (geojson)
   ```
   cd data/town-map
   ./extract-tainan.sh <台灣鄉鎮市區>.geojson
   cp tainan-town.json ../tcw-ui/content/map/<想要取的名字>
   ```
4. 產生台南選區地圖 (geojson)
   ```
   cd tcw-ui
   node tools/gen-constituency-map.js 第三屆 <台南行政區地圖>
   ```

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

