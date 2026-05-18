# MDS Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a hybrid static HTML + Quickblog book promotion website for "從試算表到資料平台", deployed to GitHub Pages.

**Architecture:** `resources/` holds hand-written static HTML/CSS/JS source files. `build.sh` copies them to `public/` (the GitHub Pages deploy target). Blog section is reserved for future Quickblog integration. Nav links use relative paths (e.g. `about.html`, `buy.html`) so the site works both locally and on GitHub Pages.

**Tech Stack:** Static HTML5, CSS custom properties, vanilla JS, GitHub Actions, GitHub Pages. Quickblog (Babashka) reserved for future `/blog`.

---

## File Map

| File | Purpose |
|------|---------|
| `build.sh` | Copy `resources/` → `public/`, extensible for future Quickblog |
| `.gitignore` | Ignore `public/`, `.DS_Store` |
| `resources/css/variables.css` | Design tokens (colors, spacing, typography, shadows) |
| `resources/css/style.css` | All component styles; imports variables.css |
| `resources/js/main.js` | Mobile nav toggle, smooth scroll |
| `resources/images/cover.jpeg` | Book cover (copied from root) |
| `resources/images/favicon/` | Already present from earlier step |
| `resources/documents/Forrester-*.pdf` | Linked from insights page |
| `resources/index.html` | Home page — hero, highlights, testimonials, previews, purchase |
| `resources/about.html` | Author bio |
| `resources/insights.html` | Forrester + dbt reports + author article |
| `resources/preview.html` | Digest excerpts (digest1–3 content from liteparse) |
| `resources/buy.html` | All purchase channels, physical + ebook |
| `.github/workflows/deploy.yml` | Run build.sh, deploy public/ to GitHub Pages |
| `README.md` | Updated project docs |

---

## Task 1: Scaffold — build.sh, .gitignore, assets

**Files:**
- Create: `build.sh`
- Create/Modify: `.gitignore`
- Copy: `cover.jpeg` → `resources/images/cover.jpeg`
- Copy: `Forrester-Your-Business-Is-Only-As-Fast-As-Your-Data.pdf` → `resources/documents/`

- [ ] Create `build.sh`:

```bash
#!/bin/bash
set -e

rm -rf public
mkdir -p public
cp -r resources/* public/

# Future blog section:
# bb quickblog render

echo "Build complete → public/"
```

- [ ] Make executable:

```bash
chmod +x build.sh
```

- [ ] Create `.gitignore`:

```
public/
.DS_Store
*.swp
*~
.idea/
.vscode/
```

- [ ] Copy assets:

```bash
cp cover.jpeg resources/images/cover.jpeg
mkdir -p resources/documents
cp Forrester-Your-Business-Is-Only-As-Fast-As-Your-Data.pdf resources/documents/
```

- [ ] Run build and verify:

```bash
./build.sh
ls public/images/   # should show cover.jpeg
ls public/documents/  # should show Forrester PDF
```

Expected: `Build complete → public/`

- [ ] Commit:

```bash
git add build.sh .gitignore resources/images/cover.jpeg resources/documents/
git commit -m "chore: add build script, gitignore, copy cover and Forrester PDF"
```

---

## Task 2: CSS Design System

**Files:**
- Create: `resources/css/variables.css`
- Create: `resources/css/style.css`

- [ ] Create `resources/css/variables.css`:

```css
:root {
  /* Colors */
  --color-dark:    #0f172a;
  --color-dark-2:  #1e3a5f;
  --color-primary: #2563eb;
  --color-accent:  #f97316;
  --color-bg:      #ffffff;
  --color-surface: #f8fafc;
  --color-text:    #1e293b;
  --color-muted:   #64748b;
  --color-border:  #e2e8f0;
  --color-white:   #ffffff;

  /* Typography */
  --font: 'Noto Sans TC', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;
  --text-4xl:  2.25rem;
  --text-5xl:  3rem;

  /* Spacing */
  --sp-2:  0.5rem;
  --sp-3:  0.75rem;
  --sp-4:  1rem;
  --sp-6:  1.5rem;
  --sp-8:  2rem;
  --sp-12: 3rem;
  --sp-16: 4rem;
  --sp-20: 5rem;
  --sp-24: 6rem;

  /* Borders */
  --radius:    0.5rem;
  --radius-lg: 0.75rem;

  /* Shadows */
  --shadow:    0 1px 3px rgba(0,0,0,.1), 0 1px 2px rgba(0,0,0,.06);
  --shadow-md: 0 4px 6px rgba(0,0,0,.07), 0 2px 4px rgba(0,0,0,.06);
  --shadow-lg: 0 10px 15px rgba(0,0,0,.1), 0 4px 6px rgba(0,0,0,.05);
  --shadow-xl: 0 20px 25px rgba(0,0,0,.1), 0 10px 10px rgba(0,0,0,.04);

  --max-w: 1200px;
}
```

- [ ] Create `resources/css/style.css`:

