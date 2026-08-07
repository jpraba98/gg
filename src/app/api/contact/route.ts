import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { contactSchema } from "@/lib/schemas";
import { siteConfig } from "@/lib/site-config";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const subject =
    data.type === "booking"
      ? `New Booking Inquiry — ${data.serviceInterest}`
      : `New Sponsor Inquiry — ${data.companyName}`;

  const lines =
    data.type === "booking"
      ? [
          `Name: ${data.fullName}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone}`,
          `Service: ${data.serviceInterest}`,
          `Budget: ${data.budgetRange}`,
          `Message: ${data.message}`,
        ]
      : [
          `Company: ${data.companyName}`,
          `Contact: ${data.contactName}`,
          `Email: ${data.email}`,
          `Phone: ${data.phone}`,
          `Event: ${data.eventInterest}`,
          `Package: ${data.packageInterest}`,
          `Message: ${data.message}`,
        ];

  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "The Drip Room <onboarding@resend.dev>",
        to: siteConfig.contactEmail,
        replyTo: data.email,
        subject,
        text: lines.join("\n"),
      });
    } catch (error) {
      console.error("Failed to send email via Resend:", error);
      return NextResponse.json({ error: "Failed to send notification email" }, { status: 502 });
    }
  } else {
    console.log("RESEND_API_KEY not set — logging submission instead:\n", subject, "\n", lines.join("\n"));
  }

  return NextResponse.json({ ok: true });
}
