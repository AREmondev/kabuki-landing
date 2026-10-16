# KABUKI Japanese Language Academy

Official landing page for KABUKI Japanese Language Academy (Chapainawabganj, Nachole, Dhaka). Next.js 14 App Router, TypeScript, Tailwind 3.4.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
```

## Environment

Copy `.env.example` to `.env.local`.

- `NEXT_PUBLIC_SITE_URL` — canonical site URL
- `CONTACT_WEBHOOK_URL` — optional POST destination for enquiries
- `CONTACT_FROM_EMAIL` — reserved for a future transactional email adapter
- `RATE_LIMIT_WINDOW_MS` — contact rate-limit window (default 60000)
- `RATE_LIMIT_MAX` — max requests per IP in that window (default 5)

The contact API validates with the shared Zod schema, ignores honeypot submissions, rate-limits by IP, and posts to `CONTACT_WEBHOOK_URL` when set.

## Asset checklist

Replace labelled placeholders before production. Do not use AI-generated people.

- `public/images/logo.svg` and `logo-light.svg` — official KABUKI lockup
- Hero, programme, gallery, and branch photographs currently use licensed Unsplash Japan imagery
- Replace success-story landscapes with consented student portraits before claiming “real students”
- Behance files are not used: Behance work is copyrighted and cannot be copied into the site
- Facebook: https://www.facebook.com/kabukijapaneselanguageSchool
- Official logo and classroom photos live in `public/images/brand` and `public/images/life`
- Dhaka address in `lib/data/branches.ts` (currently “Contact for details”)
- Verified stats in `lib/data/results.ts` (hidden until added)

All visitor-facing copy lives in `lib/data`. Motion lives in `components/motion/variants.ts`.

## Deploy

Vercel: import the repo, set env vars, production branch. Output is a standard Next.js app.

## Integrity

No invented testimonials, awards, partner logos, or visa guarantees. Unknown facts stay as TODO placeholders.
# kabuki-landing
