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
