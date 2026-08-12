import { createClient } from "@/lib/supabase/server";
import { blogPosts } from "@/data/blog";

export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  author: string;
  coverImageUrl?: string;
  bodyHtml: string;
}

function estimateReadTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function staticPostToArticle(post: (typeof blogPosts)[number]): Article {
  const bodyHtml = post.content.map((p) => `<p>${p}</p>`).join("\n");
  return {
    slug: post.slug,
    title: post.title,
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    excerpt: post.excerpt,
    author: post.author,
    bodyHtml,
  };
}

interface SupabaseArticleRow {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string | null;
  cover_image_url: string | null;
  category: string;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
  profiles: { display_name: string | null } | null;
}

function supabaseRowToArticle(row: SupabaseArticleRow): Article {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    date: row.published_at ?? row.created_at,
    readTime: estimateReadTime(row.body ?? ""),
    excerpt: row.excerpt ?? "",
    author: row.profiles?.display_name ?? "TheDripRoom6ix Team",
    coverImageUrl: row.cover_image_url ?? undefined,
    bodyHtml: row.body ?? "",
  };
}

/**
 * Live articles from Supabase if configured and there are any published,
 * otherwise the static placeholder set. The two sources are never merged —
 * once real content exists, the placeholders step aside entirely.
 */
export async function getPublishedArticles(): Promise<Article[]> {
  const supabase = createClient();
  if (supabase) {
    const { data } = await supabase
      .from("articles")
      .select("id, title, slug, excerpt, body, cover_image_url, category, status, published_at, created_at, profiles(display_name)")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (data && data.length > 0) {
      return (data as unknown as SupabaseArticleRow[]).map(supabaseRowToArticle);
    }
  }

  return blogPosts.map(staticPostToArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = createClient();
  if (supabase) {
    const { data } = await supabase
      .from("articles")
      .select("id, title, slug, excerpt, body, cover_image_url, category, status, published_at, created_at, profiles(display_name)")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (data) {
      return supabaseRowToArticle(data as unknown as SupabaseArticleRow);
    }
  }

  const staticPost = blogPosts.find((p) => p.slug === slug);
  return staticPost ? staticPostToArticle(staticPost) : null;
}
