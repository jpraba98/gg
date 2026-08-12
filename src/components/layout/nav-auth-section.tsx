"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Settings, ShieldCheck, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuthUser } from "@/lib/use-auth-user";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function NavAuthSection({ accent }: { accent: "gold" | "drip" }) {
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
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-sm font-medium uppercase tracking-wide text-text-secondary transition-colors hover:text-white"
        >
          Sign In
        </Link>
        <Button asChild variant={accent === "gold" ? "gold" : "primary"} size="sm">
          <Link href="/signup">Join Free</Link>
        </Button>
      </div>
    );
  }

  const isStaff = user.role === "staff" || user.role === "admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "grid h-10 w-10 place-items-center rounded-full border border-border text-text-secondary transition-colors hover:text-white",
            accent === "gold" ? "hover:border-gold-500" : "hover:border-drip-500",
          )}
          aria-label="Account menu"
        >
          <User className="h-4 w-4" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user.displayName && (
          <>
            <p className="truncate px-3 py-1.5 text-xs text-text-secondary">{user.displayName}</p>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" aria-hidden="true" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        {isStaff && (
          <DropdownMenuItem asChild>
            <Link href="/staff">
              <ShieldCheck className="mr-2 h-4 w-4" aria-hidden="true" />
              Staff Panel
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href="/dashboard#settings">
            <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
