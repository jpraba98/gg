import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { BlogGrid } from "@/components/sections/blog/blog-grid";
import { getPublishedArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Event recaps, artist features, industry tips, and press releases from TheDripRoom6ix.",
};

export default async function BlogPage() {
  const articles = await getPublishedArticles();

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

        <BlogGrid articles={articles} />
      </Container>
    </section>
  );
}