```css
@import url('variables.css');

/* ── Reset ────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font);
  font-size:   var(--text-base);
  color:       var(--color-text);
  background:  var(--color-bg);
  line-height: 1.7;
}
img { max-width: 100%; height: auto; display: block; }
a   { color: var(--color-primary); text-decoration: none; }
a:hover { text-decoration: underline; }

/* ── Layout ───────────────────────────────────────────────── */
.container {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 var(--sp-6);
}

/* ── Navigation ───────────────────────────────────────────── */
.nav {
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow);
}
.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}
.nav-brand {
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--color-dark);
  white-space: nowrap;
}
.nav-brand:hover { text-decoration: none; color: var(--color-primary); }
.nav-links {
  display: flex;
  list-style: none;
  gap: var(--sp-8);
  align-items: center;
}
.nav-link {
  color: var(--color-text);
  font-weight: 500;
  font-size: var(--text-sm);
  transition: color .2s;
}
.nav-link:hover { color: var(--color-primary); text-decoration: none; }
.nav-link--cta {
  background: var(--color-accent);
  color: var(--color-white);
  padding: var(--sp-2) var(--sp-4);
  border-radius: var(--radius);
  font-weight: 600;
}
.nav-link--cta:hover { background: #ea6c04; color: white; text-decoration: none; }
.nav-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text);
}

/* ── Buttons ──────────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--sp-3) var(--sp-6);
  border-radius: var(--radius);
  font-weight: 600;
  font-size: var(--text-base);
  cursor: pointer;
  transition: transform .15s, opacity .15s, box-shadow .15s;
  text-decoration: none;
  border: 2px solid transparent;
  white-space: nowrap;
}
.btn:hover { transform: translateY(-1px); box-shadow: var(--shadow-md); text-decoration: none; }
.btn:active { transform: none; }
.btn--primary { background: var(--color-primary); color: white; border-color: var(--color-primary); }
.btn--primary:hover { background: #1d4ed8; border-color: #1d4ed8; color: white; }
.btn--secondary { background: transparent; color: var(--color-primary); border-color: var(--color-primary); }
.btn--secondary:hover { background: var(--color-primary); color: white; }
.btn--accent { background: var(--color-accent); color: white; border-color: var(--color-accent); }
.btn--accent:hover { background: #ea6c04; border-color: #ea6c04; color: white; }
.btn--outline-white { background: transparent; color: white; border-color: rgba(255,255,255,.7); }
.btn--outline-white:hover { background: rgba(255,255,255,.15); border-color: white; color: white; }
.btn--lg { padding: var(--sp-4) var(--sp-8); font-size: var(--text-lg); }

/* ── Hero ─────────────────────────────────────────────────── */
.hero {
  background: linear-gradient(135deg, var(--color-dark) 0%, var(--color-dark-2) 100%);
  color: white;
  padding: var(--sp-24) 0;
}
.hero-inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--sp-16);
  align-items: center;
}
.hero-eyebrow {
  font-size: var(--text-sm);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: var(--color-accent);
  margin-bottom: var(--sp-4);
}
.hero-title {
  font-size: var(--text-5xl);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: var(--sp-6);
}
.hero-subtitle {
  font-size: var(--text-xl);
  color: rgba(255,255,255,.8);
  margin-bottom: var(--sp-8);
  line-height: 1.6;
}
.hero-actions { display: flex; gap: var(--sp-4); flex-wrap: wrap; }
.book-cover {
  width: 280px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
}

/* ── Sections ─────────────────────────────────────────────── */
.section { padding: var(--sp-20) 0; }
.section--light { background: var(--color-surface); }
.section--dark {
  background: linear-gradient(135deg, var(--color-dark) 0%, var(--color-dark-2) 100%);
  color: white;
}
.section-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  text-align: center;
  margin-bottom: var(--sp-12);
  color: var(--color-dark);
}
.section--dark .section-title { color: white; }
.section-cta { display: flex; gap: var(--sp-4); justify-content: center; margin-top: var(--sp-12); }

/* ── Page header (inner pages) ────────────────────────────── */
.page-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: var(--sp-12) 0;
}
.page-header h1 {
  font-size: var(--text-4xl);
  font-weight: 700;
  color: var(--color-dark);
}
.page-header p {
  color: var(--color-muted);
  font-size: var(--text-xl);
  margin-top: var(--sp-4);
  max-width: 600px;
}

/* ── Cards ────────────────────────────────────────────────── */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-6);
}
.card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--sp-8);
  transition: box-shadow .2s, transform .2s;
}
.card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }
.card--highlight .card-icon { font-size: 2rem; margin-bottom: var(--sp-4); }
.card-label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: .05em;
  margin-bottom: var(--sp-2);
}
.card-title {
  font-size: var(--text-xl);
  font-weight: 700;
  margin-bottom: var(--sp-3);
  color: var(--color-dark);
}
.card-desc { color: var(--color-muted); font-size: var(--text-base); line-height: 1.7; }
.card-link { display: inline-block; margin-top: var(--sp-4); font-weight: 600; color: var(--color-primary); }
.card-link:hover { text-decoration: underline; }

/* ── Testimonials ─────────────────────────────────────────── */
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--sp-8);
}
.testimonial {
  background: white;
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-primary);
  border-radius: var(--radius-lg);
  padding: var(--sp-8);
  box-shadow: var(--shadow);
}
.testimonial-stars { font-size: var(--text-lg); margin-bottom: var(--sp-4); }
.testimonial-text {
  font-size: var(--text-lg);
  line-height: 1.7;
  color: var(--color-text);
  margin-bottom: var(--sp-6);
  font-style: italic;
}
.testimonial-author { font-weight: 700; color: var(--color-dark); }
.testimonial-role { font-weight: 400; color: var(--color-muted); margin-left: var(--sp-2); }

/* ── Purchase cards ───────────────────────────────────────── */
.purchase-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sp-6);
}
.purchase-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--sp-4);
  background: white;
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--sp-8);
  text-align: center;
  transition: border-color .2s, box-shadow .2s, transform .2s;
  text-decoration: none;
}
.purchase-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
  text-decoration: none;
}
.purchase-name { font-size: var(--text-xl); font-weight: 700; color: var(--color-dark); }
.purchase-type { font-size: var(--text-sm); color: var(--color-muted); }

/* ── Insights / report cards ──────────────────────────────── */
.report-block {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--sp-8);
  margin-bottom: var(--sp-8);
}
.report-block h3 { font-size: var(--text-2xl); font-weight: 700; color: var(--color-dark); margin-bottom: var(--sp-4); }
.report-block p { color: var(--color-muted); margin-bottom: var(--sp-4); }
.stat-row { display: flex; flex-wrap: wrap; gap: var(--sp-4); margin: var(--sp-6) 0; }
.stat {
  background: var(--color-surface);
  border-radius: var(--radius);
  padding: var(--sp-4) var(--sp-6);
  text-align: center;
  min-width: 160px;
}
.stat-number { font-size: var(--text-3xl); font-weight: 700; color: var(--color-primary); display: block; }
.stat-label { font-size: var(--text-sm); color: var(--color-muted); margin-top: var(--sp-2); }

/* ── Prose (preview / digest pages) ──────────────────────── */
.prose { max-width: 720px; margin: 0 auto; }
.prose h2 { font-size: var(--text-2xl); font-weight: 700; color: var(--color-dark); margin: var(--sp-8) 0 var(--sp-4); }
.prose h3 { font-size: var(--text-xl); font-weight: 600; color: var(--color-dark); margin: var(--sp-6) 0 var(--sp-3); }
.prose p  { margin-bottom: var(--sp-4); color: var(--color-text); }
.prose ul, .prose ol { padding-left: var(--sp-6); margin-bottom: var(--sp-4); }
.prose li { margin-bottom: var(--sp-2); }
.prose blockquote {
  border-left: 4px solid var(--color-primary);
  padding-left: var(--sp-6);
  color: var(--color-muted);
  font-style: italic;
  margin: var(--sp-6) 0;
}
.digest-section {
  border-top: 2px solid var(--color-border);
  padding-top: var(--sp-12);
  margin-top: var(--sp-12);
}
.digest-section:first-child { border-top: none; padding-top: 0; margin-top: 0; }

/* ── Text utilities ───────────────────────────────────────── */
.text-center { text-align: center; }
.text-white  { color: white; }
.text-muted-light { color: rgba(255,255,255,.7); }
.mt-4  { margin-top: var(--sp-4); }
.mt-8  { margin-top: var(--sp-8); }
.mt-12 { margin-top: var(--sp-12); }
.link  { color: var(--color-primary); font-size: var(--text-sm); font-weight: 500; }
.link:hover { text-decoration: underline; }

/* ── Footer ───────────────────────────────────────────────── */
.footer {
  background: var(--color-dark);
  color: rgba(255,255,255,.7);
  padding: var(--sp-8) 0;
}
.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--sp-6);
}
.footer-meta { font-size: var(--text-sm); margin-top: var(--sp-2); color: rgba(255,255,255,.5); }
.footer-links { display: flex; gap: var(--sp-6); }
.footer-links a { color: rgba(255,255,255,.7); font-size: var(--text-sm); transition: color .2s; }
.footer-links a:hover { color: white; text-decoration: none; }

/* ── Responsive ───────────────────────────────────────────── */
@media (max-width: 1024px) {
  .card-grid,
  .purchase-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .hero-inner { grid-template-columns: 1fr; text-align: center; }
  .hero-book  { display: flex; justify-content: center; order: -1; }
  .book-cover { width: 200px; }
  .hero-title { font-size: var(--text-4xl); }
  .hero-actions { justify-content: center; }

  .card-grid,
  .purchase-grid,
  .testimonial-grid { grid-template-columns: 1fr; }

  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 64px; left: 0; right: 0;
    background: white;
    padding: var(--sp-4);
    border-bottom: 1px solid var(--color-border);
    box-shadow: var(--shadow-md);
    gap: var(--sp-4);
  }
  .nav-links.is-open { display: flex; }
  .nav-toggle { display: block; }

  .footer-inner { flex-direction: column; text-align: center; }
  .section-title { font-size: var(--text-2xl); }
  .hero-title { font-size: var(--text-3xl); }
  .stat-row { justify-content: center; }
}
```

