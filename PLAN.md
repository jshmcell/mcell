# Mcell Website Rebuild — Progress Tracker

Source: https://imweb3200977727.imweb.me/ (엠셀, mcell.co.kr) — imweb.me builder
Goal: pixel-perfect duplicate, owner-editable content later (full drag&drop CMS later — out of scope now).
Stack: Next.js 16 (App Router, React 19) + TypeScript + Tailwind v4 + Zustand (UI state only) + Vercel.

## Decisions (locked)

- Content in typed TS data files (`src/data/`), components data-driven. CMS/DB swap = data-layer change only.
- Auth: pages only (UI shells), no logic. Backend later.
- Forms: UI + client validation, submit button DISABLED until backend phase.
- No email service yet. No external CMS yet.
- Media downloaded to `public/assets/` (img, pdf). Local refs.
- Domain TBD — no DNS work.
- Old `/NN` imweb URLs → permanent redirects in `next.config.ts`.
- Korean-language content. `Pretendard` font self-hosted via `next/font/local`. `word-break: keep-all`.

## URL map (old → new)

| old imweb                   | new route               | notes                                                |
| --------------------------- | ----------------------- | ---------------------------------------------------- |
| `/`                         | `/`                     | home                                                 |
| `/29`, `/33`                | `/about`                | About Us (CEO 인사말)                                |
| `/34`                       | `/about/history`        | 연혁 timeline                                        |
| `/35`                       | `/about/certifications` | 인증서                                               |
| `/36`                       | `/about/contact`        | Contact Us + 2 Google Maps iframes                   |
| `/30`, `/31`                | `/mcell`                | 기술력: stats, 4-layer tech, products, 2 comparisons |
| `/37`                       | `/shop`                 | placeholder (no products yet)                        |
| `/38`, `/39`                | `/library/portfolio`    | 포트폴리오 board                                     |
| `/40`                       | `/library/catalog`      | 카달로그 board (1 PDF post)                          |
| `/48`, `/45`                | `/news/notices`         | 공지사항 board                                       |
| `/46`                       | `/news/updates`         | 소식 board                                           |
| `/44`                       | `/partnership`          | inquiry form (disabled submit)                       |
| `/?mode=policy`             | `/policy`               | 이용약관                                             |
| `/?mode=privacy`            | `/privacy`              | 개인정보처리방침                                     |
| `/login`                    | `/login`                | UI shell only                                        |
| `/site_join_pattern_choice` | `/signup`               | UI shell only                                        |

## Design tokens (extracted from original)

- Colors: navy `#17375e`, `#27397d`, `#313f76`; accent `#00B8FF`; dropdown hover `#93cddd`; text `#363636`; hover gray `#c5c5c5`/`#e2e2e2`.
- Header: 108px tall, container 1280px (40px side pad), transparent over hero → navy `rgba(23,55,94,0.9)` fixed on scroll. Nav 16px white, hover `#c5c5c5`, active bold. Dropdown: white bg, 13px `#474747`, hover bg `#93cddd` white text.
- Footer: navy, address/TEL/FAX/email + 3 social icons (FB/IG/YT) + 이용약관/개인정보처리방침.
- Breakpoints: 992px, 768px.
- Animations: scroll-reveal (fade/slide, 0.3s+), hero full-screen owl slider, cert carousel (18 items), "MCELL TECHNOLOGIES" marquee, stat counters.

## Phases

### Phase 0 — Extraction

- [ ] Crawl 16 pages → rendered HTML, screenshots (desktop 1280 + mobile 375)
- [ ] Download all images/PDFs → `public/assets/`
- [ ] Record computed styles + animation specs → `docs/extract-notes.md`

### Phase 1 — Scaffold

- [ ] create-next-app (TS, App Router, Tailwind v4, src/, eslint)
- [ ] `next.config.ts` redirects map
- [ ] `PLAN.md` (this file), prettier, git init

### Phase 2 — Layout

- [ ] Design tokens in `globals.css` `@theme`
- [ ] Pretendard local font
- [ ] Header (overlay→fixed navy, dropdowns, search overlay, mobile drawer)
- [ ] Footer
- [ ] Reveal (framer-motion), Button, SectionHeading UI primitives

### Phase 3 — Home (one section per commit)

- [ ] Hero full-screen slider
- [ ] Tagline section (Empower Heat, Shape Innovation)
- [ ] 기술 intro (기술은 에너지 혁신을 만든다)
- [ ] Media/parallax section
- [ ] 기술력 CTA → /mcell
- [ ] Cert carousel (18 items)
- [ ] About CTA → /about
- [ ] Partnership CTA → /partnership

### Phase 4 — Subpages

- [ ] SubHero + SubNav shared template
- [ ] /about (+ history, certifications, contact)
- [ ] /mcell (stats counters, 4-layer tech, products, comparisons)
- [ ] Boards: library/portfolio, library/catalog, news/notices, news/updates (list+search, static data)
- [ ] /shop placeholder
- [ ] /partnership form (disabled submit)
- [ ] /policy, /privacy, /login, /signup

### Phase 5 — QA & cutover-ready

- [ ] Playwright old-vs-new screenshots @1280/1920/375, per-section diff loop
- [ ] Metadata/OG/sitemap/robots
- [ ] Lighthouse ≥ 95
- [ ] Vercel deploy

## Structure

```
src/app/(site)/        route groups + shared layout
src/components/layout/ Header, Footer, MobileDrawer, SearchOverlay
src/components/home/   one component per home section
src/components/subpage/ SubHero, SubNav
src/components/ui/     Button, SectionHeading, Reveal
src/data/              site.ts, home.ts, about.ts, mcell.ts, boards.ts
src/lib/               cn, constants
public/assets/img|pdf/
```

## Libs

framer-motion, embla-carousel-react, react-countup. Zustand: mobile drawer + search overlay only.

## Status

Current: Phase 5 — QA/polish. All pages built; home sections 1-10 pixel-matched against the live original (2026-09: sections 1-10 verified at 1280/1920/375 — PC page total 5370px == original). About pages pixel-matched 2026-09 (orig vs ours @1280/1920/768/375): /about 2002==2002, /history −12, /certifications +1, /contact −29; sub-hero chips + inline breadcrumb + imweb scroll-triggered appear animations (Appear) replicated; all <Image> wrapped in SmartImage (skeleton+spinner loader; storage-ready). Remaining:

- Home (9 sections), /mcell (stats+tech+products+comparisons+platform+cooperation), /about, /about/history, /about/certifications, /about/contact, /shop, /library/{portfolio,catalog}, /news/{notices,updates}, /partnership (disabled form), /login, /signup, /policy, /privacy
- Redirects: /29,/33,/34,/35,/36,/30,/31,/37,/38,/39,/40,/48,/45,/46,/44 → new routes
- Remaining: sitemap/robots, Lighthouse, Vercel deploy, pixel-diff fine-tuning
