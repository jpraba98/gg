import { NextRequest, NextResponse } from "next/server";

import { getComments, type ContentType } from "@/lib/supabase/interactions";

const VALID_TYPES: ContentType[] = ["blog", "media", "event"];

export async function GET(req: NextRequest) {
  const contentType = req.nextUrl.searchParams.get("contentType") as ContentType | null;
  const contentId = req.nextUrl.searchParams.get("contentId");

  if (!contentType || !contentId || !VALID_TYPES.includes(contentType)) {
    return NextResponse.json({ error: "Missing or invalid contentType/contentId" }, { status: 400 });
  }

  const { comments } = await getComments(contentType, contentId);
  return NextResponse.json({ comments });
}