- [ ] Run build and open in browser to confirm CSS file loads without errors (open `public/index.html` — it won't look right yet since no HTML, but DevTools should show no 404 for the CSS file):

```bash
./build.sh
open public/index.html  # or: python3 -m http.server 8080 -d public
```

- [ ] Commit:

```bash
git add resources/css/
git commit -m "style: add design system CSS with variables and components"
```

---

## Task 3: Home Page (index.html)

**File:** `resources/index.html`

- [ ] Create `resources/index.html`:

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="從試算表到資料平台 — 用開源、有效的方式打造 Modern Data Stack">
  <title>從試算表到資料平台</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="icon" href="images/favicon/favicon.ico">
</head>
<body>

<nav class="nav">
  <div class="container nav-inner">
    <a href="index.html" class="nav-brand">從試算表到資料平台</a>
    <button class="nav-toggle" aria-label="開啟選單">&#9776;</button>
    <ul class="nav-links">
      <li><a href="index.html" class="nav-link">首頁</a></li>
      <li><a href="about.html" class="nav-link">關於</a></li>
      <li><a href="insights.html" class="nav-link">深度洞察</a></li>
      <li><a href="preview.html" class="nav-link">內容預覽</a></li>
      <li><a href="buy.html" class="nav-link nav-link--cta">購買</a></li>
    </ul>
  </div>
</nav>

<!-- Hero -->
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-content">
      <p class="hero-eyebrow">Modern Data Stack 實戰指南</p>
      <h1 class="hero-title">不再用錯誤的技術做資料工程</h1>
      <p class="hero-subtitle">從 Excel 試算表的困局，到用「開源、有效」的方式打造資料平台</p>
      <div class="hero-actions">
        <a href="buy.html" class="btn btn--accent btn--lg">立即購買</a>
        <a href="insights.html" class="btn btn--outline-white btn--lg">了解更多</a>
      </div>
    </div>
    <div class="hero-book">
      <img src="images/cover.jpeg" alt="從試算表到資料平台 書籍封面" class="book-cover">
    </div>
  </div>
</section>

<!-- Why Different -->
<section class="section section--light" id="highlights">
  <div class="container">
    <h2 class="section-title">為什麼這本書與眾不同</h2>
    <div class="card-grid">
      <div class="card card--highlight">
        <div class="card-icon">📚</div>
        <h3 class="card-title">Pull Complexity Downwards</h3>
        <p class="card-desc">第九章引用《A Philosophy of Software Design》，說明當下層資料倉儲提供強大功能時，上層 dbt/SQL 如何簡化。涵蓋機敏資料、時變維度、時間旅行等實務應用。</p>
      </div>
      <div class="card card--highlight">
        <div class="card-icon">💡</div>
        <h3 class="card-title">從問題出發的資料分析</h3>
        <p class="card-desc">Part 2 用生活化案例（未婚聯誼、家庭開銷、旅行規劃）說明分析思維。強調領域知識與數據結合，不教常見但受限的技巧，教冷門但實用的方法。</p>
      </div>
      <div class="card card--highlight">
        <div class="card-icon">🚀</div>
        <h3 class="card-title">如何推動組織做技術變革</h3>
        <p class="card-desc">Part 3 教你不只是「向上管理」，而是主動管理上級的資訊來源，幫助決策層做出更明智的決定。涵蓋評估新技術的四個面向、有效溝通策略。</p>
      </div>
    </div>
  </div>
</section>

<!-- Testimonials -->
<section class="section" id="testimonials">
  <div class="container">
    <h2 class="section-title">讀者推薦</h2>
    <div class="testimonial-grid">
      <div class="testimonial">
        <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
        <p class="testimonial-text">「整體來說，比一般看到的技術書籍更全面、豐富⋯書的第一部分談 modern data stack，涵蓋了工作場景會遇到的報表需求，一方面全面地介紹 dbt, dlt, metabase 等工具，同時延伸到資料除錯、N+1 problem、Complexity pushdown 等實務問題⋯」</p>
        <p class="testimonial-author">柯達 <span class="testimonial-role">CEO @ <a href="https://yujing.io/" target="_blank" rel="noopener">宇鯨智能</a></span></p>
      </div>
      <div class="testimonial">
        <div class="testimonial-stars">⭐⭐⭐⭐⭐</div>
        <p class="testimonial-text">「Modern Data Stack 的架構讓我能根據實際需求靈活調整開發順序—先在 dbt 做 transformation，跳去建兩條 pipelines⋯這種隨時切換的彈性，對一人團隊來說是生存的關鍵。」</p>
        <p class="testimonial-author">Stacy Lo <span class="testimonial-role">Data Solutions Engineer</span></p>
      </div>
    </div>
  </div>
</section>

<!-- Content Preview -->
<section class="section section--light" id="preview">
  <div class="container">
    <h2 class="section-title">書籍內容預覽</h2>
    <div class="card-grid">
      <div class="card">
        <p class="card-label">Part 1 · 資料工程</p>
        <h3 class="card-title">我還想要更懶惰</h3>
        <p class="card-desc">作者作為 Backend Engineer 用 Web 應用技術硬做 BI 報表，花了 180 天。用 Modern Data Stack 只需 60 天。講述錯誤工具選擇的代價，以及更靈活的工具與方法論。</p>
        <a href="preview.html#digest1" class="card-link">閱讀摘錄 →</a>
      </div>
      <div class="card">
        <p class="card-label">Part 2 · 資料分析</p>
        <h3 class="card-title">應用資料的混亂與矛盾</h3>
        <p class="card-desc">中小企業常見的資料品質問題——多個部門各自維護不同定義的指標，導致決策混亂。企業常犯的錯誤：沒有為資料品質做合理的投資。</p>
        <a href="preview.html#digest2" class="card-link">閱讀摘錄 →</a>
      </div>
      <div class="card">
        <p class="card-label">Part 3 · 管理實務</p>
        <h3 class="card-title">從想法到行動</h3>
        <p class="card-desc">如何將變革管理的知識轉化為實際行動。涵蓋行動計劃制定、績效衡量、建立支持網絡、等待與把握機會。</p>
        <a href="preview.html#digest3" class="card-link">閱讀摘錄 →</a>
      </div>
    </div>
    <div class="section-cta">
      <a href="preview.html" class="btn btn--secondary">閱讀完整摘錄</a>
      <a href="buy.html" class="btn btn--primary">購買此書</a>
    </div>
  </div>
</section>

<!-- Purchase quick links -->
<section class="section" id="buy">
  <div class="container">
    <h2 class="section-title">立即購買</h2>
    <div class="purchase-grid">
      <a href="https://www.books.com.tw/products/0011032047" class="purchase-card" target="_blank" rel="noopener">
        <span class="purchase-name">博客來</span>
        <span class="purchase-type">實體書 &amp; 電子書</span>
        <span class="btn btn--primary">購買</span>
      </a>
      <a href="https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=14421677" class="purchase-card" target="_blank" rel="noopener">
        <span class="purchase-name">Momo 購物</span>
        <span class="purchase-type">實體書</span>
        <span class="btn btn--primary">購買</span>
      </a>
      <a href="https://www.tenlong.com.tw/products/9786267757284" class="purchase-card" target="_blank" rel="noopener">
        <span class="purchase-name">天瓏網路書店</span>
        <span class="purchase-type">實體書</span>
        <span class="btn btn--primary">購買</span>
      </a>
    </div>
    <div class="section-cta">
      <a href="buy.html" class="link">查看全部購買渠道（電子書、其他通路）→</a>
    </div>
  </div>
</section>

<!-- Insights teaser -->
<section class="section section--dark">
  <div class="container text-center">
    <h2 class="section-title">想了解這本書背後的市場背景和趨勢？</h2>
    <p class="text-muted-light mt-4">包括 Forrester 報告、dbt 行業報告（2024–2026）、作者深度觀點</p>
    <div class="mt-8">
      <a href="insights.html" class="btn btn--accent btn--lg">深度洞察</a>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="container footer-inner">
    <div>
      <p>&copy; 2026 Laurence Chen. All rights reserved.</p>
      <p class="footer-meta">ISBN: 9786267757284 | 出版社：深智數位</p>
    </div>
    <div class="footer-links">
      <a href="https://replware.dev" target="_blank" rel="noopener">網站</a>
      <a href="https://replware.substack.com" target="_blank" rel="noopener">電子報</a>
      <a href="buy.html">購買</a>
    </div>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] Build and visually verify:

