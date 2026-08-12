import { NextRequest, NextResponse } from "next/server";

import { applicationSchema } from "@/lib/schemas";
import { sendNotificationEmail } from "@/lib/notify";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const supabase = createClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Accounts aren't configured yet — set up Supabase to accept applications." },
      { status: 503 },
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in to apply." }, { status: 401 });
  }

  const { error: insertError } = await supabase.from("applications").insert({
    user_id: user.id,
    full_name: data.fullName,
    email: data.email,
    instagram: data.instagram || null,
    role: data.role,
    why_join: data.whyJoin,
    portfolio_url: data.portfolioUrl || null,
    why_create: data.whyCreate,
    who_for: data.whoFor,
    one_thing: data.oneThing,
  });

  if (insertError) {
    console.error("Failed to insert application:", insertError);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 502 });
  }

  await sendNotificationEmail({
    subject: `New Team Application — ${data.role}`,
    lines: [
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Instagram: ${data.instagram || "—"}`,
      `Role: ${data.role}`,
      `Portfolio: ${data.portfolioUrl || "—"}`,
      `Why they want to join: ${data.whyJoin}`,
      `Why they create: ${data.whyCreate}`,
      `Who they create for: ${data.whoFor}`,
      `One thing they'd create: ${data.oneThing}`,
    ],
    replyTo: data.email,
  });

  return NextResponse.json({ ok: true });
}
