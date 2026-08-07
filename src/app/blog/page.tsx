import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Event recaps, artist features, industry tips, and press releases from TheDripRoom6ix.",
};

export default function BlogPage() {
  return (
    <section className="py-20">
      <Container>
        <div className="mb-12 max-w-xl">
          <p className="section-label">Blog</p>
          <h1 className="mt-3 font-display text-5xl text-white sm:text-6xl">
            TheDripRoom6ix <span className="text-gradient-drip">Journal</span>
          </h1>
          <p className="mt-4 text-text-secondary">
            Events, artist features, industry tips, press releases, and culture — from the team
            building Toronto&apos;s creative engine.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="card-lift flex h-full flex-col overflow-hidden p-0 hover:border-drip-500/40">
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-drip-500/20 to-obsidian">
                  <span className="text-xs font-semibold uppercase tracking-wide text-drip-500">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-xl leading-snug text-white">{post.title}</h2>
                  <p className="mt-2 flex-1 text-sm text-text-secondary">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-text-secondary">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(post.date).toLocaleDateString("en-CA", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
