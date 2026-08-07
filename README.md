# The Drip Room — thedriproom6ix.com

Toronto's Creative Engine. A Next.js 14 (App Router) site for The Drip Room — talent
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
cp .env.local.example .env.local   # then fill in the keys you have
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs and looks complete with
zero environment variables configured — every integration (Supabase auth, Stripe checkout,
YouTube API, Resend email) degrades gracefully to a placeholder/mock state until you add
real keys, so you can develop the UI without external accounts.

## Project Structure

```
src/
  app/                    Routes (App Router) — one folder per page, plus app/api/*
  components/
    ui/                   shadcn-style primitives (Button, Card, Dialog, Accordion, ...)
    layout/                Navbar, Footer, mobile FAB
    shared/                Logo, Container, AnimatedCounter, social icons
    sections/<page>/       Page-specific section components
  data/                    Static/mock content (events, services, sponsor tiers, blog, membership)
  lib/                     site-config, cn() util, zod schemas, Supabase client factories
  types/                   Shared TypeScript types
```

## Environment Variables

See `.env.local.example` for the full list with explanations. Summary:

| Variable | Used for | Required? |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Members portal auth (sign up, login, Google OAuth, dashboard) | Only for live member accounts |
| `STRIPE_SECRET_KEY` | Stripe Checkout session creation (`/api/checkout`) | Only for live DR Member checkout |
| `STRIPE_PRICE_DR_MEMBER_MONTHLY` / `STRIPE_PRICE_DR_MEMBER_YEARLY` | Stripe recurring Price IDs for the DR Member tier | Only for live checkout |
| `YOUTUBE_API_KEY` | Live video grid on `/media` and the homepage preview | Falls back to placeholder videos if unset |
| `YOUTUBE_CHANNEL_HANDLE` | Channel to pull videos from (defaults to `thedriproom6ix`) | No |
| `RESEND_API_KEY` | Emails the Services booking form and Sponsor inquiry form to `416mediacompany@gmail.com` | Falls back to server console logging if unset |
| `RESEND_FROM_EMAIL` | Sender identity for Resend | No |

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
4. The "Top Tier" and "E-Transfer" paths open an instructions modal instead of Stripe,
   pointing members to `416mediacompany@gmail.com`.

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
add one only if you build live ticket-inventory sync later.

### Resend (Form Notifications)
Both the Services booking form and Sponsor inquiry form POST to `/api/contact`, which
validates with Zod and emails `416mediacompany@gmail.com` via Resend. Without
`RESEND_API_KEY`, submissions are logged server-side instead of emailed (useful for local
development).

## Content & Data

Blog posts, past-event history, service pricing, sponsorship tiers, and membership tiers
are all defined as typed data in `src/data/*.ts` — edit those files directly, or swap them
for a CMS/Supabase table later without touching page components.

## Design System

- Obsidian (`#09090B`) background, Ice Blue (`#5BC8F5`) accent globally.
- Events pages (`/events` and the Island Motion detail) switch to Gold (`#D4AF37`) via the
  `variant="gold"` prop on `Logo`, `gold`-variant buttons, and `text-gradient-gold` /
  `section-label-gold` utility classes in `globals.css`.
- The Island Motion Vol. 1 feature uses the Purple (`#8B5CF6`) "motion" accent throughout.
- Display headings use Bebas Neue (`--font-display`); body copy uses Inter (`--font-body`),
  both loaded via `next/font/google` in `src/app/layout.tsx`.

## Deployment

Deploy to [Vercel](https://vercel.com/new) or any Node host that supports Next.js 14. Set
the environment variables above in your hosting provider before going live.
