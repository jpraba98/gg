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

/**
 * Delete a comment. Runs server-side with the member's session cookie (more
 * reliable than the browser client) and reports whether a row was actually
 * removed. Row Level Security still limits this to the author or staff.
 */
export async function DELETE(req: NextRequest) {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = createClient();
  if (!supabase) return NextResponse.json({ error: "Not available" }, { status: 503 });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Please log in again." }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing comment id" }, { status: 400 });

  const { data, error } = await supabase.from("comments").delete().eq("id", id).select("id");
  if (error) {
    console.error("Comment delete failed:", error.message);
    return NextResponse.json({ error: "Couldn't delete the comment. Try again." }, { status: 500 });
  }
  if (!data || data.length === 0) {
    return NextResponse.json({ error: "You can only delete your own comments." }, { status: 403 });
  }
  return NextResponse.json({ deleted: true });
}
