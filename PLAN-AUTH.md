# Auth Feature Plan — 로그인 / 회원가입

Companion to `PLAN.md`. Stack: **Better Auth (fully) + Prisma 7 + Vercel Postgres (Neon)** on Next.js 16 (App Router, React 19).

**Status: IMPLEMENTED (2026-09) — Phases A–F complete. QA: Playwright flow 14/14, reset-flow 3/3, lint/tsc/build green.**

## 0. Original source analysis (extracted 2026-09 → `analysis/auth_pages/*.html`)

### Flow (imweb original)

```
/login ──회원가입 link──▶ /site_join_pattern_choice ──auto redirect──▶ /site_join_agree (agreement)
                                                                            │ POST /backpg/join_agree.cm
                                                                            ▼
                                                                    /site_join (profile form)
                                                                            │ POST /backpg/join.cm (multipart)
                                                                            ▼
                                                                       auto sign-in
```

- `/site_join_pattern_choice` has no visible UI — immediately redirects to `/site_join_agree?back_url=Lw==&type_code=` (single join type). Our `/signup` **starts at the agreement step**.

### Login form (`/login`, POST `/backpg/login.cm`)

| field        | type     | notes                                          |
| ------------ | -------- | ---------------------------------------------- |
| `uid`        | text     | placeholder **이메일** — email IS the ID         |
| `passwd`     | password | eye show/hide toggle icon                      |
| `auto_login` | checkbox | **로그인상태유지**, default **checked**          |
| `back_url`   | hidden   | post-login redirect                            |

Below form: 회원가입 link, 아이디 · 비밀번호 찾기 (dead `javascript:;` link in original).

### Signup step 1 — agreement (`/site_join_agree`, POST `/backpg/join_agree.cm`)

| field              | type     | notes                                                            |
| ------------------ | -------- | ---------------------------------------------------------------- |
| `rdo`              | checkbox | check-all: "이용약관, 개인정보 수집 및 이용에 모두 동의합니다."      |
| `policy_agree`     | checkbox | 이용약관 동의 **(필수)** + 200px scrollable full 약관 box          |
| `privacy_agree`    | checkbox | 개인정보 수집 및 이용 동의 **(필수)** + 200px scrollable box        |
| `limit_join_agree` | checkbox | 만 14세 이상입니다 **(필수)** (no scroll box)                      |

Buttons: 취소 (`history.back`) / 가입하기 (submit, disabled until all 3 필수 checked).

### Signup step 2 — profile form (`/site_join`, POST `/backpg/join.cm`, multipart + CSRF token)

| field            | type     | notes                                                        |
| ---------------- | -------- | ------------------------------------------------------------ |
| profile image    | file     | optional circular avatar — **NOT in our v1** (future account page) |
| `uid`            | email    | **required**, live 중복확인 — green ✓ "사용 가능" icon          |
| `passwd`         | password | eye toggle; hint: "8자리 이상의 대소문자, 숫자, 특수문자를 사용해 주세요." |
| `passwd_confirm` | password | must match                                                   |
| `name`           | text     | **required**, label 이름 + red 필수입력 dot                    |

Button: 가입하기. **No 아이디/닉네임/연락처 fields — email is the sole identifier.**

### Deviations of our current shells (must be reworked)

- `src/app/(site)/signup/page.tsx` is a plain form with 아이디+이름+이메일 — wrong: needs agreement step first, email-as-ID (no separate 아이디).
- `src/app/(site)/login/page.tsx` lacks 로그인상태유지 + 아이디·비밀번호 찾기 links.

## 1. Decisions (locked)

