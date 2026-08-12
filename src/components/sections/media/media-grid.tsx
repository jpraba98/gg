"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { motion } from "framer-motion";
import { PlayCircle, Heart, ExternalLink } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ContentInteractions } from "@/components/shared/content-interactions";
import type { YouTubeVideo } from "@/types/youtube";
import type { InstagramPost } from "@/types/instagram";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const filters = [
  "All",
  "Event Recaps",
  "Music Videos",
  "Interviews",
  "Behind the Scenes",
  "Instagram Feed",
] as const;

function VideoModal({ video, onClose }: { video: YouTubeVideo; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto p-2">
        <DialogTitle className="sr-only">{video.title}</DialogTitle>
        {!video.id.startsWith("placeholder") ? (
          <div className="aspect-video overflow-hidden rounded-xl">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-xl bg-card text-text-secondary">
            Connect a YouTube API key to play this video.
          </div>
        )}
        <div className="p-4">
          <h3 className="font-display text-xl text-white">{video.title}</h3>
          <div className="mt-6 border-t border-border pt-6">
            <ContentInteractions contentType="media" contentId={video.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InstagramModal({ post, onClose }: { post: InstagramPost; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto p-2">
        <DialogTitle className="sr-only">Instagram post</DialogTitle>
        <div className="relative aspect-square overflow-hidden rounded-xl bg-card">
          <Image src={post.mediaUrl} alt={post.caption || "Instagram post"} fill className="object-cover" />
        </div>
        <div className="p-4">
          <p className="text-sm text-white">{post.caption}</p>
          <div className="mt-3 flex items-center gap-4 text-xs text-text-secondary">
            {typeof post.likeCount === "number" && (
              <span className="flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                {post.likeCount}
              </span>
            )}
            <a
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-drip-500 hover:underline"
            >
              View on Instagram
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
          <div className="mt-6 border-t border-border pt-6">
            <ContentInteractions contentType="media" contentId={post.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function MediaGrid() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [activeVideo, setActiveVideo] = useState<YouTubeVideo | null>(null);
  const [activePost, setActivePost] = useState<InstagramPost | null>(null);

  const { data: videoData, isLoading: videosLoading } = useSWR<{ videos: YouTubeVideo[] }>(
    filter !== "Instagram Feed" ? "/api/youtube?limit=12" : null,
    fetcher,
  );
  const { data: postData, isLoading: postsLoading } = useSWR<{ posts: InstagramPost[] }>(
    filter === "Instagram Feed" ? "/api/instagram?limit=12" : null,
    fetcher,
  );

  const videos = useMemo(() => {
    const all = videoData?.videos ?? [];
    if (filter === "All") return all;
    if (filter === "Instagram Feed") return [];
    return all.filter((v) => v.category === filter);
  }, [videoData, filter]);

  const isInstagram = filter === "Instagram Feed";
  const isLoading = isInstagram ? postsLoading : videosLoading;

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

        {!isLoading && !isInstagram && videos.length === 0 && (
          <p className="col-span-full text-text-secondary">No videos in this category yet.</p>
        )}

        {!isLoading &&
          !isInstagram &&
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
                    <PlayCircle className="h-12 w-12 text-white" aria-hidden="true" />
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

        {!isLoading &&
          isInstagram &&
          (postData?.posts ?? []).map((post, i) => (
            <motion.button
              key={post.id}
              onClick={() => setActivePost(post)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
              className="text-left"
            >
              <Card className="card-lift group overflow-hidden p-0 hover:border-drip-500/50">
                <div className="relative aspect-square overflow-hidden bg-card">
                  <Image
                    src={post.mediaUrl}
                    alt={post.caption || "Instagram post"}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="line-clamp-2 text-sm text-white">{post.caption || "Instagram post"}</p>
                </div>
              </Card>
            </motion.button>
          ))}
      </div>

      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
      {activePost && <InstagramModal post={activePost} onClose={() => setActivePost(null)} />}
    </div>
  );
}
