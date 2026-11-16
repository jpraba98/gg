import { Resend } from "resend";

import { siteConfig } from "@/lib/site-config";

export async function sendNotificationEmail({
  subject,
  lines,
  replyTo,
}: {
  subject: string;
  lines: string[];
  replyTo?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.CONTACT_EMAIL ?? siteConfig.contactEmail;

  if (!apiKey) {
    console.log("RESEND_API_KEY not set — logging submission instead:\n", subject, "\n", lines.join("\n"));
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "TheDripRoom6ix <onboarding@resend.dev>",
      to: notifyEmail,
      replyTo,
      subject,
      text: lines.join("\n"),
    });
    // The Resend SDK reports rejections (bad key, unverified recipient, etc.)
    // in the return value rather than throwing — surface them so the visitor
    // sees an error instead of a false "sent".
    if (error) {
      console.error("Resend rejected the email:", error);
      return { ok: false, error: "Failed to send notification email" };
    }
    return { ok: true };
  } catch (error) {
    console.error("Failed to send email via Resend:", error);
    return { ok: false, error: "Failed to send notification email" };
  }
}
