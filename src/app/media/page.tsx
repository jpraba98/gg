import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { YouTubeGrid } from "@/components/sections/media/youtube-grid";
import { InstagramPreview } from "@/components/sections/media/instagram-preview";

export const metadata: Metadata = {
  title: "Media",
  description:
    "Watch event recaps, music videos, interviews, and behind-the-scenes content from TheDripRoom6ix.",
};

export default function MediaPage() {
  return (
    <>
      <section className="border-b border-border py-20">
        <Container>
          <p className="section-label">Media</p>
          <h1 className="mt-3 font-display text-5xl text-white sm:text-6xl">
            Watch <span className="text-gradient-drip">TheDripRoom6ix</span>
          </h1>
          <p className="mt-4 max-w-xl text-text-secondary">
            Event recaps, music videos, interviews, and behind-the-scenes — straight from{" "}
            {`@thedriproom6ix`}.
          </p>

          <div className="mt-12">
            <YouTubeGrid />
          </div>
        </Container>
      </section>
      <InstagramPreview />
    </>
  );
}