```bash
./build.sh
python3 -m http.server 8080 -d public
# open http://localhost:8080
```

Check: hero section shows book cover on right with dark background, nav is horizontal with orange 購買 button, 3 highlight cards visible.

- [ ] Commit:

```bash
git add resources/index.html
git commit -m "feat: add home page with hero, highlights, testimonials, previews, purchase"
```

---

## Task 4: About Page

**File:** `resources/about.html`

- [ ] Create `resources/about.html`:

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="關於作者 陳家宏（Laurence Chen）— 從試算表到資料平台">
  <title>關於作者 — 從試算表到資料平台</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="icon" href="images/favicon/favicon.ico">
</head>
<body>

<nav class="nav">
  <div class="container nav-inner">
    <a href="index.html" class="nav-brand">從試算表到資料平台</a>
    <button class="nav-toggle" aria-label="開啟選單">&#9776;</button>
    <ul class="nav-links">
      <li><a href="index.html" class="nav-link">首頁</a></li>
      <li><a href="about.html" class="nav-link">關於</a></li>
      <li><a href="insights.html" class="nav-link">深度洞察</a></li>
      <li><a href="preview.html" class="nav-link">內容預覽</a></li>
      <li><a href="buy.html" class="nav-link nav-link--cta">購買</a></li>
    </ul>
  </div>
