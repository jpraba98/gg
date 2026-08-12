-- ============================================================================
-- TheDripRoom6ix — Phase 2 Supabase schema
--
-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query)
-- against a fresh project. Safe to re-run — every statement is idempotent
-- (CREATE ... IF NOT EXISTS / OR REPLACE / DROP POLICY IF EXISTS first).
--
-- After running this file:
--   1. Set NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY /
--      SUPABASE_SERVICE_ROLE_KEY in your environment (see .env.example).
--   2. Promote your own account to admin — see the bottom of this file.
-- ============================================================================

-- ── Extensions ──────────────────────────────────────────────────────────────
create extension if not exists "pgcrypto";

-- ── Shared helpers ──────────────────────────────────────────────────────────
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ── Enums ───────────────────────────────────────────────────────────────────
do $$ begin
  create type public.app_role as enum ('member', 'staff', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.membership_tier as enum ('free', 'member', 'top_tier');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.content_status as enum ('draft', 'published');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.moderation_status as enum ('pending', 'approved', 'hidden');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.application_status as enum ('pending', 'reviewed', 'accepted', 'rejected');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.content_type as enum ('blog', 'media', 'event');
exception when duplicate_object then null; end $$;

-- ── profiles ────────────────────────────────────────────────────────────────
-- One row per auth.users row, created automatically by the trigger below.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  avatar_url text,
  membership_tier public.membership_tier not null default 'free',
  role public.app_role not null default 'member',
  notify_email boolean not null default true,
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1)))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- SECURITY DEFINER helper so RLS policies on other tables can check a user's
-- role/tier without re-triggering RLS on profiles (avoids recursive policy
-- evaluation issues). Safe to call from any policy.
create or replace function public.current_user_role()
returns public.app_role
language sql
security definer set search_path = public
stable
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_staff_or_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select coalesce(public.current_user_role() in ('staff', 'admin'), false);
$$;

create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select coalesce(public.current_user_role() = 'admin', false);
$$;

alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by everyone" on public.profiles;
create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

-- RLS WITH CHECK can't reliably compare old vs. new column values (the
-- subquery inside a WITH CHECK runs against the row's post-update state in
-- the same statement), so privilege escalation on role/membership_tier is
-- guarded by a proper BEFORE UPDATE trigger instead, which has real OLD/NEW
-- row access.
create or replace function public.protect_profile_privileged_columns()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  if not public.is_admin() then
    if new.role is distinct from old.role or new.membership_tier is distinct from old.membership_tier then
      raise exception 'Only admins can change role or membership_tier';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_privileged_columns on public.profiles;
create trigger protect_profile_privileged_columns
  before update on public.profiles
  for each row execute procedure public.protect_profile_privileged_columns();

-- ── articles ────────────────────────────────────────────────────────────────
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  body text,
  cover_image_url text,
  category text not null default 'Culture',
  author_id uuid references public.profiles (id) on delete set null,
  status public.content_status not null default 'draft',
  published_at timestamptz,
  view_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists touch_articles_updated_at on public.articles;
create trigger touch_articles_updated_at
  before update on public.articles
  for each row execute procedure public.touch_updated_at();

alter table public.articles enable row level security;

drop policy if exists "Published articles are public" on public.articles;
create policy "Published articles are public"
  on public.articles for select
  using (status = 'published' or public.is_staff_or_admin() or author_id = auth.uid());

drop policy if exists "Staff can insert articles" on public.articles;
create policy "Staff can insert articles"
  on public.articles for insert
  with check (public.is_staff_or_admin());

drop policy if exists "Staff can update articles" on public.articles;
create policy "Staff can update articles"
  on public.articles for update
  using (public.is_staff_or_admin());

drop policy if exists "Staff can delete articles" on public.articles;
create policy "Staff can delete articles"
  on public.articles for delete
  using (public.is_staff_or_admin());

-- ── comments ────────────────────────────────────────────────────────────────
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  content_type public.content_type not null,
  content_id text not null,
  user_id uuid not null references public.profiles (id) on delete cascade,
  body text not null,
  parent_id uuid references public.comments (id) on delete cascade,
  status public.moderation_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists comments_content_idx on public.comments (content_type, content_id);

drop trigger if exists touch_comments_updated_at on public.comments;
create trigger touch_comments_updated_at
  before update on public.comments
  for each row execute procedure public.touch_updated_at();

