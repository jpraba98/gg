import Link from "next/link";
import { Gem, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UpgradeCta } from "@/components/sections/dashboard/upgrade-cta";
import type { CurrentProfile } from "@/lib/supabase/profile";
import type { ApplicationStatusItem } from "@/lib/supabase/dashboard-data";

const tierLabel: Record<string, string> = {
  free: "Free Member",
  member: "TheDripRoom6ix Member",
  top_tier: "Top Tier",
};

export function LoggedInPanel({
  profile,
  applications,
}: {
  profile: CurrentProfile;
  applications: ApplicationStatusItem[];
}) {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">Your Membership</p>
          <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            {profile.displayName ? `Welcome back, ${profile.displayName}` : "Welcome back"}
          </h1>
        </div>

        <div className="mx-auto mt-10 max-w-2xl space-y-6">
          <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Gem className="h-6 w-6 text-drip-500" aria-hidden="true" />
              <div>
                <p className="text-xs uppercase tracking-wide text-text-secondary">
                  Current Tier
                </p>
                <p className="font-display text-xl text-white">
                  {tierLabel[profile.membershipTier] ?? "Free Member"}
                </p>
              </div>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </Card>

          <UpgradeCta tier={profile.membershipTier} />

          {applications.length > 0 && (
            <Card className="p-6">
              <p className="text-xs uppercase tracking-wide text-text-secondary">
                Application Status
              </p>
              <p className="mt-1 font-display text-xl capitalize text-white">
                {applications[0].role} — {applications[0].status}
              </p>
            </Card>
          )}
        </div>
      </Container>
    </section>
  );
}
