# MDS Website 設計文檔

**日期**：2026-05-17  
**專案**：「從試算表到資料平台」書籍推廣網站  
**基礎技術**：Quickblog + JAMstack (GitHub Pages)

---

## 1. 核心主張

**不再用錯誤的技術做資料工程：從 Excel 試算表的困局，到用「開源、有效」的方式打造資料平台**

### 三層價值
1. **認識問題**（工程視角）— 幫你看清「為什麼用 Web 開發的方式做 BI 報表是浪費時間」
2. **改變現況**（組織視角）— 用 Modern Data Stack 這套開源、有效的方案突破困局
3. **實踐指南**（全面視角）— 從工具選擇、技術架構，到團隊協作的完整路徑

**適用對象**：軟體工程師、資料團隊、企業決策者

---

## 2. 網站架構

### 頁面結構
```
首頁 (/)
├─ /about — 作者介紹
├─ /insights — 市場洞察和報告
├─ /preview — 完整內容預覽
├─ /buy — 購買渠道
└─ /blog — 未來擴展（暫不實施）
```

### 導覽順序（建議）
主導覽：首頁 | 關於 | 深度洞察 | 購買

---

## 3. 首頁設計（/）

### 區塊 1：Hero Section
- **內容**：書籍封面（左）+ 核心主張（右，或上下堆疊）
- **文案**：
  - 標題：「不再用錯誤的技術做資料工程」
  - 副標題：「從 Excel 試算表的困局，到用『開源、有效』的方式打造資料平台」
- **CTA**：
  - 主按鈕：「立即購買」→ /buy
  - 次按鈕：「了解更多」→ 頁面內下滑或 /insights

### 區塊 2：為什麼這本書與眾不同
**三個亮點展示**（卡片並列或垂直排列）

**亮點 1：進階哲學**
- 標題：「Pull Complexity Downwards（將複雜度往下移動）」
- 內容：第九章引用《A Philosophy of Software Design》，說明當下層資料倉儲提供強大功能時，上層 dbt/SQL 如何簡化。涵蓋機敏資料、時變維度、時間旅行等實務應用。
- Icon：📚

**亮點 2：應用優先的分析視角**
- 標題：「從問題出發的資料分析」
- 內容：Part 2 用生活化案例（未婚聯誼、家庭開銷、旅行規劃）說明分析思維。強調領域知識與數據結合，不教常見但受限的技巧，教冷門但實用的方法。
- Icon：💡

**亮點 3：向上資訊管理與變革推動**
- 標題：「如何推動組織做技術變革」
- 內容：Part 3 教你不只是「向上管理」，而是主動管理上級的資訊來源，幫助決策層做出更明智的決定。涵蓋評估新技術的四個面向、有效溝通策略、以及如何在組織內成功推動現代資料棧的導入。
- Icon：🚀

### 區塊 3：讀者推薦
**兩篇讀者反饋**（卡片格式，含五星評分）

**反饋 1**
- 評分：⭐⭐⭐⭐⭐
- 內容：「整體來說，比一般看到的技術書籍更全面、豐富…書的第一部分談 modern data stack，涵蓋了工作場景會遇到的報表需求…」
- 署名：柯達，CEO @ 宇鯨智能

**反饋 2**
- 評分：⭐⭐⭐⭐⭐
- 內容：「Modern Data Stack 的架構讓我能根據實際需求靈活調整開發順序—先在 dbt 做 transformation，跳去建兩條 pipelines…這種隨時切換的彈性，對一人團隊來說是生存的關鍵。」
- 署名：Stacy Lo，Data Solutions Engineer

**提供者授權**：已取得兩位讀者的授權，可在網站上顯示其姓名、職位及所屬組織

### 區塊 4：書籍內容預覽
**精選 3 個摘錄**（源自 digest 資料夾，卡片格式，含「閱讀完整內容」連結至 /preview）

**精選 1：「我還想要更懶惰」（Part 1 資料工程）**
- 簡述：作者作為 Backend Engineer 用 Web 應用技術硬做 BI 報表，花了 180 天。用 Modern Data Stack 只需 60 天。講述錯誤工具選擇的代價，以及更靈活的工具與方法論。
- 來源：digest1.docx → Markdown
- 連結：/preview#digest1

