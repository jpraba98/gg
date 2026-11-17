"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock, Search } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Article } from "@/lib/articles";

const CATEGORIES = [
  "All",
  "Events",
  "Artist Features",
  "Industry Tips",
  "Press Releases",
  "Culture",
  "Behind the Scenes",
] as const;

export function BlogGrid({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return articles.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesQuery =
        !query.trim() ||
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [articles, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={category} onValueChange={(v) => setCategory(v as typeof category)}>
          <TabsList className="flex-wrap justify-start">
            {CATEGORIES.map((c) => (
              <TabsTrigger key={c} value={c}>
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" aria-hidden="true" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="pl-9"
            aria-label="Search articles"
          />
        </div>
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-text-secondary">No articles match your search yet.</p>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
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
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    {new Date(post.date).toLocaleDateString("en-CA", {
                      timeZone: "UTC",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
