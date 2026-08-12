import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Clock, ArrowLeft } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/data/blog";
import { getArticleBySlug, getPublishedArticles } from "@/lib/articles";
import { ShareButtons } from "@/components/sections/blog/share-buttons";
import { LikeButton } from "@/components/shared/like-button";
import { CommentSection } from "@/components/shared/comment-section";
import { getLikeState, getComments } from "@/lib/supabase/interactions";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getArticleBySlug(params.slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getArticleBySlug(params.slug);
  if (!post) notFound();

  const [allArticles, likeState, commentState] = await Promise.all([
    getPublishedArticles(),
    getLikeState("blog", post.slug),
    getComments("blog", post.slug),
  ]);
  const related = allArticles.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="py-20">
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Blog
        </Link>

        <p className="section-label mt-8">{post.category}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight text-white sm:text-5xl">
          {post.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-text-secondary">
          <span>By {post.author}</span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {new Date(post.date).toLocaleDateString("en-CA", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {post.readTime}
          </span>
          <LikeButton
            contentType="blog"
            contentId={post.slug}
            initialCount={likeState.count}
            initialLiked={likeState.likedByMe}
            isLoggedIn={!!likeState.currentUserId}
          />
        </div>

        {post.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="mt-10 h-64 w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="mt-10 h-64 rounded-2xl bg-gradient-to-br from-drip-500/20 to-obsidian" />
        )}

        <div
          className="prose prose-invert mt-10 max-w-none space-y-5 text-base leading-relaxed text-text-secondary"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />

        <ShareButtons title={post.title} />

        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <p className="section-label">Related Articles</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`}>
                  <Card className="card-lift p-5 hover:border-drip-500/40">
                    <p className="text-xs font-semibold uppercase tracking-wide text-drip-500">
                      {r.category}
                    </p>
                    <h3 className="mt-2 font-display text-lg text-white">{r.title}</h3>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 border-t border-border pt-10">
          <CommentSection
            contentType="blog"
            contentId={post.slug}
            initialComments={commentState.comments}
            isLoggedIn={!!commentState.currentUserId}
          />
        </div>
      </Container>
    </article>
  );
}
