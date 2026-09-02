# Mcell — Corporate Website

Pixel-faithful rebuild of mcell.co.kr (originally built on imweb.me) as a modern Next.js application.

## Stack

- Next.js 16 (App Router, Turbopack)
- TypeScript
- Tailwind CSS v4
- Zustand (UI state: mobile drawer, search overlay)
- framer-motion, embla-carousel-react, react-countup
- Deploy target: Vercel

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

| command         | description          |
| --------------- | -------------------- |
| `npm run dev`   | dev server           |
| `npm run build` | production build     |
| `npm run start` | serve production     |
| `npm run lint`  | eslint               |

## Structure

```
src/
  app/(site)/        routes (shared header/footer layout)
  components/
    home/            home page sections (one per section)
    layout/          Header, Footer, MobileDrawer
    mcell/           /mcell page sections
    subpage/         SubHero, BoardList, PartnershipCta
    ui/              Button, Reveal (scroll animation), SectionHeading
  data/              typed content files — single source for all copy/media
  lib/               cn helper, constants, zustand store
public/assets/       images + PDF downloaded from the original site
PLAN.md              rebuild plan, URL map, design tokens, progress
docs/extract-notes.md  notes from the original site extraction
```

## Content editing

All page content lives in `src/data/*.ts` as typed objects. Components render
exclusively from these files, so copy/media changes never touch component code.
A CMS/DB backend can later replace this layer without UI changes.

## URL map (old → new)

| original imweb | new route           |
| -------------- | ------------------- |
| `/`            | `/`                 |
| `/29` `/33`    | `/about`            |
| `/34`          | `/about/history`    |
| `/35`          | `/about/certifications` |
| `/36`          | `/about/contact`    |
| `/30` `/31`    | `/mcell`            |
| `/37`          | `/shop`             |
| `/38` `/39`    | `/library/portfolio`|
| `/40`          | `/library/catalog`  |
| `/48` `/45`    | `/news/notices`     |
| `/46`          | `/news/updates`     |
| `/44`          | `/partnership`      |
| `?mode=policy` | `/policy`           |
| `?mode=privacy`| `/privacy`          |

Legacy paths are redirected (308) in `next.config.ts`.

## Pending (by design)

- Auth: UI shells only (`/login`, `/signup`) — backend later
- Partnership form: disabled submit — email/DB integration later
- SHOP: placeholder — e-commerce later
- CMS: content is TS data now; drag-and-drop CMS planned later