**精選 2：「應用資料的混亂與矛盾」（Part 2 資料分析）**
- 簡述：中小企業常見的資料品質問題——多個部門各自維護不同定義的指標，導致決策混亂。企業常犯的錯誤：沒有為資料品質做合理的投資。
- 來源：digest2.docx → Markdown
- 連結：/preview#digest2

**精選 3：「從想法到行動」（Part 3 管理實務）**
- 簡述：如何將變革管理的知識轉化為實際行動。涵蓋行動計劃制定、績效衡量、建立支持網絡、等待與把握機會。
- 來源：digest3.docx → Markdown
- 連結：/preview#digest3

**內容形式**：Markdown 轉 HTML 網頁展示，不提供下載  
**底部 CTA**：「閱讀完整摘錄」→ /preview，或「購買此書」→ /buy

### 區塊 5：購書資訊
**三個主要渠道**（突出展示，大按鈕）

- **博客來**（實體書 & 電子書）
  - URL：https://www.books.com.tw/products/0011032047
  - 按鈕：[購買]

- **Momo 購物**（實體書）
  - URL：https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=14421677
  - 按鈕：[購買]

- **天瓏網路書店**（實體書）
  - URL：https://www.tenlong.com.tw/products/9786267757284
  - 按鈕：[購買]

**底部 CTA**：「查看全部渠道（電子書、其他通路）」→ /buy

### 區塊 6：Footer CTA
- 文案：「想了解這本書背後的市場背景和趨勢？」
- 說明：包括 Forrester 報告、dbt 行業報告（2024-2026）、作者深度觀點
- CTA：「深度洞察」→ /insights

---

## 4. 深度洞察頁面（/insights）

### 頁面標題 & 簡介
標題：「深度洞察」  
副標題：「為什麼現在需要 Modern Data Stack」

說明：透過市場報告和行業數據，了解 資料平台 如何成為企業競爭力的核心。

### 區塊 1：市場需求痛點

**Forrester Report：「Your Business Is Only As Fast As Your Data」**

- 簡述內容：企業缺乏高效的 data platform、數據孤島阻礙決策速度、傳統工具無法滿足現代需求

- 與書籍的關聯：這份報告說明了你的書所解決的核心問題—企業為什麼需要從 Excel 試算表升級到 Modern Data Stack

- CTA：
  - [閱讀摘錄內容]
  - [下載完整報告] 或 [瀏覽原始來源]

### 區塊 2：行業趨勢演進

**dbt Labs 年度 Analytics Engineering 報告系列**

#### 2024 State of Analytics Engineering
- 重點數據：
  - 57% 組織在處理 AI 訓練數據
  - 57% 認為資料品質是首要問題
- 反映的現象：企業開始重視資料基礎設施的質量
- CTA：[查看詳細報告摘錄]

#### 2025 State of Analytics Engineering
- 重點數據：
  - 30% 報告數據預算增長（↑ 從 9%）
  - 45% 優先投資 AI 工具
  - 40% 資料團隊規模擴大
- 反映的現象：產業認識到 AI 時代需要投資現代的資料基礎設施
- CTA：[查看詳細報告摘錄]

#### 2026 State of Analytics Engineering
- 重點數據：
  - 72% 使用 AI 輔助編碼
  - 83% 認為「信任」最重要（↑ 從 66%）
  - 71% 擔心資料品質和幻覺輸出
  - 只有 24% 投資 AI 管道測試和可觀測性
- 核心發現：**AI 加速了代碼，但減緩了信任**
- 與書籍的關聯：
  - 你的書強調「複雜度往下推」→ 解決質量和治理問題
  - 你的書談「組織設計和變革管理」→ 解決信任和協作問題
  - 你的書強調「應用優先」→ 解決從速度到質量的矛盾
- CTA：[查看詳細報告摘錄]

### 區塊 3：作者洞察

**「AI Agent-Ready Enterprises」**（作者文章）

標題：「從 Modern Data Stack 到 AI 時代企業準備度」

核心觀點：
- AI 智能體的成功不在於模型強度，而在於企業是否「準備好」
- 準備度取決於兩個要素：
  - 即時反饋機制（Feedback）
  - 清晰的信息結構（Context）