- **Better Auth — used fully** (most popular full-control TS auth lib; first-class Prisma adapter; built-in DB sessions, CSRF, rate limiting, password hashing (scrypt), reset tokens). `emailAndPassword` only — matches original (no social login).
- **Prisma 6 + Vercel Postgres** (site deploys to Vercel; pooled `DATABASE_URL` + `DIRECT_URL` for migrations).
- **Signup = one `/signup` page, internal steps in React state** (`agreement → form`). **No searchparams** — refresh/deep-link always lands on agreement step, so the gate is structurally unskippable. Server still enforces: submit action rejects unless all 3 consents are `true` and writes `UserConsent` audit rows.
- **No avatar upload at signup.** `User.image` stays nullable for a future account page.
- **Email = ID** like original. No username plugin.
- Consent = auditable **`UserConsent` rows** (type + version + timestamp + ip) — PIPA/GDPR-friendly industry standard.
- Password policy: min 8 + 대소문자/숫자/특수문자 regex (client zod + Better Auth `minPasswordLength: 8`).
- 로그인상태유지 → Better Auth `rememberMe` (unchecked: 7-day session, checked: 30-day).
- Live email 중복확인 → own server action + zod (UX parity with original ✓ icon).
- 찾기 flow: **비밀번호 찾기 only** via Better Auth `forgetPassword`/`resetPassword` + Resend. 아이디 찾기 deferred (original link is dead).
- Session-aware header (로그인/회원가입 ↔ 이름+로그아웃), optimistic cookie check in `proxy.ts`.
- Email verification: **off** for v1 (original has none); schema keeps `emailVerified`.
- **Env**: add vars to existing `.env.development.local` (dev) + mirror in both Vercel envs (production & development): `DATABASE_URL`, `DIRECT_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `RESEND_API_KEY`, `BLOB_READ_WRITE_TOKEN` (later, account page).

## 2. URL map (old → new)

| old imweb                   | new route             | notes                      |
| --------------------------- | --------------------- | -------------------------- |
| `/login`                    | `/login`              | rework existing shell      |
| `/site_join_pattern_choice` | `/signup`             | single page, step 1        |
| `/site_join_agree`          | `/signup`             | single page, step 1        |
| `/site_join`                | `/signup`             | single page, step 2        |
| (new)                       | `/find-account`       | 비밀번호 찾기              |
| (new)                       | `/find-account/reset` | token reset form           |

Add the three `/site_join*` redirects to `next.config.ts` (PLAN.md URL map amendment).

## 3. Prisma schema (`prisma/schema.prisma`)

Better Auth core models (official Prisma adapter template) + our consent audit table:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id            String    @id
  name          String
  email         String    @unique
  emailVerified Boolean   @default(false)
  image         String?   // future account-page avatar
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @default(now()) @updatedAt
  sessions      Session[]
  accounts      Account[]
  consents      UserConsent[]

  @@map("user")
}

model Session {
  id        String   @id
  expiresAt DateTime
  token     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("session")
}

model Account {
  id                    String    @id
  issuer                String
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?   // credentials hash (Better Auth scrypt)
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  @@unique([issuer, accountId])
  @@map("account")
}

model Verification {
  id         String   @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@map("verification")
}

/// 동의 감사 기록 (이용약관/개인정보/14세 — 가입 시점 스냅샷)
model UserConsent {
  id       String   @id @default(cuid())
  userId   String
  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  type     String   // "policy" | "privacy" | "age14"
  version  String   // AGREEMENT_VERSION from src/data/auth.ts
  agreedAt DateTime @default(now())
  ip       String?

  @@index([userId])
  @@map("user_consent")
}
```

## 4. Auth wiring (Better Auth, fully)

```ts
// src/lib/auth.ts (server)
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { prisma } from "@/lib/prisma";
import { sendResetEmail } from "@/lib/mail";

export const auth = betterAuth({
  appName: "mcell",
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8, // complexity regex enforced in our zod layer
    autoSignIn: true,     // 가입 후 자동 로그인 = original behavior
    sendResetPassword: ({ user, url }) => sendResetEmail(user.email, url),
    resetPasswordTokenExpiresIn: 3600,
    revokeSessionsOnPasswordReset: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,                       // 7 days
    rememberMeInMilliseconds: 30 * 24 * 60 * 60 * 1000, // 30 days w/ 로그인상태유지
  },
  plugins: [nextCookies()],
});
```

- `src/lib/auth-client.ts` — `createAuthClient` from `better-auth/react`.
- `src/app/api/auth/[...all]/route.ts` — `toNextJsHandler(auth)`.
- `proxy.ts` — `getSessionCookie()` (from `better-auth/cookies`) optimistic redirect: logged-in users bounced off `/login`, `/signup`, `/find-account*` (Next 16 "Proxy" = former middleware; real checks stay server-side).
- **Consent gate (server, unskippable):** `src/lib/actions/auth.ts` → `signUpWithConsent` server action: zod validates email/password-complexity/confirm/name + **all 3 consents must be `true`** → calls `auth.api.signUpEmail` (Better Auth server API) → writes 3 `UserConsent` rows → done (autoSignIn session already set by Better Auth via nextCookies).
- Live 중복확인: `checkEmailAvailability` server action (zod email, rate-limited) → prisma lookup.
- Login: `authClient.signIn.email({ email, password, rememberMe })` (rememberMe = 로그인상태유지, default true). Logout: `authClient.signOut()`.
- Find account: `authClient.forgetPassword({ email, redirectTo: "/find-account/reset" })` / `authClient.resetPassword({ newPassword, token })`.
- Header session: `auth.api.getSession({ headers: await headers() })` in server layout, passed to Header as props.
- Validation: zod schemas in `src/lib/auth-schemas.ts` shared client+server.
- Env: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `DATABASE_URL`, `DIRECT_URL`, `RESEND_API_KEY`.

