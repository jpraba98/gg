"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ETransferModal } from "@/components/sections/members/etransfer-modal";
import { membershipTiers, type MembershipTier as TierInfo } from "@/data/membership";
import type { MembershipTier } from "@/lib/supabase/profile";

const memberPlan = membershipTiers.find((t) => t.id === "dr-member")!;
const topTierPlan = membershipTiers.find((t) => t.id === "top-tier")!;

// Paid tiers are paid by Interac e-Transfer; an admin then sets the member's
// tier from the staff panel's Users tab.
export function UpgradeCta({
  tier,
  displayName,
}: {
  tier: MembershipTier;
  displayName?: string | null;
}) {
  const [plan, setPlan] = useState<TierInfo | null>(null);

  if (tier === "top_tier") return null;

  return (
    <>
      <Card className="flex flex-col gap-4 border-drip-500/40 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-drip-500">
            {tier === "free" ? "Free Member" : "TheDripRoom6ix Member"}
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            {tier === "free"
              ? "Upgrade for service discounts, early event access, and exclusive drops."
              : "Upgrade to Top Tier for priority booking and VIP event access."}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          {tier === "free" && (
            <Button size="sm" onClick={() => setPlan(memberPlan)}>
              Upgrade to Member
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={() => setPlan(topTierPlan)}>
            Upgrade to Top Tier
          </Button>
        </div>
      </Card>
      <ETransferModal
        open={plan !== null}
        onOpenChange={(open) => !open && setPlan(null)}
        plan={plan ?? undefined}
        displayName={displayName}
        isLoggedIn
      />
    </>
  );
}
