# TheDripRoom6ix — thedriproom6ix.com

Toronto's Creative Engine. A Next.js 14 (App Router) site for TheDripRoom6ix — talent
management, media production, and event production — built by MGT Entertainment.

## Tech Stack

- **Framework:** Next.js 14 (App Router, TypeScript)
- **Styling:** Tailwind CSS + Framer Motion
- **Components:** shadcn/ui-style primitives (Radix UI) + Lucide React icons
- **Forms:** React Hook Form + Zod
- **Auth / DB:** Supabase (`@supabase/ssr`) — members portal
- **Payments:** Stripe Checkout (card, Apple Pay, PayPal via Stripe) + E-Transfer instructions
- **Email:** Resend (booking + sponsor inquiry notifications)
- **Media:** YouTube Data API v3

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in the keys you have
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs and looks complete with
zero environment variables configured — every integration (Supabase auth, Stripe checkout,
YouTube API, Resend email) degrades gracefully to a placeholder/mock state until you add
real keys, so you can develop the UI without external accounts.

## Logo Assets

The navbar/footer/hero logo marks read from `public/images/logo-blue.png` (global brand)
and `public/images/logo-gold.png` (Events pages). Drop the two client-provided PNGs at
those exact paths — `src/components/shared/logo.tsx` renders them directly with no other
code changes needed. Until the files exist, the component automatically falls back to a
generated inline diamond mark + wordmark so the site never shows a broken image.

## Project Structure

```
src/
  app/                    Routes (App Router) — one folder per page, plus app/api/*
  components/
    ui/                   shadcn-style primitives (Button, Card, Dialog, Accordion, ...)
    layout/                Navbar, Footer, mobile FAB + sticky social bar
    shared/                Logo, Container, AnimatedCounter, social icons
    sections/<page>/       Page-specific section components
  data/                    Static/mock content (events, services, sponsor stats, blog, membership)
  lib/                     site-config, cn() util, zod schemas, Supabase client factories
  types/                   Shared TypeScript types
public/
  images/                  Drop logo-blue.png / logo-gold.png here (see above)
```

## Environment Variables

See `.env.example` for the full list with inline explanations. Summary:

| Variable | Used for | Required? |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata | No |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Members portal auth (sign up, login, Google OAuth, dashboard) | Only for live member accounts |
| `SUPABASE_SERVICE_ROLE_KEY` | Reserved for future server-side/admin membership sync (not yet called by any route) | No |
| `STRIPE_SECRET_KEY` | Stripe Checkout session creation (`/api/checkout`) | Only for live DR Member checkout |
| `STRIPE_PRICE_DR_MEMBER_MONTHLY` / `STRIPE_PRICE_DR_MEMBER_YEARLY` | Stripe recurring Price IDs for the DR Member tier | Only for live checkout |
| `YOUTUBE_API_KEY` | Live video grid on `/media` and the homepage preview | Falls back to placeholder videos if unset |
| `YOUTUBE_CHANNEL_HANDLE` | Channel to pull videos from (defaults to `thedriproom6ix`) | No |
| `EVENTBRITE_API_KEY` | Reserved for a future live ticket-inventory sync (not yet called by any route) | No |
| `RESEND_API_KEY` | Emails the Services booking form and Sponsor inquiry form | Falls back to server console logging if unset |
| `RESEND_FROM_EMAIL` | Sender identity for Resend | No |
| `CONTACT_EMAIL` | Inbox that booking/sponsor inquiries are sent to (defaults to `416mediacompany@gmail.com`) | No |

## API Integration Notes

### Supabase (Members Portal)
1. Create a project at [supabase.com](https://supabase.com).
2. Enable the Google provider under Authentication → Providers if you want Google OAuth.
3. Copy the Project URL and anon key into `.env.local`.
4. `src/lib/supabase/client.ts` (browser) and `src/lib/supabase/server.ts` (server
   components / route handlers) both return `null` if the env vars are missing, so the
   UI shows a "not configured" state instead of crashing.

### Stripe (DR Member Checkout)
1. Create a Product with two recurring Prices ($5/mo, $60/yr) in the Stripe Dashboard.
2. Set `STRIPE_SECRET_KEY`, `STRIPE_PRICE_DR_MEMBER_MONTHLY`, `STRIPE_PRICE_DR_MEMBER_YEARLY`.
3. `POST /api/checkout` with `{ "plan": "dr-member-monthly" }` creates a Checkout Session
   and returns its URL — Apple Pay and PayPal are enabled automatically per your Stripe
   Dashboard payment method settings.
4. The "Top Tier" ($10/mo or $120/yr) and "E-Transfer" paths open an instructions modal
   instead of Stripe, pointing members to `416mediacompany@gmail.com`.

### YouTube Data API v3
1. Enable "YouTube Data API v3" in the [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and create an API key.
2. Set `YOUTUBE_API_KEY` (and optionally `YOUTUBE_CHANNEL_HANDLE`).
3. `GET /api/youtube?limit=N` resolves the channel's uploads playlist and returns the
   latest `N` videos. Without a key, it returns three placeholder videos so the UI still
   renders.

### Eventbrite
The current Island Motion Vol. 1 event links directly to its Eventbrite listing
(`https://www.eventbrite.ca/e/1996006511206`) via `siteConfig.eventbriteUrl` and
per-event `ticketUrl` fields in `src/data/events.ts`. No API key is required for this;
`EVENTBRITE_API_KEY` is reserved for a future live ticket-inventory sync.

### Resend (Form Notifications)
Both the Services booking form and Sponsor inquiry form POST to `/api/contact`, which
validates with Zod and emails `CONTACT_EMAIL` (defaults to `416mediacompany@gmail.com`)
via Resend. Without `RESEND_API_KEY`, submissions are logged server-side instead of
emailed (useful for local development).

## Content & Data

Blog posts, past-event history, service pricing, sponsor stats, and membership tiers are
all defined as typed data in `src/data/*.ts` — edit those files directly, or swap them for
a CMS/Supabase table later without touching page components. Anything still awaiting
real client content (blog articles, past-event photos, the sponsor deck PDF, social links
not yet confirmed) is marked with a `// TODO` comment at its placeholder.

## Design System

- Obsidian (`#09090B`) background, Ice Blue (`#5BC8F5`) accent globally.
- Events pages (`/events` and the Island Motion detail) switch to Gold (`#D4AF37`) via the
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
4. Deploy — the site works with zero env vars set (all integrations degrade gracefully),
   so you can ship the UI first and wire up Supabase/Stripe/YouTube/Resend afterward.

Any other Node host that supports Next.js 14 works too; just run `next build` then
`next start`.
