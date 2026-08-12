import { NextRequest, NextResponse } from "next/server";

import { contactSchema } from "@/lib/schemas";
import { sendNotificationEmail } from "@/lib/notify";

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
  const subject = `New Booking Inquiry — ${data.serviceInterest}`;
  const lines = [
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Service: ${data.serviceInterest}`,
    `Budget: ${data.budgetRange}`,
    `Message: ${data.message}`,
  ];

  const result = await sendNotificationEmail({ subject, lines, replyTo: data.email });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
