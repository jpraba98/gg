import { NextRequest, NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

// Handles the redirect back from Google OAuth (and email confirmation
// links), exchanging the auth code for a session cookie.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const rawNext = searchParams.get("next") ?? "/dashboard";
  // Only allow same-site paths, never an external redirect.
  const next = rawNext.startsWith("/") && !rawNext.startsWith("//") ? rawNext : "/dashboard";

  if (code) {
    const supabase = createClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        console.error("Auth callback code exchange failed:", error.message);
        const target = next === "/reset-password" ? "/reset-password?expired=1" : "/login?error=link";
        return NextResponse.redirect(`${origin}${target}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
