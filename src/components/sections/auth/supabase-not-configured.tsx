export function SupabaseNotConfigured() {
  return (
    <p className="rounded-lg border border-border bg-card p-4 text-sm text-text-secondary">
      Accounts aren&apos;t connected yet — set{" "}
      <code className="text-drip-500">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
      <code className="text-drip-500">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable sign up and
      login. See <code className="text-drip-500">supabase/README.md</code> for setup steps.
    </p>
  );
}