</nav>

<header class="page-header">
  <div class="container">
    <h1>關於作者</h1>
    <p>陳家宏（Laurence Chen）</p>
  </div>
</header>

<main class="section">
  <div class="container prose">
    <p>現任睿博資訊負責人，專精於資訊顧問服務。他尤其擅長透過優化基礎設施，提升工程師在資料工程與應用軟體開發領域的生產力。自 2021 年起，他已成功協助多家台灣上市企業及新創公司導入現代資料棧（Modern Data Stack），顯著提升其資料處理與分析效率。</p>
    <p>曾任職於歐洲軟體顧問公司 Gaiwan GmbH，在國際專案中接觸前沿技術，累積豐富的跨國協作經驗。他也在多場台灣技術會議擔任講者，分享專業見解與實踐經驗，並積極推動社群發展，為 Clojure Taiwan 及 Taipei dbt Meetup 的線下活動主辦人之一。</p>
    <h2>聯絡方式</h2>
    <ul>
      <li><a href="https://replware.dev" target="_blank" rel="noopener">網站：replware.dev</a></li>
      <li><a href="https://replware.substack.com" target="_blank" rel="noopener">電子報：replware.substack.com</a></li>
    </ul>
    <div style="display:flex;gap:1rem;margin-top:3rem;">
      <a href="buy.html" class="btn btn--primary">購買此書</a>
      <a href="insights.html" class="btn btn--secondary">深度洞察</a>
      <a href="index.html" class="btn btn--secondary">返回首頁</a>
    </div>
  </div>
</main>

<footer class="footer">
  <div class="container footer-inner">
    <div>
      <p>&copy; 2026 Laurence Chen. All rights reserved.</p>
      <p class="footer-meta">ISBN: 9786267757284 | 出版社：深智數位</p>
    </div>
    <div class="footer-links">
      <a href="https://replware.dev" target="_blank" rel="noopener">網站</a>
      <a href="https://replware.substack.com" target="_blank" rel="noopener">電子報</a>
      <a href="buy.html">購買</a>
    </div>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] Build and verify author bio renders, nav links work:

```bash
./build.sh && open http://localhost:8080/about.html
```

- [ ] Commit:

```bash
git add resources/about.html
git commit -m "feat: add about page with author bio"
```

---

## Task 5: Insights Page

**File:** `resources/insights.html`

- [ ] Create `resources/insights.html`:

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="深度洞察 — 為什麼現在需要 Modern Data Stack">
  <title>深度洞察 — 從試算表到資料平台</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="icon" href="images/favicon/favicon.ico">
</head>
<body>

<nav class="nav">
  <div class="container nav-inner">
    <a href="index.html" class="nav-brand">從試算表到資料平台</a>
    <button class="nav-toggle" aria-label="開啟選單">&#9776;</button>
    <ul class="nav-links">
      <li><a href="index.html" class="nav-link">首頁</a></li>
      <li><a href="about.html" class="nav-link">關於</a></li>
      <li><a href="insights.html" class="nav-link">深度洞察</a></li>
      <li><a href="preview.html" class="nav-link">內容預覽</a></li>
      <li><a href="buy.html" class="nav-link nav-link--cta">購買</a></li>
    </ul>
  </div>
</nav>

<header class="page-header">
  <div class="container">
    <h1>深度洞察</h1>
    <p>透過市場報告和行業數據，了解資料平台如何成為企業競爭力的核心。</p>
  </div>
</header>

