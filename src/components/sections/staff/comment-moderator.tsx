"use client";

import { useEffect, useState } from "react";
import { Check, EyeOff, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";

const FILTERS = ["pending", "approved", "hidden", "all"] as const;

interface CommentRow {
  id: string;
  content_type: string;
  content_id: string;
  body: string;
  status: "pending" | "approved" | "hidden";
  created_at: string;
  profiles: { display_name: string | null } | null;
}

export function CommentModerator() {
  const supabase = createClient();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("pending");
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    if (!supabase) return;
    setLoading(true);
    let query = supabase
      .from("comments")
      .select("id, content_type, content_id, body, status, created_at, profiles(display_name)")
      .order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    setComments((data as unknown as CommentRow[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function setStatus(id: string, status: "approved" | "hidden") {
    if (!supabase) return;
    await supabase.from("comments").update({ status }).eq("id", id);
    load();
  }

  async function handleDelete(id: string) {
    if (!supabase) return;
    if (!window.confirm("Delete this comment?")) return;
    await supabase.from("comments").delete().eq("id", id);
    load();
  }

  if (!supabase) {
    return <p className="text-sm text-text-secondary">Supabase isn&apos;t configured.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl text-white">Comment Moderation</h3>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList>
            {FILTERS.map((f) => (
              <TabsTrigger key={f} value={f} className="capitalize">
                {f}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {loading && <p className="mt-4 text-sm text-text-secondary">Loading...</p>}
      {!loading && comments.length === 0 && (
        <p className="mt-4 text-sm text-text-secondary">Nothing here.</p>
      )}

      <Card className="mt-4 divide-y divide-border p-0">
        {comments.map((comment) => (
          <div key={comment.id} className="flex flex-col gap-2 px-6 py-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="font-semibold text-white">
                  {comment.profiles?.display_name ?? "Member"}
                </span>
                <span>·</span>
                <span>
                  {comment.content_type}:{comment.content_id}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${
                    comment.status === "approved"
                      ? "bg-drip-500/20 text-drip-500"
                      : comment.status === "hidden"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-gold-500/20 text-gold-500"
                  }`}
                >
                  {comment.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-white">{comment.body}</p>
            </div>
            <div className="flex shrink-0 gap-2">
              {comment.status !== "approved" && (
                <Button size="sm" variant="outline" onClick={() => setStatus(comment.id, "approved")}>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  Approve
                </Button>
              )}
              {comment.status !== "hidden" && (
                <Button size="sm" variant="outline" onClick={() => setStatus(comment.id, "hidden")}>
                  <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
                  Hide
                </Button>
              )}
              <Button size="sm" variant="ghost" onClick={() => handleDelete(comment.id)} aria-label="Delete comment">
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </Button>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
