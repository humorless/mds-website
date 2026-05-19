# Mobile Typography Readability — Design Spec

**Date:** 2026-05-19  
**Status:** Approved  
**Scope:** `resources/css/style.css` only

---

## Problem

The 768px mobile breakpoint reduces `html { font-size }` to 14px and does not override `--line-height-relaxed`, resulting in:

- Chinese body text at 14px — difficult to read on small screens (16px is the recommended minimum for CJK)
- Long paragraphs in testimonials, insights, and future long-form pages using `--line-height-relaxed: 1.625`, which is too tight for mobile reading

Affected pages:
- `index.html` — `.testimonial-text` (reader reviews, long paragraphs)
- `insights.html` — `<p>` paragraphs (Forrester report descriptions, author insights)
- Any future long-form pages (e.g., `preview.html`)

---

## Out of Scope

- Desktop/tablet (>768px) — zero changes
- Navigation, buttons, cards, headings — not touched
- No HTML changes required

---

## Solution

Two CSS changes, both inside `@media (max-width: 768px)`:

### Change 1 — Remove font-size reduction

Delete the block:
```css
html {
  font-size: 14px;
}
```

This restores base font size to 16px on mobile, matching the desktop default. Heading sizes are unaffected because `--text-5xl`, `--text-4xl`, `--text-3xl`, `--text-2xl` are already independently overridden in the same breakpoint.

### Change 2 — Increase relaxed line-height on mobile

Add to the `:root` override block inside `@media (max-width: 768px)`:
```css
--line-height-relaxed: 1.9;
```

This raises line-height for all elements using `--line-height-relaxed`, which includes `.testimonial-text` and `.prose`. No element that uses `--line-height-normal` or `--line-height-tight` is affected.

---

## Final Diff (conceptual)

```css
@media (max-width: 768px) {
  :root {
    --text-5xl: 2rem;
    --text-4xl: 1.5rem;
    --text-3xl: 1.25rem;
    --text-2xl: 1.125rem;
    --sp-24: 3rem;
    --sp-16: 2rem;
    --sp-12: 1.5rem;
+   --line-height-relaxed: 1.9;
  }

- html {
-   font-size: 14px;
- }

  /* ... rest of mobile styles unchanged ... */
}
```

---

## Success Criteria

- Chinese body text on mobile renders at 16px
- Testimonial paragraphs on `index.html` have line-height ~1.9 at 768px and below
- `insights.html` paragraph text reads comfortably on a 375px viewport
- Desktop layout (>768px) visually unchanged
