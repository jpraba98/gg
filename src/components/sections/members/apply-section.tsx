import Link from "next/link";

import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ApplyForm } from "@/components/sections/members/apply-form";

const roles = [
  { role: "Writer / Blogger", description: "Write articles, event recaps, artist features for the blog" },
  { role: "Content Moderator", description: "Review and moderate community comments and interactions" },
  { role: "Media Curator", description: "Source and upload media content to the platform" },
  { role: "Event Correspondent", description: "Cover TheDripRoom6ix events and submit recap content" },
  { role: "Social Media Contributor", description: "Help manage and curate content for @thedriproom6ix" },
];

export function ApplySection({
  isLoggedIn,
  prefillEmail,
}: {
  isLoggedIn: boolean;
  prefillEmail?: string;
}) {
  return (
    <section className="border-t border-border py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">Join The Team</p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">Join the Team</h2>
          <p className="mt-4 text-text-secondary">
            We&apos;re always looking for hungry creatives to contribute to TheDripRoom6ix. Apply
            below and tell us what you bring to the table.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
          {roles.map((r) => (
            <Card key={r.role} className="p-5">
              <p className="font-semibold text-white">{r.role}</p>
              <p className="mt-1 text-sm text-text-secondary">{r.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-10">
          {isLoggedIn ? (
            <ApplyForm prefillEmail={prefillEmail} />
          ) : (
            <Card className="mx-auto max-w-xl p-8 text-center">
              <p className="text-text-secondary">Create a free account to apply.</p>
              <Button asChild className="mt-4">
                <Link href="/signup">Create Free Account</Link>
              </Button>
            </Card>
          )}
        </div>
      </Container>
    </section>
  );
}
