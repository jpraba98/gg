import { redirect } from "next/navigation";

import { getCurrentProfile, isStaffOrAdmin, type CurrentProfile } from "@/lib/supabase/profile";

/**
 * Server-side only. Never trust a client-side auth check for protected
 * routes — call this at the top of the page/layout server component.
 */
export async function requireMember(redirectTo = "/login"): Promise<CurrentProfile> {
  const profile = await getCurrentProfile();
  if (!profile) redirect(redirectTo);
  return profile;
}

/** Server-side only — verifies profiles.role, not just session presence. */
export async function requireStaff(redirectTo = "/staff/login"): Promise<CurrentProfile> {
  const profile = await getCurrentProfile();
  if (!profile || !isStaffOrAdmin(profile)) redirect(redirectTo);
  return profile;
}
