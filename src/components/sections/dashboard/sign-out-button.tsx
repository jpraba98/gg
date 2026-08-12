"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton({ redirectTo = "/" }: { redirectTo?: string }) {
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push(redirectTo);
    router.refresh();
  }

  if (!supabase) return null;

  return (
    <Button variant="outline" size="sm" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