<main>

  <!-- Forrester -->
  <section class="section section--light">
    <div class="container">
      <h2 class="section-title" style="text-align:left;">市場需求痛點</h2>
      <div class="report-block">
        <h3>Forrester：「Your Business Is Only As Fast As Your Data」</h3>
        <p>企業缺乏高效的 data platform、數據孤島阻礙決策速度、傳統工具無法滿足現代需求。這份報告說明了本書所解決的核心問題——企業為什麼需要從 Excel 試算表升級到 Modern Data Stack。</p>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;margin-top:1.5rem;">
          <a href="documents/Forrester-Your-Business-Is-Only-As-Fast-As-Your-Data.pdf" class="btn btn--primary" target="_blank" rel="noopener">下載完整報告 PDF</a>
        </div>
      </div>
    </div>
  </section>

  <!-- dbt Reports -->
  <section class="section">
    <div class="container">
      <h2 class="section-title" style="text-align:left;">行業趨勢演進</h2>

      <div class="report-block">
        <h3>2024 State of Analytics Engineering</h3>
        <p>企業開始重視資料基礎設施的質量。</p>
        <div class="stat-row">
          <div class="stat">
            <span class="stat-number">57%</span>
            <span class="stat-label">組織在處理 AI 訓練數據</span>
          </div>
          <div class="stat">
            <span class="stat-number">57%</span>
            <span class="stat-label">認為資料品質是首要問題</span>
          </div>
        </div>
      </div>

      <div class="report-block">
        <h3>2025 State of Analytics Engineering</h3>
        <p>產業認識到 AI 時代需要投資現代的資料基礎設施。</p>
        <div class="stat-row">
          <div class="stat">
            <span class="stat-number">30%</span>
            <span class="stat-label">報告數據預算增長（↑ 從 9%）</span>
          </div>
          <div class="stat">
            <span class="stat-number">45%</span>
            <span class="stat-label">優先投資 AI 工具</span>
          </div>
          <div class="stat">
            <span class="stat-number">40%</span>
            <span class="stat-label">資料團隊規模擴大</span>
          </div>
        </div>
      </div>

      <div class="report-block">
        <h3>2026 State of Analytics Engineering</h3>
        <p><strong>核心發現：AI 加速了程式碼，但減緩了信任。</strong>與本書的關聯：複雜度往下推 → 解決質量和治理問題；組織設計和變革管理 → 解決信任和協作問題；應用優先 → 解決從速度到質量的矛盾。</p>
        <div class="stat-row">
          <div class="stat">
            <span class="stat-number">72%</span>
            <span class="stat-label">使用 AI 輔助編碼</span>
          </div>
          <div class="stat">
            <span class="stat-number">83%</span>
            <span class="stat-label">認為「信任」最重要（↑ 從 66%）</span>
          </div>
          <div class="stat">
            <span class="stat-number">71%</span>
            <span class="stat-label">擔心資料品質和幻覺輸出</span>
          </div>
          <div class="stat">
            <span class="stat-number">24%</span>
            <span class="stat-label">投資 AI 管道測試和可觀測性</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Author insight -->
  <section class="section section--light">
    <div class="container">
      <h2 class="section-title" style="text-align:left;">作者洞察</h2>
      <div class="report-block">
        <h3>AI Agent-Ready Enterprises</h3>
        <p>從 Modern Data Stack 到 AI 時代企業準備度。AI 智能體的成功不在於模型強度，而在於企業是否「準備好」。準備度取決於兩個要素：<strong>即時反饋機制（Feedback）</strong>與<strong>清晰的信息結構（Context）</strong>。資料倉儲的元數據定義是基礎。需要懂業務、技術和 AI 的人才。</p>
        <p>與本書的關聯：Part 1 建立結構化的信息基礎；Part 2 應用優先的分析思維；Part 3 組織能力和團隊協作。</p>
        <div style="margin-top:1.5rem;">
          <a href="https://replware.substack.com" class="btn btn--secondary" target="_blank" rel="noopener">閱讀完整文章</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Bottom CTA -->
  <section class="section">
    <div class="container text-center">
      <h2 class="section-title">基於這些洞察，了解我們的解決方案</h2>
      <div class="section-cta">
        <a href="index.html" class="btn btn--secondary">返回首頁</a>
        <a href="buy.html" class="btn btn--primary">購買此書</a>
        <a href="about.html" class="btn btn--secondary">關於作者</a>
      </div>
    </div>
  </section>

</main>

<footer class="footer">
  <div class="container footer-inner">
    <div>
      <p>&copy; 2026 Laurence Chen. All rights reserved.</p>
      <p class="footer-meta">ISBN: 9786267757284 | 出版社：深智數位</p>
    </div>
    <div class="footer-links">
      <a href="https://replware.dev" target="_blank" rel="noopener">網站</a>
      <a href="https://replware.substack.com" target="_blank" rel="noopener">電子報</a>
      <a href="buy.html">購買</a>
    </div>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] Build and verify stats cards render, Forrester PDF link present:

```bash
./build.sh && open http://localhost:8080/insights.html
```

- [ ] Commit:

```bash
git add resources/insights.html
git commit -m "feat: add insights page with Forrester, dbt reports, author article"
```

---

## Task 6: Digest Conversion + Preview Page

**Files:**
- Create: `resources/preview.html`
- Source: `digest/digest1.docx`, `digest/digest2.docx`, `digest/digest3.docx`

The digest files must be converted from .docx to plain text/HTML using the `liteparse` skill before writing this page. Follow these steps exactly:

- [ ] Invoke the `liteparse` skill on `digest/digest1.docx`. Extract the full text content. Keep all headings, paragraphs, and formatting.

- [ ] Invoke the `liteparse` skill on `digest/digest2.docx`. Extract full text content.

- [ ] Invoke the `liteparse` skill on `digest/digest3.docx`. Extract full text content.

- [ ] Create `resources/preview.html`, inserting the three digest texts into the `<!-- DIGEST N CONTENT -->` sections below. Convert markdown-style headings to `<h2>`/`<h3>` tags and paragraphs to `<p>` tags. Preserve all content:

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="完整內容預覽 — 從試算表到資料平台書籍摘錄">
  <title>內容預覽 — 從試算表到資料平台</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="icon" href="images/favicon/favicon.ico">
</head>
<body>