## 5. Data & content

- `src/data/auth.ts` — full 이용약관 + 개인정보 수집·이용 texts (from original agreement page; same content as `/policy` `/privacy` pages) + `AGREEMENT_VERSION` constants. Step-2 placeholder texts.
- Reuse existing design tokens/classes (`InquiryForm.tsx` input style, navy Button) so forms match site look; replicate imweb details: eye toggle SVGs (saved in analysis html), green ✓ 중복확인, 200px scrollable 약관 boxes, red (필수) markers.

## 6. Phases

### Phase A — Foundation
- [ ] `npm i better-auth @prisma/client zod resend`; `npm i -D prisma`
- [ ] Env: extend `.env.development.local` + both Vercel envs (production/development)
- [ ] Prisma schema (above) + `prisma migrate dev` (dev Postgres) + generate
- [ ] `src/lib/{prisma,auth,auth-client,auth-schemas,mail}.ts`; `src/lib/actions/auth.ts` skeleton
- [ ] `src/app/api/auth/[...all]/route.ts`; `proxy.ts`

### Phase B — Signup (single `/signup`, state steps, no searchparams)
- [ ] `src/data/auth.ts`: full 약관/개인정보 texts + `AGREEMENT_VERSION`
- [ ] `/signup` page (client component): `step` React state — Step 1 agreement (check-all, 3 필수 checkboxes, 200px scroll boxes, 취소(back)/가입하기 disabled until valid); Step 2 form (이메일 + live 중복확인 ✓, 비밀번호 + 확인 + complexity hint, 이름)
- [ ] `signUpWithConsent` server action: zod consent enforcement → `auth.api.signUpEmail` → `UserConsent` rows → redirect `/`
- [ ] `next.config.ts`: 3 × `/site_join*` → `/signup` redirects

### Phase C — Login / Logout
- [ ] `/login` rework: 이메일/비밀번호 + eye toggle, 로그인상태유지 default checked (`rememberMe`), enumeration-safe error message, links 회원가입 + 아이디·비밀번호 찾기 → `/find-account`
- [ ] `authClient.signIn.email`; logout via `authClient.signOut()`

### Phase D — Find account (비밀번호 찾기)
- [ ] `/find-account` — email → `authClient.forgetPassword` → "전송됨" confirmation (enumeration-safe)
- [ ] `/find-account/reset` — token + new password → `authClient.resetPassword` → `/login`
- [ ] Resend Korean reset-email template (`src/lib/mail.ts`)

### Phase E — Session-aware UI
- [ ] Layout server component fetches session → Header: 로그인/회원가입 ↔ 이름 + 로그아웃, exact header styling
- [ ] My-page placeholder deferred (out of scope)

### Phase F — QA
- [ ] Playwright: full signup (agreement→form, refresh returns to agreement), 중복확인 ✓/✗, login/logout, reset flow, error states
- [ ] Security: consent rows written, cookie flags, rate limiting, enumeration-safe errors, no secrets client-side
- [ ] `npm run lint` + build green; update PLAN.md / PLAN-AUTH.md status

## 7. Notes / risks

- Better Auth hashes with scrypt internally — no bcrypt dependency needed.
- Live 중복확인 leaks account existence; accepted for UX parity (original does it), mitigated by rate limiting.
- `session.expiresIn` / `rememberMeInMilliseconds` — verify exact key names against installed Better Auth version during Phase A.
- Vercel serverless + Prisma: pooled `DATABASE_URL` (pgbouncer) + `DIRECT_URL` for migrations.
- Email deliverability: Resend needs verified sender domain (contact@mcell.co.kr); dev can use onboarding@resend.dev.
- `proxy.ts` cookie check is optimistic only — real authorization lives in server components/actions.