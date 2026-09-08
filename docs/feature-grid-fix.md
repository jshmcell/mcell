# FeatureGrid (Home Section 3) — Equal Block Layout & Text Truncation Fix

## Issue

Section 3 (FeatureGrid) on the home page renders correctly in Korean but breaks in English:

- In English, titles and descriptions are much longer (e.g. "Self-assembled monolayer fiber structure", "Supports a variety of printing methods including screen, dispensing and spray"), causing text to overflow the card and misplace neighboring elements.
- All 8 blocks must have the same height and width, with identical layout and text placement — now and in the future, for any text length in both Korean and English.

## Root Cause

`src/components/home/FeatureGrid.tsx` line 24:
- Desktop (>= 992px, `md-header`): the card has a **fixed height** `md-header:h-[163px]` with no overflow handling. Longer English text overflows the box.
- Mobile (< 992px): cards use `h-auto`, so cards in the same row grow to different heights; the grid stretches the row but shorter cards look misaligned.

## Solution (single file: `src/components/home/FeatureGrid.tsx`)

### 1. Grid container (line 16)
Add `auto-rows-[1fr]` (applies at all breakpoints) to the grid so all rows are equal height, sized to the tallest card:

```
grid auto-rows-[1fr] grid-cols-2 gap-[15px] md-header:grid-cols-4 md-header:gap-[30px]
```

### 2. Card div (line 24)
- Change `h-auto` to `h-full` (card fills its grid cell).
- Remove `md-header:h-[163px]` (eliminates the fixed-height overflow).
- Keep `flex flex-col items-center justify-center` so content stays vertically centered in every equal-height block.

### 3. Title `<h3>` (line 26)
- Add `line-clamp-5 break-words` — max 5 lines, truncated with "…" when exceeded.
- Add `title={card.title}` — native hover tooltip showing the full title.

### 4. Body lines `<div>` (line 29)
- Add `line-clamp-5 break-words` — max 5 lines, truncated with "…" when exceeded.
- Add `title={card.lines.join(" ")}` — native hover tooltip showing the full description text.

Notes:
- `break-words` ensures long unbroken words wrap before clamping (no single-word overflow).
- `line-clamp-*` is built into Tailwind v4 — no config changes needed.
- Hover tooltips show the complete value for all truncated text.

## Verification

1. `npm run dev` and open the home page `/`.
2. Check both languages (Korean and English).
3. Check desktop (> 992px) and mobile widths:
   - All 8 blocks have identical height and width.
   - Text is centered identically in every block.
   - No overflow — long text either wraps or is clamped with "…".
   - Hovering truncated text shows the full value via tooltip.
