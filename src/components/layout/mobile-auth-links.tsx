"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Settings, ShieldCheck, LogOut } from "lucide-react";

import { useAuthUser } from "@/lib/use-auth-user";
import { createClient } from "@/lib/supabase/client";

const linkClass =
  "rounded-lg px-3 py-3 text-base font-medium uppercase tracking-wide text-text-secondary transition-colors hover:bg-white/5 hover:text-white flex items-center gap-2";

export function MobileAuthLinks() {
  const router = useRouter();
  const { user, loading, configured } = useAuthUser();
  const supabase = createClient();

  if (!configured || loading) return null;

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (!user) {
    return (
      <div className="mt-3 flex flex-col gap-1 border-t border-border pt-3">
        <Link href="/login" className={linkClass}>
          Sign In
        </Link>
        <Link href="/signup" className={linkClass}>
          Join Free
        </Link>
      </div>
    );
  }

  const isStaff = user.role === "staff" || user.role === "admin";

  return (
    <div className="mt-3 flex flex-col gap-1 border-t border-border pt-3">
      <Link href="/dashboard" className={linkClass}>
        <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
        Dashboard
      </Link>
      {isStaff && (
        <Link href="/staff" className={linkClass}>
          <ShieldCheck className="h-4 w-4" aria-hidden="true" />
          Staff Panel
        </Link>
      )}
      <Link href="/dashboard#settings" className={linkClass}>
        <Settings className="h-4 w-4" aria-hidden="true" />
        Settings
      </Link>
      <button onClick={handleSignOut} className={linkClass}>
        <LogOut className="h-4 w-4" aria-hidden="true" />
        Sign Out
      </button>
    </div>
  );
}
