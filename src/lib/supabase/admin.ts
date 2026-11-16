import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Server-only, elevated client that bypasses Row Level Security. Used by the
 * Stripe webhook to set membership tiers. Never import this into client code.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
