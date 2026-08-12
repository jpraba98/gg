# Supabase Setup — Phase 2

This folder holds the SQL schema for the Phase 2 community platform (accounts,
articles, comments, likes, applications). There's no live Supabase project
connected in development — you apply this yourself.

## 1. Create a project

Create a project at [supabase.com](https://supabase.com) if you haven't already.

## 2. Run the schema

Open **Project → SQL Editor → New query**, paste the full contents of
`schema.sql`, and run it. It's idempotent — safe to re-run if you need to
apply an updated version later.

This creates:
- `profiles`, `articles`, `comments`, `likes`, `applications` tables
- Row Level Security policies on every table (see inline comments in
  `schema.sql` for what each policy allows)
- A trigger that auto-creates a `profiles` row when someone signs up
- A trigger that blocks non-admins from changing their own `role` or
  `membership_tier` (privilege escalation guard)
- A trigger that enforces one-level-deep comment replies
- A public `article-covers` Storage bucket for blog cover images, writable
  only by staff/admin

## 3. Enable Google OAuth (optional)

**Authentication → Providers → Google** — add your OAuth client ID/secret if
you want the "Continue with Google" button to work.

## 4. Set environment variables

Copy the Project URL, anon key, and service role key into `.env.local` (see
`.env.example` at the repo root). The service role key is server-only —
never expose it to the client or commit it.

## 5. Promote yourself to admin

Sign up once through the live site, then in the SQL Editor:

```sql
update public.profiles set role = 'admin'
where id = (select id from auth.users where email = 'your-email@example.com');
```

Promote teammates to `staff` the same way. Everyone else defaults to
`member`.

## 6. Membership tiers

`membership_tier` starts as `free` for every new signup. The Stripe
checkout flow (`/api/checkout`) doesn't currently write back to Supabase —
wire a Stripe webhook to update `profiles.membership_tier` when a
subscription is created/cancelled if you want tier status to update
automatically instead of manually.
