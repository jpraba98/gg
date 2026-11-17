"use client";

import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { motion } from "framer-motion";
import { PlayCircle, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { YouTubeVideo } from "@/types/youtube";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function MediaPreview() {
  const { data, isLoading } = useSWR<{ videos: YouTubeVideo[] }>("/api/youtube?limit=3", fetcher);
  const videos = data?.videos ?? [];

  return (
    <section className="py-24">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-label">Latest Media</p>
            <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">
              From the Channel
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/media">
              View All
              <ArrowUpRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {isLoading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="aspect-video animate-pulse rounded-2xl bg-card" />
            ))}

          {!isLoading &&
            videos.map((video, i) => (
              <motion.a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="card-lift group overflow-hidden p-0 hover:border-drip-500/50">
                  <div className="relative aspect-video overflow-hidden bg-card">
                    <Image
                      src={video.thumbnail}
                    unoptimized
                      alt={video.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                      <PlayCircle className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="line-clamp-2 font-semibold text-white">{video.title}</h3>
                    <p className="mt-2 text-xs text-text-secondary">
                      {video.viewCount ? `${video.viewCount} views · ` : ""}
                      {video.publishedAt}
                    </p>
                  </div>
                </Card>
              </motion.a>
            ))}
        </div>
      </Container>
    </section>
  );
}
