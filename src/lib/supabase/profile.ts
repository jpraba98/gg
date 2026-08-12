import { createClient } from "@/lib/supabase/server";

export type AppRole = "member" | "staff" | "admin";
export type MembershipTier = "free" | "member" | "top_tier";

export interface CurrentProfile {
  id: string;
  email: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  role: AppRole;
  membershipTier: MembershipTier;
  notifyEmail: boolean;
  createdAt: string | null;
}

/** Returns null if Supabase isn't configured or no one is signed in. */
export async function getCurrentProfile(): Promise<CurrentProfile | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, avatar_url, role, membership_tier, notify_email, created_at")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email ?? null,
    displayName: profile?.display_name ?? null,
    avatarUrl: profile?.avatar_url ?? null,
    role: (profile?.role as AppRole) ?? "member",
    membershipTier: (profile?.membership_tier as MembershipTier) ?? "free",
    notifyEmail: profile?.notify_email ?? true,
    createdAt: profile?.created_at ?? null,
  };
}

export function isStaffOrAdmin(profile: CurrentProfile | null): boolean {
  return profile?.role === "staff" || profile?.role === "admin";
}

export function isAdmin(profile: CurrentProfile | null): boolean {
  return profile?.role === "admin";
}
