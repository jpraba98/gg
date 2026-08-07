"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { YouTubeVideo } from "@/types/youtube";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const filters = ["All", "Event Recaps", "Music Videos", "Interviews", "Behind the Scenes"] as const;

export function YouTubeGrid() {
  const { data, isLoading } = useSWR<{ videos: YouTubeVideo[] }>("/api/youtube?limit=12", fetcher);
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);

  const videos = useMemo(() => {
    const all = data?.videos ?? [];
    if (filter === "All") return all;
    return all.filter((v) => v.category === filter);
  }, [data, filter]);

  return (
    <div>
      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
        <TabsList className="flex-wrap justify-start">
          {filters.map((f) => (
            <TabsTrigger key={f} value={f}>
              {f}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-video animate-pulse rounded-2xl bg-card" />
          ))}

        {!isLoading && videos.length === 0 && (
          <p className="col-span-full text-text-secondary">No videos in this category yet.</p>
        )}

        {!isLoading &&
          videos.map((video, i) => (
            <motion.button
              key={video.id}
              onClick={() => setActiveVideo(video)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
              className="text-left"
            >
              <Card className="card-lift group overflow-hidden p-0 hover:border-drip-500/50">
                <div className="relative aspect-video overflow-hidden bg-card">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
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
            </motion.button>
          ))}
      </div>

      <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent className="max-w-3xl p-2">
          <DialogTitle className="sr-only">{activeVideo?.title ?? "Video"}</DialogTitle>
          {activeVideo && !activeVideo.id.startsWith("placeholder") ? (
            <div className="aspect-video overflow-hidden rounded-xl">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex aspect-video items-center justify-center rounded-xl bg-card text-text-secondary">
              Connect a YouTube API key to play this video.
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