<nav class="nav">
  <div class="container nav-inner">
    <a href="index.html" class="nav-brand">從試算表到資料平台</a>
    <button class="nav-toggle" aria-label="開啟選單">&#9776;</button>
    <ul class="nav-links">
      <li><a href="index.html" class="nav-link">首頁</a></li>
      <li><a href="about.html" class="nav-link">關於</a></li>
      <li><a href="insights.html" class="nav-link">深度洞察</a></li>
      <li><a href="preview.html" class="nav-link">內容預覽</a></li>
      <li><a href="buy.html" class="nav-link nav-link--cta">購買</a></li>
    </ul>
  </div>
</nav>

<header class="page-header">
  <div class="container">
    <h1>完整內容預覽</h1>
    <p>本書的核心摘錄，讓你深入了解內容。所有內容為網頁在線展示，不提供下載。</p>
  </div>
</header>

<main class="section">
  <div class="container prose">

    <div class="digest-section" id="digest1">
      <p class="card-label">Part 1 · 資料工程</p>
      <h2>我還想要更懶惰</h2>
      <!-- DIGEST 1 CONTENT — insert liteparse output here as <p>, <h3>, <ul> etc. -->
    </div>

    <div class="digest-section" id="digest2">
      <p class="card-label">Part 2 · 資料分析</p>
      <h2>應用資料的混亂與矛盾</h2>
      <!-- DIGEST 2 CONTENT — insert liteparse output here -->
    </div>

    <div class="digest-section" id="digest3">
      <p class="card-label">Part 3 · 管理實務</p>
      <h2>從想法到行動</h2>
      <!-- DIGEST 3 CONTENT — insert liteparse output here -->
    </div>

    <div class="digest-section text-center">
      <h2>準備好了嗎？</h2>
      <p style="color:var(--color-muted);margin-bottom:2rem;">閱讀完完整摘錄後，是時候擁有這本書了。</p>
      <a href="buy.html" class="btn btn--accent btn--lg">立即購買</a>
    </div>

  </div>
</main>

<footer class="footer">
  <div class="container footer-inner">
    <div>
      <p>&copy; 2026 Laurence Chen. All rights reserved.</p>
      <p class="footer-meta">ISBN: 9786267757284 | 出版社：深智數位</p>
    </div>
    <div class="footer-links">
      <a href="https://replware.dev" target="_blank" rel="noopener">網站</a>
      <a href="https://replware.substack.com" target="_blank" rel="noopener">電子報</a>
      <a href="buy.html">購買</a>
    </div>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] Build and verify all 3 digest sections display with content, anchor links from index.html work:

```bash
./build.sh
open "http://localhost:8080/preview.html#digest1"
open "http://localhost:8080/preview.html#digest2"
open "http://localhost:8080/preview.html#digest3"
```

- [ ] Commit:

```bash
git add resources/preview.html
git commit -m "feat: add preview page with digest content"
```

---

## Task 7: Buy Page

**File:** `resources/buy.html`

- [ ] Create `resources/buy.html`:

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="購買《從試算表到資料平台》— 多個購買渠道">
  <title>購買此書 — 從試算表到資料平台</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="icon" href="images/favicon/favicon.ico">
</head>
<body>

<nav class="nav">
  <div class="container nav-inner">
    <a href="index.html" class="nav-brand">從試算表到資料平台</a>
    <button class="nav-toggle" aria-label="開啟選單">&#9776;</button>
    <ul class="nav-links">
      <li><a href="index.html" class="nav-link">首頁</a></li>
      <li><a href="about.html" class="nav-link">關於</a></li>
      <li><a href="insights.html" class="nav-link">深度洞察</a></li>
      <li><a href="preview.html" class="nav-link">內容預覽</a></li>
      <li><a href="buy.html" class="nav-link nav-link--cta">購買</a></li>
    </ul>
  </div>
</nav>

<header class="page-header">
  <div class="container">
    <h1>購買此書</h1>
    <p>ISBN: 9786267757284 ｜ 出版社：深智數位 ｜ 出版日期：2025 年 9 月 19 日</p>
  </div>
</header>

<main>

  <section class="section section--light">
    <div class="container">
      <h2 class="section-title">實體書</h2>
      <div class="purchase-grid">
        <a href="https://www.books.com.tw/products/0011032047" class="purchase-card" target="_blank" rel="noopener">
          <span class="purchase-name">博客來</span>
          <span class="purchase-type">實體書 &amp; 電子書</span>
          <span class="btn btn--primary">前往購買</span>
        </a>
        <a href="https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=14421677" class="purchase-card" target="_blank" rel="noopener">
          <span class="purchase-name">Momo 購物</span>
          <span class="purchase-type">實體書</span>
          <span class="btn btn--primary">前往購買</span>
        </a>
        <a href="https://www.tenlong.com.tw/products/9786267757284" class="purchase-card" target="_blank" rel="noopener">
          <span class="purchase-name">天瓏網路書店</span>
          <span class="purchase-type">實體書</span>
          <span class="btn btn--primary">前往購買</span>
        </a>
        <a href="https://www.tcsb.com.tw/SalePage/Index/11121136" class="purchase-card" target="_blank" rel="noopener">
          <span class="purchase-name">三民書局</span>
          <span class="purchase-type">實體書</span>
          <span class="btn btn--primary">前往購買</span>
        </a>
        <a href="https://24h.pchome.com.tw/books/prod/DJAA2V-A900J94ZQ" class="purchase-card" target="_blank" rel="noopener">
          <span class="purchase-name">PChome 24h</span>
          <span class="purchase-type">實體書</span>
          <span class="btn btn--primary">前往購買</span>
        </a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2 class="section-title">電子書</h2>
      <div class="purchase-grid">
        <a href="https://www.bookwalker.com.tw/product/259038" class="purchase-card" target="_blank" rel="noopener">
          <span class="purchase-name">BOOK☆WALKER</span>
          <span class="purchase-type">電子書</span>
          <span class="btn btn--primary">前往購買</span>
        </a>
        <a href="https://appapi-ebook.books.com.tw/V1.7/CMSAPIApp/item/0011032047/trial" class="purchase-card" target="_blank" rel="noopener">
          <span class="purchase-name">博客來電子版</span>
          <span class="purchase-type">電子書</span>
          <span class="btn btn--primary">前往購買</span>
        </a>
        <a href="https://www.eslite.com/product/10072302132683002805002" class="purchase-card" target="_blank" rel="noopener">
          <span class="purchase-name">誠品線上</span>
          <span class="purchase-type">電子書</span>
          <span class="btn btn--primary">前往購買</span>
        </a>
      </div>
    </div>
  </section>

  <section class="section section--light">
    <div class="container text-center">
      <h2 class="section-title">深入了解</h2>
      <div class="section-cta">
        <a href="preview.html" class="btn btn--secondary">完整內容預覽</a>
        <a href="insights.html" class="btn btn--secondary">深度洞察</a>
        <a href="about.html" class="btn btn--secondary">關於作者</a>
      </div>
    </div>
  </section>

