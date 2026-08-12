"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { ContentType } from "@/lib/supabase/interactions";

export function LikeButton({
  contentType,
  contentId,
  initialCount,
  initialLiked,
  isLoggedIn,
  className,
}: {
  contentType: ContentType;
  contentId: string;
  initialCount: number;
  initialLiked: boolean;
  isLoggedIn: boolean;
  className?: string;
}) {
  const supabase = createClient();
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [busy, setBusy] = useState(false);

  if (!isLoggedIn || !supabase) {
    return (
      <Link
        href="/login"
        className={cn(
          "inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-drip-500",
          className,
        )}
      >
        <Heart className="h-4 w-4" aria-hidden="true" />
        {count}
      </Link>
    );
  }

  async function toggle() {
    if (busy) return;
    setBusy(true);
    const nextLiked = !liked;
    // Optimistic UI — flip immediately, roll back if the write fails.
    setLiked(nextLiked);
    setCount((c) => c + (nextLiked ? 1 : -1));

    const {
      data: { user },
    } = await supabase!.auth.getUser();
    if (!user) {
      setBusy(false);
      return;
    }

    const result = nextLiked
      ? await supabase!.from("likes").insert({
          content_type: contentType,
          content_id: contentId,
          user_id: user.id,
        })
      : await supabase!
          .from("likes")
          .delete()
          .eq("content_type", contentType)
          .eq("content_id", contentId)
          .eq("user_id", user.id);

    if (result.error) {
      setLiked(!nextLiked);
      setCount((c) => c + (nextLiked ? -1 : 1));
    }
    setBusy(false);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={liked}
      className={cn(
        "inline-flex items-center gap-1.5 text-sm transition-colors",
        liked ? "text-drip-500" : "text-text-secondary hover:text-drip-500",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4", liked && "fill-current")} aria-hidden="true" />
      {count}
    </button>
  );
}
