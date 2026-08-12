"use client";

import { useEffect, useState } from "react";

import { LikeButton } from "@/components/shared/like-button";
import { CommentSection } from "@/components/shared/comment-section";
import type { CommentRow, ContentType } from "@/lib/supabase/interactions";

export function ContentInteractions({
  contentType,
  contentId,
}: {
  contentType: ContentType;
  contentId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [likeState, setLikeState] = useState({ count: 0, likedByMe: false, currentUserId: null as string | null });
  const [comments, setComments] = useState<CommentRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    Promise.all([
      fetch(`/api/likes?contentType=${contentType}&contentId=${encodeURIComponent(contentId)}`).then((r) => r.json()),
      fetch(`/api/comments?contentType=${contentType}&contentId=${encodeURIComponent(contentId)}`).then((r) => r.json()),
    ]).then(([likes, commentsRes]) => {
      if (cancelled) return;
      setLikeState(likes);
      setComments(commentsRes.comments ?? []);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [contentType, contentId]);

  if (loading) {
    return <p className="text-sm text-text-secondary">Loading comments...</p>;
  }

  return (
    <div>
      <LikeButton
        contentType={contentType}
        contentId={contentId}
        initialCount={likeState.count}
        initialLiked={likeState.likedByMe}
        isLoggedIn={!!likeState.currentUserId}
        className="mb-6"
      />
      <CommentSection
        contentType={contentType}
        contentId={contentId}
        initialComments={comments}
        isLoggedIn={!!likeState.currentUserId}
      />
    </div>
  );
}
