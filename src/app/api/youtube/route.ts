import { NextRequest, NextResponse } from "next/server";

import type { YouTubeVideo } from "@/types/youtube";

export const revalidate = 3600;

// Shown until YOUTUBE_API_KEY is set (or if the API call fails): real videos
// from TheDripRoom6ix's credits, so the Media page is never empty or broken.
const yt = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const FALLBACK_VIDEOS: YouTubeVideo[] = [
  {
    id: "cApqBl8g1vY",
    title: "Stars Align — Industry Artist Showcase",
    thumbnail: yt("cApqBl8g1vY"),
    publishedAt: "",
    category: "Event Recaps",
  },
  {
    id: "oHRBXZze-J8",
    title: "Dope Boy DQ — Music Video",
    thumbnail: yt("oHRBXZze-J8"),
    publishedAt: "",
    category: "Music Videos",
  },
  {
    id: "olE63lyc-gk",
    title: "Buggz — Music Video (416 CustomKicks placement)",
    thumbnail: yt("olE63lyc-gk"),
    publishedAt: "",
    category: "Music Videos",
  },
  {
    id: "bHzFK4RsvDo",
    title: "YungPro — Artist Documentary Vlog",
    thumbnail: yt("bHzFK4RsvDo"),
    publishedAt: "",
    category: "Behind the Scenes",
  },
];

export async function GET(req: NextRequest) {
  const limit = Number(req.nextUrl.searchParams.get("limit") ?? 12);
  const apiKey = process.env.YOUTUBE_API_KEY;
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE ?? "thedriproom6ix";

  if (!apiKey) {
    return NextResponse.json({ videos: FALLBACK_VIDEOS.slice(0, limit), source: "fallback" });
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
      return NextResponse.json({ videos: FALLBACK_VIDEOS.slice(0, limit), source: "fallback" });
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

    if (videos.length === 0) {
      return NextResponse.json({ videos: FALLBACK_VIDEOS.slice(0, limit), source: "fallback" });
    }
    return NextResponse.json({ videos, source: "youtube" });
  } catch {
    return NextResponse.json({ videos: FALLBACK_VIDEOS.slice(0, limit), source: "fallback" });
  }
}