</main>

<footer class="footer">
  <div class="container footer-inner">
    <div>
      <p>&copy; 2026 Laurence Chen. All rights reserved.</p>
      <p class="footer-meta">ISBN: 9786267757284 | 出版社：深智數位</p>
    </div>
    <div class="footer-links">
      <a href="https://replware.dev" target="_blank" rel="noopener">網站</a>
      <a href="https://replware.substack.com" target="_blank" rel="noopener">電子報</a>
      <a href="buy.html">購買</a>
    </div>
  </div>
</footer>

<script src="js/main.js"></script>
</body>
</html>
```

- [ ] Build and verify all 8 purchase cards appear (5 physical + 3 ebook):

```bash
./build.sh && open http://localhost:8080/buy.html
```

- [ ] Commit:

```bash
git add resources/buy.html
git commit -m "feat: add buy page with physical and ebook purchase channels"
```

---

## Task 8: JavaScript — Mobile Nav + Smooth Scroll

**File:** `resources/js/main.js`

- [ ] Create `resources/js/main.js`:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('is-open');
    });
    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        links.classList.remove('is-open');
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav')) {
        links.classList.remove('is-open');
      }
    });
  }
});
```

- [ ] Build, resize browser to mobile width (< 768px), verify hamburger button appears and opens/closes the nav menu:

```bash
./build.sh && open http://localhost:8080
```

- [ ] Commit:

```bash
git add resources/js/main.js
git commit -m "feat: add JS for mobile nav toggle"
```

---

## Task 9: GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

- [ ] Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build site
        run: bash build.sh

      - uses: actions/upload-pages-artifact@v3
        with:
          path: public/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] Verify YAML is valid:

```bash
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/deploy.yml'))" && echo "YAML valid"
```

Expected: `YAML valid`

- [ ] Commit:

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions workflow for GitHub Pages deployment"
```

---

## Task 10: README

**File:** `README.md`

- [ ] Overwrite `README.md` with:

```markdown
# 從試算表到資料平台 — 書籍推廣網站

Book promotion website for "從試算表到資料平台" by Laurence Chen.

## Quick Start

```bash
# Build
./build.sh

# Preview locally
python3 -m http.server 8080 -d public
# open http://localhost:8080
```

## Project Structure

```
resources/          Source files (hand-written static HTML/CSS/JS)
├── index.html      Home page
├── about.html      Author bio
├── insights.html   Market insights (Forrester, dbt reports)
├── preview.html    Book excerpt previews
├── buy.html        All purchase channels
├── css/            Design system (variables.css + style.css)
├── js/main.js      Mobile nav toggle
├── images/         Book cover, favicons
└── documents/      Forrester PDF

public/             Build output — GitHub Pages deploy target (git-ignored)
posts/              Future: Quickblog blog posts
build.sh            Build script: cp resources/* → public/
```

## Pages

| URL | File | Content |
|-----|------|---------|
| `/` | index.html | Hero, highlights, testimonials, previews, purchase |
| `/about.html` | about.html | Author bio, contact |
| `/insights.html` | insights.html | Forrester report, dbt trends, author article |
| `/preview.html` | preview.html | Book digest excerpts (3 parts) |
| `/buy.html` | buy.html | 5 physical + 3 ebook channels |

## Deployment

Push to `main` → GitHub Actions runs `build.sh` → deploys `public/` to GitHub Pages.

Set up: Repository Settings → Pages → Source: GitHub Actions.

## Future: Blog

When blog is needed, add Quickblog to `build.sh`:
```bash
bb quickblog render   # generates blog posts into public/
```

## Book Info

- **Title:** 從試算表到資料平台
- **Author:** 陳家宏（Laurence Chen）
- **ISBN:** 9786267757284
- **Publisher:** 深智數位
- **Published:** 2025-09-19
```

- [ ] Commit:

```bash
git add README.md
git commit -m "docs: update README for hybrid static HTML + Quickblog architecture"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Home page: hero, 3 highlights, 2 testimonials, 3 digest previews, 3 purchase buttons, insights teaser (spec §3)
- ✅ Insights page: Forrester, dbt 2024/2025/2026, author article (spec §4)
- ✅ About page: author bio, contact links (spec §5)
- ✅ Preview page: 3 digest sections with anchor IDs digest1/2/3 (spec §6)
- ✅ Buy page: all 5 physical + 3 ebook channels (spec §7)
- ✅ Build system: build.sh + GitHub Actions (spec §8)
- ✅ Blog: reserved in build.sh comment, posts/ directory exists for future use (spec §12)
- ✅ README updated

**No placeholders:** digest content in Task 6 is handled by explicit liteparse invocation steps, not left as TBD.

**Type/name consistency:** CSS class names used in HTML (`.nav-links`, `.nav-link--cta`, `.card-grid`, `.purchase-card`, `.stat-row`, etc.) match what's defined in `style.css`.
