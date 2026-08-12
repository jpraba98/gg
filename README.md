# TheDripRoom6ix — thedriproom6ix.com

Toronto's Creative Engine. A Next.js 14 (App Router) site for TheDripRoom6ix — talent
management, media production, and event production — built by MGT Entertainment. Phase 2
turns it into a full community platform: accounts, comments, likes, a staff-run blog CMS,
and team applications.

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS + Framer Motion
- **Components:** shadcn/ui-style primitives (Radix UI) + Lucide React icons
- **Forms:** React Hook Form + Zod
- **Auth / DB:** Supabase (`@supabase/ssr`) — accounts, articles, comments, likes, applications
- **Rich text:** TipTap (staff article editor)
- **Payments:** Stripe Checkout (card, Apple Pay, PayPal via Stripe) + E-Transfer instructions
- **Email:** Resend (booking inquiries + team applications)
- **Media:** YouTube Data API v3 + Instagram Graph API

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in the keys you have
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs and looks complete with
zero environment variables configured — every integration (Supabase auth, Stripe checkout,
YouTube/Instagram APIs, Resend email) degrades gracefully to a placeholder/mock state until
you add real keys, so you can develop the UI without external accounts. Accounts, comments,
likes, the blog CMS, and applications all require Supabase specifically — see
[supabase/README.md](./supabase/README.md) to set that up.

## Logo Assets

The navbar/footer/hero logo marks read from `public/images/logo-blue.png` (global brand)
and `public/images/logo-gold.png` (Events pages), plus `logo-blue-compact.png` /
`logo-gold-compact.png` (tightly-cropped variants for navbar/footer height — plain crops of
the same source files, no re-editing). `src/components/shared/logo.tsx` renders them
directly; if a file is missing it falls back to a generated inline diamond mark + wordmark
so the site never shows a broken image.

## Project Structure

```
src/
  app/                    Routes (App Router) — one folder per page, plus app/api/*
    dashboard/             Member dashboard (protected)
    staff/                 Staff dashboard (protected, role-gated) + /staff/login
    login/ signup/          Auth pages
    events/[slug]/          Individual event pages (comments + likes)
    blog/[slug]/            Individual article pages (comments + likes)
  components/
    ui/                   shadcn-style primitives (Button, Card, Dialog, DropdownMenu, ...)
    layout/                Navbar (auth-aware), Footer, mobile FAB + sticky social bar
    shared/                Logo, Container, LikeButton, CommentSection, social icons
    sections/<page>/       Page-specific section components
    sections/auth/          Shared auth page shell + forms
    sections/staff/         Article Manager, Comment Moderator, Application Viewer, User Manager
  data/                    Static/mock content — used as the fallback when Supabase has no
                            data yet (events, services, blog, membership, press)
  lib/                     site-config, cn() util, zod schemas, Supabase client/server/
                            middleware helpers, articles.ts (Supabase-first blog data layer)
  middleware.ts             Refreshes the Supabase session cookie on every request
  types/                   Shared TypeScript types
public/
  images/                  Drop logo-blue.png / logo-gold.png (+ compact crops) here
supabase/
  schema.sql               Full DB schema, RLS policies, triggers — run once in SQL Editor
  README.md                Step-by-step Supabase setup
```

## Environment Variables

See `.env.example` for the full list with inline explanations. Summary:

| Variable | Used for | Required? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata | No |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Accounts, dashboards, comments, likes, blog CMS, applications | Only for any of those features |
| `SUPABASE_SERVICE_ROLE_KEY` | Not currently read by any route (RLS handles authorization) — kept for future admin tooling | No |
| `STRIPE_SECRET_KEY` | Stripe Checkout session creation (`/api/checkout`) | Only for live Member checkout |
| `STRIPE_PRICE_DR_MEMBER_MONTHLY` / `STRIPE_PRICE_DR_MEMBER_YEARLY` | Stripe recurring Price IDs for the TheDripRoom6ix Member tier | Only for live checkout |
| `YOUTUBE_API_KEY` | Live video grid on `/media` | Falls back to placeholder videos if unset |
| `YOUTUBE_CHANNEL_HANDLE` | Channel to pull videos from (defaults to `thedriproom6ix`) | No |
| `INSTAGRAM_ACCESS_TOKEN` / `INSTAGRAM_USER_ID` | Live "Instagram Feed" tab on `/media` | Falls back to placeholder posts if unset |
| `EVENTBRITE_API_KEY` | Reserved for a future live ticket-inventory sync (not yet called by any route) | No |
| `RESEND_API_KEY` | Emails the Services booking form and team applications | Falls back to server console logging if unset |
| `RESEND_FROM_EMAIL` | Sender identity for Resend | No |
| `CONTACT_EMAIL` | Inbox that booking inquiries and applications are sent to (defaults to `416mediacompany@gmail.com`) | No |

## Account System

Three tiers of access, enforced server-side via Supabase RLS — never trust the client-side
nav state alone:

- **Guest** — public pages only.
- **Member** (`profiles.role = 'member'`, the default) — sign up at `/signup`, log in at
  `/login`. Can comment, like, and apply for team roles. `membership_tier` (`free` /
  `member` / `top_tier`) is separate from `role` and tracks paid status.
- **Staff** (`profiles.role = 'staff'`) — assigned by an admin (see
  `supabase/README.md`), signs in at `/staff/login`, gets `/staff`: article manager
  (TipTap editor, publish/unpublish), comment moderation, application review.
- **Admin** (`profiles.role = 'admin'`) — everything staff can do, plus the User Manager
  tab in `/staff` to assign/revoke roles.

