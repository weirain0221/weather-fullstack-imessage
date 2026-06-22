# 🌤️ 全端天氣即時報與自動化 iMessage 推播系統

本專案是一個兼具現代化前端網頁視覺、輕量級後端微服務，並深度整合 macOS 系統原生推播功能的「前後端分離」全端天氣應用。使用者可透過優雅的網頁介面即時查詢全球城市天氣，系統除動態呈現即時氣象數據與視覺主題外，後端將同步觸發自動化腳本，將氣象資訊即時推播至指定之 iPhone。

---

## 🚀 技術亮點與核心架構

本專案非單純的前端 API 串接，而是完整的**前後端分離（Frontend-Backend Separation）**架構，具備以下軟體工程實踐價值：

1. **前後端分離架構**：前端（HTML5/CSS3/JavaScript）負責視覺與互動；後端（Python Flask）建構輕量級微服務，負責資料路由與核心邏輯。
2. **跨網域資源共享（CORS）處理**：後端成功配置 `Flask-CORS` 協定，安全地允許跨來源網頁的異步數據交換。
3. **異步資料請求（Asynchronous JavaScript）**：前端利用 `Fetch API`、`Promises` 進行非同步 POST 請求，並深度結合 `navigator.geolocation` 實作使用者地理位置自動感測。
4. **macOS 系統級整合（AppleScript）**：後端利用 Python `os` 模組動態呼叫 macOS 內建之原生 AppleScript，將網頁觸發之行為轉化為 Apple 專屬之 **iMessage (藍色泡泡)** 自動化推播。
5. **現代化響應式 UI/UX**：採用 Glassmorphism（玻璃擬態）視覺風格，支援 `keydown` 鍵盤優化監聽，並根據 OpenWeatherMap 回傳之天氣狀況狀態碼，實作動態漸層背景（Dynamic Linear Gradient）切換。

---

## 📂 專案目錄結構

```weather-fullstack-imessage
├── weather_app/          # 前端網頁專案 (Frontend)
│   ├── index.html        # 網頁結構與 Glassmorphism 卡片
│   ├── script.js         # 地理定位、Fetch 非同步請求與動態變色邏輯
│   └── style.css         # 霧面視覺、轉場動畫與響應式排版
│
└── weather_spider/       # 後端微服務專案 (Backend)
    ├── venv/             # Python 虛擬環境
    └── weather_spider.py # Flask API 伺服器與 AppleScript 推播引擎