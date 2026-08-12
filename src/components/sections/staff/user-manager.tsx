"use client";

import { useEffect, useState } from "react";

import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";

const ROLES = ["member", "staff", "admin"] as const;

interface ProfileRow {
  id: string;
  display_name: string | null;
  role: (typeof ROLES)[number];
  membership_tier: string;
  created_at: string;
}

export function UserManager({ currentUserId }: { currentUserId: string }) {
  const supabase = createClient();
  const [profiles, setProfiles] = useState<ProfileRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase
      .from("profiles")
      .select("id, display_name, role, membership_tier, created_at")
      .order("created_at", { ascending: false });
    setProfiles((data as ProfileRow[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function changeRole(id: string, role: (typeof ROLES)[number]) {
    if (!supabase) return;
    setError(null);
    const { error: updateError } = await supabase.from("profiles").update({ role }).eq("id", id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    load();
  }

  if (!supabase) {
    return <p className="text-sm text-text-secondary">Supabase isn&apos;t configured.</p>;
  }

  return (
    <div>
      <h3 className="font-display text-xl text-white">User Manager</h3>
      <p className="mt-1 text-sm text-text-secondary">
        Assign or revoke staff/admin access. Only admins can see this tab.
      </p>

      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      {loading && <p className="mt-4 text-sm text-text-secondary">Loading...</p>}

      <Card className="mt-4 divide-y divide-border p-0">
        {profiles.map((profile) => (
          <div key={profile.id} className="flex items-center justify-between gap-3 px-6 py-4">
            <div className="min-w-0">
              <p className="truncate font-medium text-white">{profile.display_name ?? "Member"}</p>
              <p className="text-xs text-text-secondary">{profile.membership_tier}</p>
            </div>
            <Select
              value={profile.role}
              onValueChange={(v) => changeRole(profile.id, v as (typeof ROLES)[number])}
              disabled={profile.id === currentUserId}
            >
              <SelectTrigger className="w-36 shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROLES.map((r) => (
                  <SelectItem key={r} value={r} className="capitalize">
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </Card>
    </div>
  );
}
