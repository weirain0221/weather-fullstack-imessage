# ⛅ Weather Fullstack iMessage Notification System

這是一個結合前端網頁、後端 Flask API 以及 macOS 自動化指令（AppleScript）的全端天氣查詢與 iMessage 自動通知系統。

當使用者在網頁上查詢指定城市的天氣時，後端會即時向 OpenWeatherMap 撈取最新氣象資料，並透過系統級指令，自動發送精美的天氣報告簡訊至開發者的 iPhone 手機上。

---

## 🌟 專案亮點與技術優化

1. **全端架構整合**：前端（HTML/CSS/JS）透過 Fetch API 與後端（Python Flask）進行跨網域（CORS）非同步連線。
2. **資訊安全（資安優化）**：採用業界標準的 `python-dotenv` 管理敏感憑證（API Key、Apple ID）。專案代碼保持 Public 公開，但核心金鑰與私人隱私完美抽離，絕不暴露於程式碼中。
3. **即時數據動態重新整理 (Cache Busting)**：針對 OpenWeatherMap 免費版 API 的快取機制進行優化，在請求網址中動態引入時間戳記（Timestamp），強迫伺服器回傳當下最精準、不延遲的即時氣溫與體感溫度。
4. **macOS 系統自動化**：後端整合 macOS 內建的 `osascript` 驅動 AppleScript，實現免付費、無須第三方簡訊平台的 iMessage 自動發送機制。

---

## 📂 專案目錄結構

```text
weather-fullstack-imessage/
├── weather_app/          # 前端網頁專案 (Frontend)
│   ├── index.html        # 網頁結構與 Glassmorphism 卡片
│   ├── script.js         # 地理定位、Fetch 非同步請求與動態變色邏輯
│   └── style.css         # 霧面視覺、轉場動畫與響應式排版
└── weather_spider/       # 後端爬蟲與伺服器專案 (Backend)
    ├── .env              # 敏感憑證管理 (已加入 .gitignore，本地自行建立)
    ├── weather_spider.py # Flask API 與 macOS 原生 AppleScript 排程引擎
    └── venv/             # Python 獨立虛擬環境