-- Enforce "one level deep" replies: you can only reply to a top-level
-- comment, not to a reply.
create or replace function public.enforce_one_level_comment_nesting()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  parent_has_parent boolean;
begin
  if new.parent_id is not null then
    select (parent_id is not null) into parent_has_parent
    from public.comments where id = new.parent_id;
    if parent_has_parent then
      raise exception 'Replies can only be one level deep';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists enforce_one_level_comment_nesting on public.comments;
create trigger enforce_one_level_comment_nesting
  before insert on public.comments
  for each row execute procedure public.enforce_one_level_comment_nesting();

alter table public.comments enable row level security;

drop policy if exists "Approved comments are public, own comments visible to author" on public.comments;
create policy "Approved comments are public, own comments visible to author"
  on public.comments for select
  using (status = 'approved' or user_id = auth.uid() or public.is_staff_or_admin());

drop policy if exists "Logged in members can comment" on public.comments;
create policy "Logged in members can comment"
  on public.comments for insert
  with check (auth.uid() = user_id);

drop policy if exists "Authors can edit their own pending/approved comments" on public.comments;
create policy "Authors can edit their own pending/approved comments"
  on public.comments for update
  using (user_id = auth.uid() or public.is_staff_or_admin());

drop policy if exists "Authors and staff can delete comments" on public.comments;
create policy "Authors and staff can delete comments"
  on public.comments for delete
  using (user_id = auth.uid() or public.is_staff_or_admin());

-- ── likes ───────────────────────────────────────────────────────────────────
create table if not exists public.likes (
  id uuid primary key default gen_random_uuid(),
  content_type public.content_type not null,
  content_id text not null,
  user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (content_type, content_id, user_id)
);

create index if not exists likes_content_idx on public.likes (content_type, content_id);

alter table public.likes enable row level security;

drop policy if exists "Likes are public" on public.likes;
create policy "Likes are public"
  on public.likes for select
  using (true);

drop policy if exists "Logged in members can like" on public.likes;
create policy "Logged in members can like"
  on public.likes for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can remove their own like" on public.likes;
create policy "Users can remove their own like"
  on public.likes for delete
  using (auth.uid() = user_id);

-- ── applications ────────────────────────────────────────────────────────────
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete set null,
  full_name text not null,
  email text not null,
  instagram text,
  role text not null,
  why_join text not null,
  portfolio_url text,
  why_create text,
  who_for text,
  one_thing text,
  status public.application_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists touch_applications_updated_at on public.applications;
create trigger touch_applications_updated_at
  before update on public.applications
  for each row execute procedure public.touch_updated_at();

alter table public.applications enable row level security;

drop policy if exists "Applicants can view their own application" on public.applications;
create policy "Applicants can view their own application"
  on public.applications for select
  using (user_id = auth.uid() or public.is_staff_or_admin());

drop policy if exists "Logged in members can apply" on public.applications;
create policy "Logged in members can apply"
  on public.applications for insert
  with check (auth.uid() = user_id);

drop policy if exists "Staff can update application status" on public.applications;
create policy "Staff can update application status"
  on public.applications for update
  using (public.is_staff_or_admin());

-- ── Storage: article cover images ──────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('article-covers', 'article-covers', true)
on conflict (id) do nothing;

drop policy if exists "Article covers are publicly readable" on storage.objects;
create policy "Article covers are publicly readable"
  on storage.objects for select
  using (bucket_id = 'article-covers');

drop policy if exists "Staff can upload article covers" on storage.objects;
create policy "Staff can upload article covers"
  on storage.objects for insert
  with check (bucket_id = 'article-covers' and public.is_staff_or_admin());

drop policy if exists "Staff can update article covers" on storage.objects;
create policy "Staff can update article covers"
  on storage.objects for update
  using (bucket_id = 'article-covers' and public.is_staff_or_admin());

drop policy if exists "Staff can delete article covers" on storage.objects;
create policy "Staff can delete article covers"
  on storage.objects for delete
  using (bucket_id = 'article-covers' and public.is_staff_or_admin());

-- ============================================================================
-- Promote yourself to admin after signing up once through the site:
--
--   update public.profiles set role = 'admin' where id =
--     (select id from auth.users where email = 'your-email@example.com');
--
-- Promote a teammate to staff the same way with role = 'staff'.
-- ============================================================================
