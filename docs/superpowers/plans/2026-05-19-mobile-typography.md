# Mobile Typography Readability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix mobile readability by restoring 16px base font size and increasing line-height for long paragraphs on screens ≤768px.

**Architecture:** Two CSS variable changes inside the existing `@media (max-width: 768px)` block in `resources/css/style.css`. No HTML changes needed. Desktop styles are untouched.

**Tech Stack:** Static HTML/CSS. Preview with `python3 -m http.server 8080 -d public` after running `./build.sh`.

---

### Task 1: Apply the two CSS fixes

**Files:**
- Modify: `resources/css/style.css:773-786`

- [ ] **Step 1: Add `--line-height-relaxed: 1.9` to the mobile `:root` override**

In `resources/css/style.css`, find the `@media (max-width: 768px)` block starting at line 773. Change the `:root` block from:

```css
  :root {
    --text-5xl: 2rem;
    --text-4xl: 1.5rem;
    --text-3xl: 1.25rem;
    --text-2xl: 1.125rem;
    --sp-24: 3rem;
    --sp-16: 2rem;
    --sp-12: 1.5rem;
  }
```

To:

```css
  :root {
    --text-5xl: 2rem;
    --text-4xl: 1.5rem;
    --text-3xl: 1.25rem;
    --text-2xl: 1.125rem;
    --sp-24: 3rem;
    --sp-16: 2rem;
    --sp-12: 1.5rem;
    --line-height-relaxed: 1.9;
  }
```

- [ ] **Step 2: Remove the `html { font-size: 14px }` block**

Immediately after the `:root` block, delete:

```css
  html {
    font-size: 14px;
  }
```

- [ ] **Step 3: Build and start preview server**

```bash
./build.sh
python3 -m http.server 8080 -d public
```

- [ ] **Step 4: Verify on mobile viewport**

Open `http://localhost:8080` in Chrome. Open DevTools → Toggle Device Toolbar → set to iPhone 12 Pro (390px width).

Check the following:

| Location | What to verify |
|---|---|
| `index.html` — 讀者評價 section | Long paragraphs readable, line-height visibly airy |
| `insights.html` — Forrester 段落 | `<p>` text at 16px, not cramped |
| `index.html` — Navigation | Brand name and links still fit, no overflow |
| `index.html` — Hero | Title and subtitle sizes unchanged (overridden by `--text-5xl` etc.) |
| Desktop (1280px) | Layout visually identical to before — no change |

- [ ] **Step 5: Commit**

```bash
git add resources/css/style.css
git commit -m "fix: restore 16px mobile font size and increase line-height for long paragraphs"
```

---

### Task 2: Sync build output and deploy

**Files:**
- Modify: `public/css/style.css` (via build script)

- [ ] **Step 1: Run build**

```bash
./build.sh
```

- [ ] **Step 2: Verify build output matches source**

```bash
grep -n "font-size: 14px" public/css/style.css
```

Expected output: no results (the line was removed).

```bash
grep -n "line-height-relaxed: 1.9" public/css/style.css
```

Expected output:
```
782:    --line-height-relaxed: 1.9;
```

- [ ] **Step 3: Commit build output if public/ is tracked, otherwise push to trigger CI**

`public/` is git-ignored (deploy target). Push `main` to trigger GitHub Actions, which runs `build.sh` and deploys to GitHub Pages.

```bash
git push origin main
```