- 資料倉儲的元數據定義是基礎
- 需要懂業務、技術和 AI 的人才

與書籍的關聯：
- Part 1：建立結構化的信息基礎
- Part 2：應用優先的分析思維
- Part 3：組織能力和團隊協作

CTA：[閱讀完整文章] → Substack 連結

發佈日期：[插入發佈日期]

### 頁面底部
CTA：「基於這些洞察，了解我們的解決方案」  
按鈕：[返回首頁] [購買此書] [關於作者]

---

## 5. 關於作者頁面（/about）

### 頁面內容
直接使用書中的作者介紹：

---

**陳家宏（Laurence Chen）** 現任睿博資訊負責人，專精於資訊顧問服務。他尤其擅長透過優化基礎設施，提升工程師在資料工程與應用軟體開發領域的生產力。自 2021 年起，他已成功協助多家台灣上市企業及新創公司導入現代資料棧（Modern Data Stack），顯著提升其資料處理與分析效率。

曾任職於歐洲軟體顧問公司 Gaiwan GmbH，在國際專案中接觸前沿技術，累積豐富的跨國協作經驗。他也在多場台灣技術會議擔任講者，分享專業見解與實踐經驗，並積極推動社群發展，為 Clojure Taiwan 及 Taipei dbt Meetup 的線下活動主辦人之一。

---

**聯絡方式：**
- 網站：https://replware.dev
- 電子報：https://replware.substack.com/

---

## 6. 內容預覽頁面（/preview）

