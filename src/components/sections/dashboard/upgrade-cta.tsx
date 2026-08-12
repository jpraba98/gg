"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ETransferModal } from "@/components/sections/members/etransfer-modal";
import type { MembershipTier } from "@/lib/supabase/profile";

export function UpgradeCta({ tier }: { tier: MembershipTier }) {
  const [etransferOpen, setEtransferOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (tier === "top_tier") return null;

  async function handleStripeCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "dr-member-monthly" }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout unavailable");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout unavailable right now.");
    } finally {
      setLoading(false);
    }
  }

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
          {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
        </div>
        <div className="flex shrink-0 gap-2">
          {tier === "free" && (
            <Button size="sm" onClick={handleStripeCheckout} disabled={loading}>
              {loading ? "Redirecting..." : "Upgrade to Member"}
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={() => setEtransferOpen(true)}>
            Upgrade to Top Tier
          </Button>
        </div>
      </Card>
      <ETransferModal open={etransferOpen} onOpenChange={setEtransferOpen} />
    </>
  );
}
