import { NextRequest, NextResponse } from "next/server";

import { getLikeState, type ContentType } from "@/lib/supabase/interactions";

const VALID_TYPES: ContentType[] = ["blog", "media", "event"];

export async function GET(req: NextRequest) {
  const contentType = req.nextUrl.searchParams.get("contentType") as ContentType | null;
  const contentId = req.nextUrl.searchParams.get("contentId");

  if (!contentType || !contentId || !VALID_TYPES.includes(contentType)) {
    return NextResponse.json({ error: "Missing or invalid contentType/contentId" }, { status: 400 });
  }

  const state = await getLikeState(contentType, contentId);
  return NextResponse.json(state);
}
