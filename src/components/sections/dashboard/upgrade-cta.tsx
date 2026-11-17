"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ETransferModal } from "@/components/sections/members/etransfer-modal";
import { BillingToggle, type Billing } from "@/components/sections/members/billing-toggle";
import { useCheckout } from "@/components/sections/members/use-checkout";
import { membershipTiers } from "@/data/membership";
import type { MembershipTier } from "@/lib/supabase/profile";

const member = membershipTiers.find((t) => t.id === "dr-member")!;
const topTier = membershipTiers.find((t) => t.id === "top-tier")!;

/**
 * Membership card on the dashboard / logged-in members page.
 * Card subscriptions go through Stripe; e-Transfer is a one-time option that
 * an admin activates from the staff panel.
 */
export function UpgradeCta({
  tier,
  displayName,
  cancelsAt,
}: {
  tier: MembershipTier;
  displayName?: string | null;
  /** ISO date when a cancelled card subscription stops; shown as a notice. */
  cancelsAt?: string | null;
}) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [etransferOpen, setEtransferOpen] = useState(false);
  const { subscribe, manageBilling, pending, error } = useCheckout();

  const price = (t: typeof member) => (billing === "yearly" ? t.yearly : t.monthly);

  return (
    <>
      <Card className="border-drip-500/40 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-drip-500">
              {tier === "free" ? "Free Member" : tier === "member" ? "TheDripRoom6ix Member" : "Top Tier"}
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              {tier === "free"
                ? "Upgrade for service discounts, early event access, and exclusive drops."
                : tier === "member"
                  ? "Go Top Tier for priority booking and VIP event access."
                  : "You're on the top tier. Thanks for riding with us."}
            </p>
          </div>
          {tier !== "free" && (
            <Button
              size="sm"
              variant="outline"
              className="shrink-0"
              disabled={pending !== null}
              onClick={manageBilling}
            >
              {pending === "portal" ? "Opening..." : "Manage Billing"}
            </Button>
          )}
        </div>

        {cancelsAt && tier !== "free" && (
          <p className="mt-4 rounded-lg border border-gold-500/40 bg-gold-500/10 px-4 py-3 text-sm text-gold-400">
            Your subscription is cancelled. You keep your perks until{" "}
            {new Date(cancelsAt).toLocaleDateString("en-CA", {
              timeZone: "America/Toronto",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
            . Changed your mind? Use Manage Billing to renew.
          </p>
        )}

        {tier !== "top_tier" && (
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BillingToggle value={billing} onChange={setBilling} />
            <div className="flex flex-wrap gap-2">
              {tier === "free" && (
                <Button
                  size="sm"
                  disabled={pending !== null}
                  onClick={() => subscribe(`member-${billing}`)}
                >
                  {pending === `member-${billing}` ? "Redirecting..." : `Member · ${price(member)}`}
                </Button>
              )}
              <Button
                size="sm"
                variant={tier === "free" ? "outline" : "primary"}
                disabled={pending !== null}
                onClick={() => subscribe(`top-tier-${billing}`)}
              >
                {pending === `top-tier-${billing}` ? "Redirecting..." : `Top Tier · ${price(topTier)}`}
              </Button>
            </div>
          </div>
        )}

        {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

        {tier !== "top_tier" && (
          <button
            onClick={() => setEtransferOpen(true)}
            className="mt-4 text-xs text-text-secondary hover:text-drip-500"
          >
            Rather pay once? <span className="underline">Use e-Transfer</span>
          </button>
        )}
      </Card>
      <ETransferModal
        open={etransferOpen}
        onOpenChange={setEtransferOpen}
        displayName={displayName}
        isLoggedIn
      />
    </>
  );
}
