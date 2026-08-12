import { createClient } from "@/lib/supabase/server";

export type ContentType = "blog" | "media" | "event";

export interface CommentRow {
  id: string;
  body: string;
  status: "pending" | "approved" | "hidden";
  createdAt: string;
  parentId: string | null;
  userId: string;
  authorName: string;
  authorRole: "member" | "staff" | "admin";
  isMine: boolean;
  replies: CommentRow[];
}

/** Like count + whether the current viewer has liked it. Safe if Supabase/tables aren't set up. */
export async function getLikeState(contentType: ContentType, contentId: string) {
  const supabase = createClient();
  if (!supabase) return { count: 0, likedByMe: false, currentUserId: null as string | null };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { count } = await supabase
    .from("likes")
    .select("id", { count: "exact", head: true })
    .eq("content_type", contentType)
    .eq("content_id", contentId);

  let likedByMe = false;
  if (user) {
    const { data } = await supabase
      .from("likes")
      .select("id")
      .eq("content_type", contentType)
      .eq("content_id", contentId)
      .eq("user_id", user.id)
      .maybeSingle();
    likedByMe = !!data;
  }

  return { count: count ?? 0, likedByMe, currentUserId: user?.id ?? null };
}

/** Approved comments for everyone, plus the viewer's own pending/hidden ones, threaded one level deep. */
export async function getComments(contentType: ContentType, contentId: string): Promise<{
  comments: CommentRow[];
  currentUserId: string | null;
}> {
  const supabase = createClient();
  if (!supabase) return { comments: [], currentUserId: null };

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("comments")
    .select("id, body, status, created_at, parent_id, user_id, profiles(display_name, role)")
    .eq("content_type", contentType)
    .eq("content_id", contentId)
    .order("created_at", { ascending: true });

  const rows = (data ?? []) as unknown as Array<{
    id: string;
    body: string;
    status: "pending" | "approved" | "hidden";
    created_at: string;
    parent_id: string | null;
    user_id: string;
    profiles: { display_name: string | null; role: "member" | "staff" | "admin" } | null;
  }>;

  const toCommentRow = (row: (typeof rows)[number]): CommentRow => ({
    id: row.id,
    body: row.body,
    status: row.status,
    createdAt: row.created_at,
    parentId: row.parent_id,
    userId: row.user_id,
    authorName: row.profiles?.display_name ?? "Member",
    authorRole: row.profiles?.role ?? "member",
    isMine: row.user_id === user?.id,
    replies: [],
  });

  const topLevel = rows.filter((r) => !r.parent_id).map(toCommentRow);
  const replies = rows.filter((r) => r.parent_id).map(toCommentRow);

  for (const reply of replies) {
    const parent = topLevel.find((c) => c.id === reply.parentId);
    if (parent) parent.replies.push(reply);
  }

  return { comments: topLevel, currentUserId: user?.id ?? null };
}
