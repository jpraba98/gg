"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

export interface AuthUser {
  displayName: string | null;
  role: "member" | "staff" | "admin";
}

/** Client-side only — for UI state (nav, greetings). Never use this for access control. */
export function useAuthUser() {
  // Lazy-initialized once so the effect below doesn't depend on a value
  // that could otherwise get a fresh identity on every render.
  const [supabase] = useState(() => createClient());
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(!!supabase);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadProfile() {
      const {
        data: { user: authUser },
      } = await supabase!.auth.getUser();

      if (!authUser) {
        if (!cancelled) {
          setUser(null);
          setLoading(false);
        }
        return;
      }

      const { data: profile } = await supabase!
        .from("profiles")
        .select("display_name, role")
        .eq("id", authUser.id)
        .single();

      if (!cancelled) {
        setUser({
          displayName: profile?.display_name ?? null,
          role: (profile?.role as AuthUser["role"]) ?? "member",
        });
        setLoading(false);
      }
    }

    loadProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => loadProfile());

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [supabase]);

  return { user, loading, configured: !!supabase };
}
