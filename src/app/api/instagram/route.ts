import { NextRequest, NextResponse } from "next/server";

import type { InstagramPost } from "@/types/instagram";

export const revalidate = 3600;

// TODO: Instagram Graph API requires @thedriproom6ix to be connected to a
// Facebook Business account, with INSTAGRAM_ACCESS_TOKEN and
// INSTAGRAM_USER_ID set (see .env.example). Until then this route falls
// back to placeholder posts so the UI still renders.
const PLACEHOLDER_POSTS: InstagramPost[] = Array.from({ length: 6 }).map((_, i) => ({
  id: `placeholder-${i + 1}`,
  mediaUrl: `https://placehold.co/640x640/111111/5BC8F5?text=The+Drip+Room`,
  caption: "Connect the Instagram Graph API to show live posts here.",
  permalink: "https://instagram.com/thedriproom6ix",
  timestamp: new Date().toISOString(),
  mediaType: "IMAGE",
}));

export async function GET(req: NextRequest) {
  const limit = Number(req.nextUrl.searchParams.get("limit") ?? 12);
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!accessToken || !userId) {
    return NextResponse.json({ posts: PLACEHOLDER_POSTS.slice(0, limit), source: "placeholder" });
  }

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count";
    const res = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      return NextResponse.json({ posts: PLACEHOLDER_POSTS.slice(0, limit), source: "placeholder" });
    }

    const data = await res.json();

    interface GraphMediaItem {
      id: string;
      caption?: string;
      media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
      media_url: string;
      thumbnail_url?: string;
      permalink: string;
      timestamp: string;
      like_count?: number;
    }

    const posts: InstagramPost[] = ((data.data ?? []) as GraphMediaItem[]).map((item) => ({
      id: item.id,
      mediaUrl: item.media_type === "VIDEO" ? (item.thumbnail_url ?? item.media_url) : item.media_url,
      thumbnailUrl: item.thumbnail_url,
      caption: item.caption ?? "",
      likeCount: item.like_count,
      permalink: item.permalink,
      timestamp: item.timestamp,
      mediaType: item.media_type,
    }));

    return NextResponse.json({ posts, source: "instagram" });
  } catch {
    return NextResponse.json({ posts: PLACEHOLDER_POSTS.slice(0, limit), source: "placeholder" });
  }
}
