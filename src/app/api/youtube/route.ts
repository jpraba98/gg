import { NextRequest, NextResponse } from "next/server";

import type { YouTubeVideo } from "@/types/youtube";

export const revalidate = 3600;

const PLACEHOLDER_VIDEOS: YouTubeVideo[] = [
  {
    id: "placeholder-1",
    title: "Stars Align S5 — Official Recap",
    thumbnail: "https://placehold.co/640x360/111111/5BC8F5?text=The+Drip+Room",
    publishedAt: "2 weeks ago",
    viewCount: "1.2K",
    category: "Event Recaps",
  },
  {
    id: "placeholder-2",
    title: "6ixclusive — Behind the Scenes",
    thumbnail: "https://placehold.co/640x360/111111/5BC8F5?text=The+Drip+Room",
    publishedAt: "1 month ago",
    viewCount: "890",
    category: "Behind the Scenes",
  },
  {
    id: "placeholder-3",
    title: "Artist Spotlight — Topman Meeko",
    thumbnail: "https://placehold.co/640x360/111111/5BC8F5?text=The+Drip+Room",
    publishedAt: "1 month ago",
    viewCount: "2.4K",
    category: "Interviews",
  },
];

export async function GET(req: NextRequest) {
  const limit = Number(req.nextUrl.searchParams.get("limit") ?? 12);
  const apiKey = process.env.YOUTUBE_API_KEY;
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE ?? "thedriproom6ix";

  if (!apiKey) {
    return NextResponse.json({ videos: PLACEHOLDER_VIDEOS.slice(0, limit), source: "placeholder" });
  }

  try {
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${handle}&key=${apiKey}`,
      { next: { revalidate: 3600 } },
    );
    const channelData = await channelRes.json();
    const uploadsPlaylistId =
      channelData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylistId) {
      return NextResponse.json({ videos: PLACEHOLDER_VIDEOS.slice(0, limit), source: "placeholder" });
    }

    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${limit}&playlistId=${uploadsPlaylistId}&key=${apiKey}`,
      { next: { revalidate: 3600 } },
    );
    const playlistData = await playlistRes.json();

    interface PlaylistItem {
      snippet: {
        resourceId: { videoId: string };
        title: string;
        thumbnails?: { high?: { url: string }; default?: { url: string } };
        publishedAt: string;
      };
    }

    const videos: YouTubeVideo[] = ((playlistData.items ?? []) as PlaylistItem[]).map((item) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnail:
        item.snippet.thumbnails?.high?.url ?? item.snippet.thumbnails?.default?.url ?? "",
      publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString("en-CA", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }));

    return NextResponse.json({ videos, source: "youtube" });
  } catch {
    return NextResponse.json({ videos: PLACEHOLDER_VIDEOS.slice(0, limit), source: "placeholder" });
  }
}
