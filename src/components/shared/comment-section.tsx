"use client";

import { useState } from "react";
import Link from "next/link";
import { Flag, Trash2, Pencil } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/lib/site-config";
import type { CommentRow, ContentType } from "@/lib/supabase/interactions";

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" });
}

function CommentRoleBadge({ role }: { role: CommentRow["authorRole"] }) {
  if (role === "member") return null;
  return (
    <span className="rounded-full bg-drip-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-drip-500">
      {role === "admin" ? "Admin" : "Staff"}
    </span>
  );
}

function SingleComment({
  comment,
  contentType,
  contentId,
  isLoggedIn,
  onReplyPosted,
  isReply = false,
}: {
  comment: CommentRow;
  contentType: ContentType;
  contentId: string;
  isLoggedIn: boolean;
  onReplyPosted: () => void;
  isReply?: boolean;
}) {
  const supabase = createClient();
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [replyBody, setReplyBody] = useState("");
  const [editBody, setEditBody] = useState(comment.body);
  const [deleted, setDeleted] = useState(false);
  const [busy, setBusy] = useState(false);

  if (deleted) return null;

  async function submitReply() {
    if (!supabase || !replyBody.trim()) return;
    setBusy(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setBusy(false);
      return;
    }
    await supabase.from("comments").insert({
      content_type: contentType,
      content_id: contentId,
      user_id: user.id,
      body: replyBody.trim(),
      parent_id: comment.id,
    });
    setBusy(false);
    setReplying(false);
    setReplyBody("");
    onReplyPosted();
  }

  async function saveEdit() {
    if (!supabase || !editBody.trim()) return;
    setBusy(true);
    await supabase.from("comments").update({ body: editBody.trim() }).eq("id", comment.id);
    setBusy(false);
    setEditing(false);
    onReplyPosted();
  }

  async function handleDelete() {
    if (!supabase) return;
    setBusy(true);
    const { error } = await supabase.from("comments").delete().eq("id", comment.id);
    setBusy(false);
    if (!error) setDeleted(true);
  }

  const reportHref = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
    "Comment report",
  )}&body=${encodeURIComponent(`Reporting comment ${comment.id} on ${contentType}:${contentId}`)}`;

  return (
    <div className={cn(isReply && "ml-8 border-l border-border pl-4")}>
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-white">{comment.authorName}</p>
        <CommentRoleBadge role={comment.authorRole} />
        <span className="text-xs text-text-secondary">{timeAgo(comment.createdAt)}</span>
        {comment.isMine && comment.status === "pending" && (
          <span className="text-xs text-gold-500">pending review</span>
        )}
      </div>

      {editing ? (
        <div className="mt-2 space-y-2">
          <Textarea value={editBody} onChange={(e) => setEditBody(e.target.value)} className="min-h-[80px]" />
          <div className="flex gap-2">
            <Button size="sm" onClick={saveEdit} disabled={busy}>
              Save
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <p className="mt-1.5 text-sm text-text-secondary">{comment.body}</p>
      )}

      <div className="mt-2 flex items-center gap-4 text-xs text-text-secondary">
        {!isReply && isLoggedIn && (
          <button onClick={() => setReplying((v) => !v)} className="hover:text-drip-500">
            Reply
          </button>
        )}
        {comment.isMine && !editing && (
          <>
            <button onClick={() => setEditing(true)} className="inline-flex items-center gap-1 hover:text-drip-500">
              <Pencil className="h-3 w-3" aria-hidden="true" />
              Edit
            </button>
            <button onClick={handleDelete} disabled={busy} className="inline-flex items-center gap-1 hover:text-red-400">
              <Trash2 className="h-3 w-3" aria-hidden="true" />
              Delete
            </button>
          </>
        )}
        {!comment.isMine && (
          <a href={reportHref} className="inline-flex items-center gap-1 hover:text-red-400">
            <Flag className="h-3 w-3" aria-hidden="true" />
            Report
          </a>
        )}
      </div>

      {replying && (
        <div className="mt-3 space-y-2">
          <Textarea
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
            placeholder={`Reply to ${comment.authorName}...`}
            className="min-h-[70px]"
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={submitReply} disabled={busy || !replyBody.trim()}>
              Post Reply
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setReplying(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <SingleComment
              key={reply.id}
              comment={reply}
              contentType={contentType}
              contentId={contentId}
              isLoggedIn={isLoggedIn}
              onReplyPosted={onReplyPosted}
              isReply
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function CommentSection({
  contentType,
  contentId,
  initialComments,
  isLoggedIn,
}: {
  contentType: ContentType;
  contentId: string;
  initialComments: CommentRow[];
  isLoggedIn: boolean;
}) {
  const supabase = createClient();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [busy, setBusy] = useState(false);

  async function refresh() {
    const res = await fetch(`/api/comments?contentType=${contentType}&contentId=${encodeURIComponent(contentId)}`);
    if (res.ok) {
      const data = await res.json();
      setComments(data.comments ?? []);
    }
  }

  async function submitComment() {
    if (!supabase || !newComment.trim()) return;
    setBusy(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setBusy(false);
      return;
    }
    await supabase.from("comments").insert({
      content_type: contentType,
      content_id: contentId,
      user_id: user.id,
      body: newComment.trim(),
    });
    setBusy(false);
    setNewComment("");
    refresh();
  }

  return (
    <div>
      <h3 className="font-display text-xl text-white">Comments</h3>

      <div className="mt-5 space-y-6">
        {comments.length === 0 && (
          <p className="text-sm text-text-secondary">Be the first to comment.</p>
        )}
        {comments.map((comment) => (
          <SingleComment
            key={comment.id}
            comment={comment}
            contentType={contentType}
            contentId={contentId}
            isLoggedIn={isLoggedIn}
            onReplyPosted={refresh}
          />
        ))}
      </div>

      <div className="mt-8 border-t border-border pt-6">
        {isLoggedIn ? (
          <div className="space-y-3">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <Button onClick={submitComment} disabled={busy || !newComment.trim()}>
              {busy ? "Posting..." : "Post Comment"}
            </Button>
            <p className="text-xs text-text-secondary">
              Comments are reviewed before appearing publicly.
            </p>
          </div>
        ) : (
          <p className="text-sm text-text-secondary">
            <Link href="/login" className="font-semibold text-drip-500 hover:underline">
              Sign in
            </Link>{" "}
            to comment.
          </p>
        )}
      </div>
    </div>
  );
}
