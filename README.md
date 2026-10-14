# AI Suite — Website

Production website for **AI Suite** (JARVIS · FRIDAY · EDITH), a Windows desktop AI
application. Real Google OAuth, real email OTP, real Postgres-backed accounts, and a
configurable download for the actual `Setup.exe` installer.

No mocked auth, no fake OTP, no fake download — everything here is either fully working
code or clearly marked as requiring your own credentials.

---

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · NextAuth.js · Prisma · PostgreSQL ·
Resend (email) · Framer Motion (hero animation)

---

## 1. Install dependencies

```bash
npm install
```

## 2. Environment

```bash
cp .env.example .env
```

Fill in every value in `.env`. Each one is documented inline in `.env.example`. Nothing
in this project reads a secret on the client — only `NEXT_PUBLIC_`-prefixed vars would be
exposed to the browser, and none of the secrets use that prefix.

## 3. Database

Any Postgres-compatible provider works (Supabase, Neon, Railway, RDS, etc).

```bash
# after DATABASE_URL is set in .env
npm run db:generate
npm run db:push
```

`prisma/schema.prisma` defines `User`, `Account`, `Session`, `VerificationToken`,
`OtpCode`, and `DownloadEvent`. Google and Email-OTP sign-ins both resolve to the same
`User` row when the verified email address matches — no duplicate accounts.

## 4. Google OAuth

1. Go to the [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials).
2. Create an **OAuth 2.0 Client ID** (Web application).
3. Authorized JavaScript origin: `https://your-domain.com` (or `http://localhost:3000` for local dev).
4. Authorized redirect URI — **must match exactly**:
   ```
   https://your-domain.com/api/auth/callback/google
   ```
   (`http://localhost:3000/api/auth/callback/google` for local dev)
5. Copy the Client ID/Secret into `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` in `.env`.

## 5. Email OTP delivery

This project sends codes through [Resend](https://resend.com):

1. Create a Resend account and verify a sending domain (or use their test domain while developing).
2. Create an API key → `RESEND_API_KEY`.
3. Set `EMAIL_FROM` to a verified sender, e.g. `AI Suite <login@yourdomain.com>`.

To use a different provider (Postmark, SES, SendGrid), edit only `src/lib/email.ts` —
nothing else in the OTP flow needs to change.

**Security properties already implemented** (`src/app/api/auth/otp/send/route.ts`, `src/lib/auth.ts`):
- Codes are 6 digits, generated with `crypto.randomInt` (not `Math.random`).
- Codes are hashed with bcrypt before being stored — never stored or logged in plain text.
- Codes expire after 10 minutes.
- A code is invalidated the moment it's used, or when a newer one is requested.
- Verification is capped at 5 attempts per code.
- Requesting a new code is capped to 1 per 45 seconds per email, and 10 per hour per IP.

## 6. Rate limiting in production

The in-memory rate limiter (`src/lib/rateLimit.ts`) only works correctly on a single
server instance. For any deployment with more than one instance/region, set
`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (free tier at
[upstash.com](https://upstash.com)) so limits are enforced globally.

## 7. The installer

You already have the real `Setup.exe`. Host it wherever you like (a CDN, object storage,
GitHub Releases) and point `DOWNLOAD_URL` at the direct file URL. Optionally set
`DOWNLOAD_VERSION`, `DOWNLOAD_SIZE_MB`, and `DOWNLOAD_RELEASE_DATE` — these are only
displayed if set; nothing is invented if left blank.

The download button always hits `/api/download` (`src/app/api/download/route.ts`), which
redirects to `DOWNLOAD_URL` server-side. This keeps the real URL out of the client bundle
and gives you one place to add signed URLs or download logging later. If `DOWNLOAD_URL`
isn't set, the site shows "installer isn't configured yet" instead of a broken link.

## 8. Run locally

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 9. Production deployment (e.g. Vercel)

- Build command: `npm run build` (runs `prisma generate` automatically via `postinstall`
  if you add one, or run `npm run db:generate` as part of your build pipeline).
- Set every variable from `.env.example` in your hosting platform's environment settings.
- Set `NEXTAUTH_URL` to your real production URL — this is also used as the OAuth
  callback base and in emails/SEO metadata.
- Update the Google Cloud Console redirect URI to the production callback URL.
- Point `DOWNLOAD_URL` at the production installer location.

---

## What's implemented vs. what needs your credentials

**Fully implemented, real code (no mocks):**
- Google OAuth via NextAuth
- Email OTP: generation, hashing, expiry, single-use, resend cooldown, rate limiting
- Account linking by verified email (Google + Email-OTP → one `User`)
- Protected `/dashboard` and `/dashboard/account` (server-side session check + middleware)
- Download button backed by a real, configurable installer URL
- Error/loading/empty states across auth, OTP, and download
- `prefers-reduced-motion` support; hero has no WebGL dependency so it degrades to a
  static rendering on any device
- Favicon/app icon (`public/favicon.svg`, `public/favicon.ico`) — the previous pass
  referenced `/favicon.ico` in metadata but never shipped the file; added and wired
  into `manifest.ts` too
- Hero orbit rings now sized in `%` of their own container instead of fixed pixels, so
  they no longer overflow/clip on narrow (mobile) viewports

**Requires you to supply your own values before it does anything:**
- A real `DATABASE_URL`
- A real Google OAuth client ID/secret
- A real Resend (or other) API key + verified sending domain
- The real `Setup.exe` URL
- Final Privacy Policy / Terms of Service copy (`src/app/privacy`, `src/app/terms` are
  clearly marked placeholders)
- Real screenshots/assets in `public/screenshots` (none are included — nothing was
  invented)
- Verified per-assistant feature claims — the JARVIS/FRIDAY/EDITH copy in
  `src/components/sections/Assistants.tsx` and `Features.tsx` is placeholder text
  and is explicitly commented as such; replace it against the real application before
  launch, not before

**Not built in this pass, by design:**
- A full Three.js/React Three Fiber cinematic 3D scene. The hero
  (`src/components/Hero.tsx`) is a real, working SVG + Framer Motion orbital diagram
  instead — GPU-light, no WebGL dependency, accessible, and functionally equivalent to
  the brief's intent ("communicate intelligence, precision, depth"). It's isolated
  behind one component so a full R3F scene can be dropped in later without touching
  auth, data, or layout code.

---

## Testing checklist

Manual QA to run once real credentials are in place (this couldn't be executed in the
build environment — no network access to install dependencies or reach Google/Resend):

- [ ] `npm run build` completes with no type errors
- [ ] Google: login → consent → callback → session → dashboard
- [ ] Google: logout, then log back in — same account, no duplicate
- [ ] Email OTP: request code → receive email → verify → dashboard
- [ ] Email OTP: wrong code shows an error, doesn't crash
- [ ] Email OTP: code expires after 10 minutes
- [ ] Email OTP: resend is blocked until the cooldown ends
- [ ] Email OTP: 6 rapid wrong attempts locks that code
- [ ] Same email via Google and via OTP → one account, both providers listed
- [ ] `/dashboard` while logged out → redirected to `/login`
- [ ] `/dashboard` while logged in → renders account + release info
- [ ] Refresh while logged in → session persists
- [ ] Download button → real `DOWNLOAD_URL`, no fake link
- [ ] Site with `DOWNLOAD_URL` unset → shows "not configured," not a broken button
- [ ] Mobile viewport: nav menu, login form, OTP input all usable
- [ ] `prefers-reduced-motion` enabled → hero orbit animation stops