### 頁面結構
1. **標題**：「完整內容預覽」
2. **說明**：本書的核心摘錄，讓你深入了解內容。所有內容為網頁在線展示（HTML），不提供下載。
3. **摘錄內容**（按 Part 組織，每個摘錄源自 digest/*.docx 轉換）：
   - **Part 1：資料工程**
     - digest1：「我還想要更懶惰」[HTML 網頁展示]
   - **Part 2：資料分析**
     - digest2：「應用資料的混亂與矛盾」[HTML 網頁展示]
   - **Part 3：管理實務**
     - digest3：「從想法到行動」[HTML 網頁展示]
4. **CTA**：「準備好了嗎？」→ [購買此書] → /buy

### 內容來源與格式
- **來源**：digest 資料夾中的三個 docx 文件（digest1.docx, digest2.docx, digest3.docx）
- **轉換流程**：docx → Markdown → HTML（網頁展示）
- **展示形式**：完整內容在線閱讀，不提供任何下載格式（保護版權、引導購買）

---

## 7. 購買渠道頁面（/buy）

### 頁面結構
1. **標題**：「購買此書」
2. **實體書渠道**：
   - 博客來：https://www.books.com.tw/products/0011032047
   - Momo 購物：https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=14421677
   - 天瓏網路書店：https://www.tenlong.com.tw/products/9786267757284
   - 三民書局：https://www.tcsb.com.tw/SalePage/Index/11121136
   - PChome 24h 購物：https://24h.pchome.com.tw/books/prod/DJAA2V-A900J94ZQ

3. **電子書渠道**：
   - BOOK☆WALKER：https://www.bookwalker.com.tw/product/259038
   - 博客來電子版：https://appapi-ebook.books.com.tw/V1.7/CMSAPIApp/item/0011032047/trial
   - 誠品線上：https://www.eslite.com/product/10072302132683002805002

4. **書籍基本資訊**：
   - ISBN：9786267757284
   - 出版社：深智數位
   - 出版日期：2025 年 9 月 19 日
   - 作者：陳家宏（Laurence Chen）

---

## 8. 技術實現（靜態 HTML + Quickblog 混合）

### 技術棧
- **主頁面**：手寫靜態 HTML/CSS/JS（5 個頁面）
- **Blog**：Quickblog（Babashka 作者 borkdude 開發）— 未來擴展用
- **部署目標**：GitHub Pages
- **CI/CD**：GitHub Actions
- **版本控制**：Git + GitHub

### 架構決策
主頁面（首頁、關於、洞察、預覽、購買）使用純靜態 HTML，原因：
- Quickblog 把所有頁面當 blog 文章處理，路由難以控制
- 行銷網站需要精細的版面設計，靜態 HTML 更靈活
- Blog 功能為未來擴展，目前不需要 SSG

### 專案結構
```
mds_website/
├── resources/               # 靜態原始碼（手寫）
│   ├── index.html           # 首頁
│   ├── about.html
│   ├── insights.html
│   ├── preview.html
│   ├── buy.html
│   ├── css/
│   │   ├── style.css
│   │   └── variables.css
│   ├── js/main.js
│   └── images/cover.jpeg
├── posts/                   # Quickblog blog 文章（未來用）
├── public/                  # 最終輸出（GitHub Pages deploy 對象）
├── bb.edn                   # Quickblog 配置（blog 用）
├── build.sh                 # 建構 script
└── .github/workflows/deploy.yml
```

### Build Script（build.sh）
```bash
#!/bin/bash
set -e
rm -rf public
mkdir -p public
cp -r resources/* public/
# 未來 blog 加上：bb quickblog render
```

### 部署流程
1. 本地開發：直接編輯 `resources/` 下的 HTML/CSS/JS
2. 本地預覽：`./build.sh && cd public && python3 -m http.server 8080`
3. Push 到 GitHub：`git push origin main`
4. GitHub Actions：自動執行 `build.sh`，deploy `public/` 到 GitHub Pages

### 網站上線 URL
`https://laurencechen.github.io/MDS_website`（或自訂網域）

---

## 9. 設計驗證與待辦項目

### 已驗證
✅ 核心主張：「不再用錯誤的技術做資料工程…」  
✅ 三個亮點（Part 1、Part 2、Part 3）已驗證內容準確  
✅ 首頁信息層級和流向  
✅ /insights 與 Forrester 和 dbt Reports 的關聯  
✅ /about 使用書中原文  
✅ 內容預覽形式：網頁在線摘錄（無下載，保護版權）

### 待辦
- [ ] 將 digest/*.docx 轉換為 Markdown 格式（digest1.md, digest2.md, digest3.md）
  - digest1.docx → digest1.md（Part 1 資料工程）
  - digest2.docx → digest2.md（Part 2 資料分析）
  - digest3.docx → digest3.md（Part 3 管理實務）
- [ ] 設計 Hero Section 的視覺布局（書籍封面 + 文案排列）
- [ ] CSS 樣式設計（色彩、字體、響應式設計）
- [ ] 書籍封面高清圖片準備
- [ ] Icon 素材（3 個亮點的 icon：📚 💡 🚀）

---

## 10. 關鍵決策與理由

### 決策 1：首頁簡潔，報告移到 /insights
- **理由**：首頁聚焦「書籍本身」和「為什麼特別」，想深入了解背景的讀者去 /insights。清晰的信息層級，減少認知負荷。
- **影響**：首頁更吸引衝動購買，/insights 吸引想深入理解的專業人士。

### 決策 2：署名方案交由讀者選擇
- **理由**：尊重隱私，同時提供清晰選項。B2B 推廣時讀者身分越清楚說服力越強。
- **影響**：提高讀者推薦的可信度和吸引力。

### 決策 3：三個亮點突出「與眾不同」
- **理由**：市面上資料書很多，需要清楚說明本書的獨特價值。三個亮點覆蓋「進階哲學」「工程思維」「應用視角」，完整呈現書的深度。
- **影響**：幫助目標讀者快速判斷「這本書適不適合我」。

---

## 11. 版權和授權注意事項

- **Forrester 報告**：僅引用摘錄和統計數據，附上原始來源連結
- **dbt Reports**：同樣僅引用摘錄，附上原始來源連結
- **書籍內容**（Digest）：使用公開預覽內容，尊重版權

---

## 12. 後續擴展（未來迭代）

- [ ] Blog 頁面：發佈作者相關的技術文章和洞察
- [ ] Newsletter 訂閱：集成 Substack 訂閱功能
- [ ] 讀者互動：評論、反饋表單
- [ ] 多語言版本：英文版、簡體中文版
- [ ] SEO 優化：關鍵詞、元標籤等

---

**設計文檔完成。**  
**下一步**：請審查此文檔，確認所有內容準確反映我們的設計討論。
