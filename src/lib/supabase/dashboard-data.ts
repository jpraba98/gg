import { createClient } from "@/lib/supabase/server";
import { blogPosts } from "@/data/blog";
import { upcomingEvents } from "@/data/events";

export interface LikedItem {
  contentType: string;
  contentId: string;
  title: string;
  href: string;
  likedAt: string;
}

export interface CommentHistoryItem {
  id: string;
  contentType: string;
  contentId: string;
  body: string;
  status: string;
  createdAt: string;
  title: string;
  href: string;
}

export interface ApplicationStatusItem {
  id: string;
  role: string;
  status: string;
  createdAt: string;
}

function resolveContent(contentType: string, contentId: string) {
  if (contentType === "blog") {
    const post = blogPosts.find((p) => p.slug === contentId);
    return { title: post?.title ?? "Blog article", href: `/blog/${contentId}` };
  }
  if (contentType === "event") {
    const event = upcomingEvents.find((e) => e.slug === contentId);
    return { title: event?.name ?? "Event", href: `/events/${contentId}` };
  }
  return { title: "Media item", href: "/media" };
}

/** Best-effort — returns empty arrays if tables don't exist yet or query fails. */
export async function getMemberActivity(userId: string) {
  const supabase = createClient();
  if (!supabase) {
    return { likes: [] as LikedItem[], comments: [] as CommentHistoryItem[], applications: [] as ApplicationStatusItem[] };
  }

  const [likesRes, commentsRes, applicationsRes] = await Promise.all([
    supabase
      .from("likes")
      .select("content_type, content_id, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("comments")
      .select("id, content_type, content_id, body, status, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("applications")
      .select("id, role, status, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false }),
  ]);

  const likes: LikedItem[] = (likesRes.data ?? []).map((row) => {
    const resolved = resolveContent(row.content_type, row.content_id);
    return {
      contentType: row.content_type,
      contentId: row.content_id,
      title: resolved.title,
      href: resolved.href,
      likedAt: row.created_at,
    };
  });

  const comments: CommentHistoryItem[] = (commentsRes.data ?? []).map((row) => {
    const resolved = resolveContent(row.content_type, row.content_id);
    return {
      id: row.id,
      contentType: row.content_type,
      contentId: row.content_id,
      body: row.body,
      status: row.status,
      createdAt: row.created_at,
      title: resolved.title,
      href: resolved.href,
    };
  });

  const applications: ApplicationStatusItem[] = (applicationsRes.data ?? []).map((row) => ({
    id: row.id,
    role: row.role,
    status: row.status,
    createdAt: row.created_at,
  }));

  return { likes, comments, applications };
}