`src/lib/supabase/guards.ts` (`requireMember`, `requireStaff`) does the actual server-side
check on every protected page — `src/middleware.ts` only refreshes the session cookie, it
doesn't gate routes.

## Comments & Likes

Reusable `LikeButton` and `CommentSection` components (`src/components/shared/`) are wired
into blog articles (`/blog/[slug]`), individual events (`/events/[slug]`), and media items
(the video/Instagram modals on `/media`). Comments default to a moderation queue
(`status: 'pending'`) and only appear publicly once a staff member approves them in
`/staff`; the poster always sees their own pending comment marked "pending review". Replies
are one level deep, enforced both in the UI and by a DB trigger.

## API Integration Notes

### Supabase (Accounts, Blog, Comments, Likes, Applications)
See [supabase/README.md](./supabase/README.md) for the full walkthrough — creating the
project, running `schema.sql`, enabling Google OAuth, and promoting your first admin.
`src/lib/supabase/client.ts` (browser) and `server.ts` (server components / route handlers)
both return `null` if the env vars are missing, so every dependent UI shows a "not
configured" state instead of crashing.

### Stripe (Member Checkout)
1. Create a Product with two recurring Prices ($5/mo, $60/yr) in the Stripe Dashboard.
2. Set `STRIPE_SECRET_KEY`, `STRIPE_PRICE_DR_MEMBER_MONTHLY`, `STRIPE_PRICE_DR_MEMBER_YEARLY`.
3. `POST /api/checkout` with `{ "plan": "dr-member-monthly" }` creates a Checkout Session
   and returns its URL — Apple Pay and PayPal are enabled automatically per your Stripe
   Dashboard payment method settings.
4. The "Top Tier" ($10/mo or $120/yr) path opens an E-Transfer instructions modal instead
   of Stripe, pointing members to `416mediacompany@gmail.com`.
5. Checkout doesn't currently write back to `profiles.membership_tier` automatically —
   there's no Stripe webhook handler yet. Update it manually in Supabase for now, or add a
   webhook if you want it automatic (see the note in `supabase/README.md`).

### YouTube Data API v3
1. Enable "YouTube Data API v3" in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and create an API key.
2. Set `YOUTUBE_API_KEY` (and optionally `YOUTUBE_CHANNEL_HANDLE`).
3. `GET /api/youtube?limit=N` resolves the channel's uploads playlist and returns the
   latest `N` videos. Without a key, it returns placeholder videos so the UI still renders.

### Instagram Graph API
1. Requires @thedriproom6ix to be connected to a Facebook Business account (Instagram
   Basic Display alone isn't enough for the Graph API endpoint used here).
2. Set `INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_USER_ID`.
3. `GET /api/instagram?limit=N` returns the latest posts (revalidated hourly). Without
   credentials it returns placeholder posts. See the TODO comment in
   `src/app/api/instagram/route.ts`.

### Eventbrite
The current Island Motion Vol. 1 event links directly to its Eventbrite listing
(`https://www.eventbrite.ca/e/1996006511206`) via `siteConfig.eventbriteUrl` and
per-event `ticketUrl` fields in `src/data/events.ts`. No API key is required for this;
`EVENTBRITE_API_KEY` is reserved for a future live ticket-inventory sync.

### Resend (Form Notifications)
The Services booking form (`/api/contact`) and team applications (`/api/applications`)
validate with Zod and email `CONTACT_EMAIL` (defaults to `416mediacompany@gmail.com`) via
Resend. Without `RESEND_API_KEY`, submissions are logged server-side instead of emailed.

## Content & Data

- **Blog**: `src/lib/articles.ts` reads from the Supabase `articles` table if configured
  and there's at least one published article; otherwise it falls back to the static
  placeholder set in `src/data/blog.ts`. The two sources are never merged — once real
  content exists in Supabase, the placeholders step aside entirely. Staff write and publish
  articles at `/staff`.
- **Everything else** (event history, service pricing, membership tiers, press mentions) is
  still typed data in `src/data/*.ts` — edit those files directly.
- Anything still awaiting real client content (past-event photos, the sponsor deck,
  unconfirmed social links) is marked with a `// TODO` comment at its placeholder.

## Design System

- Obsidian (`#09090B`) background, Ice Blue (`#5BC8F5`) accent globally.
- Events pages (`/events` and its `[slug]` detail pages) switch to Gold (`#D4AF37`) via the
  `variant="gold"` prop on `Logo`, `gold`-variant buttons, and `text-gradient-gold` /
  `section-label-gold` utility classes in `globals.css`.
- The Island Motion Vol. 1 feature uses the Purple (`#8B5CF6`) "motion" accent throughout.
- Display headings use Bebas Neue (`--font-display`); body copy uses Inter (`--font-body`),
  both loaded via `next/font/google` in `src/app/layout.tsx`.

## Deployment (Vercel)

1. Import the repo at [vercel.com/new](https://vercel.com/new) — `vercel.json` pins the
   framework preset (`nextjs`), build command (`next build`), and output directory so the
   project deploys correctly with zero manual config.
2. Add every variable from `.env.example` under Project Settings → Environment Variables.
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain (`https://thedriproom6ix.com`).
4. Run `supabase/schema.sql` against your Supabase project before (or right after) your
   first deploy if you want accounts/comments/blog/applications live from day one.
5. Deploy — the site works with zero env vars set (all integrations degrade gracefully),
   so you can ship the UI first and wire up Supabase/Stripe/YouTube/Instagram/Resend after.

Any other Node host that supports Next.js 14 works too; just run `next build` then
`next start`.
