"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/client";

const FILTERS = ["pending", "reviewed", "accepted", "rejected", "all"] as const;

interface ApplicationRow {
  id: string;
  full_name: string;
  email: string;
  instagram: string | null;
  role: string;
  why_join: string;
  portfolio_url: string | null;
  why_create: string | null;
  who_for: string | null;
  one_thing: string | null;
  status: (typeof FILTERS)[number];
  created_at: string;
}

export function ApplicationViewer() {
  const supabase = createClient();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("pending");
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function load() {
    if (!supabase) return;
    setLoading(true);
    let query = supabase.from("applications").select("*").order("created_at", { ascending: false });
    if (filter !== "all") query = query.eq("status", filter);
    const { data } = await query;
    setApplications((data as ApplicationRow[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  async function setStatus(id: string, status: "reviewed" | "accepted" | "rejected") {
    if (!supabase) return;
    await supabase.from("applications").update({ status }).eq("id", id);
    load();
  }

  if (!supabase) {
    return <p className="text-sm text-text-secondary">Supabase isn&apos;t configured.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-xl text-white">Applications</h3>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
          <TabsList className="flex-wrap">
            {FILTERS.map((f) => (
              <TabsTrigger key={f} value={f} className="capitalize">
                {f}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {loading && <p className="mt-4 text-sm text-text-secondary">Loading...</p>}
      {!loading && applications.length === 0 && (
        <p className="mt-4 text-sm text-text-secondary">No applications here.</p>
      )}

      <Card className="mt-4 divide-y divide-border p-0">
        {applications.map((app) => (
          <div key={app.id} className="px-6 py-4">
            <button
              className="flex w-full flex-col gap-1 text-left sm:flex-row sm:items-center sm:justify-between"
              onClick={() => setExpanded(expanded === app.id ? null : app.id)}
            >
              <div>
                <p className="font-medium text-white">
                  {app.full_name} <span className="text-text-secondary">— {app.role}</span>
                </p>
                <p className="text-xs text-text-secondary">{app.email}</p>
              </div>
              <span className="w-fit rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-text-secondary">
                {app.status}
              </span>
            </button>

            {expanded === app.id && (
              <div className="mt-3 space-y-2 text-sm text-text-secondary">
                {app.instagram && <p>Instagram: {app.instagram}</p>}
                {app.portfolio_url && (
                  <p>
                    Portfolio:{" "}
                    <a href={app.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-drip-500 hover:underline">
                      {app.portfolio_url}
                    </a>
                  </p>
                )}
                <p>
                  <span className="text-white">Why join:</span> {app.why_join}
                </p>
                {app.why_create && (
                  <p>
                    <span className="text-white">Why they create:</span> {app.why_create}
                  </p>
                )}
                {app.who_for && (
                  <p>
                    <span className="text-white">Who for:</span> {app.who_for}
                  </p>
                )}
                {app.one_thing && (
                  <p>
                    <span className="text-white">One thing:</span> {app.one_thing}
                  </p>
                )}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => setStatus(app.id, "reviewed")}>
                    Mark Reviewed
                  </Button>
                  <Button size="sm" onClick={() => setStatus(app.id, "accepted")}>
                    Accept
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setStatus(app.id, "rejected")}>
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </Card>
    </div>
  );
}
