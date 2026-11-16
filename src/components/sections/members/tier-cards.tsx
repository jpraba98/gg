"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Gem } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { membershipTiers, type MembershipTier } from "@/data/membership";
import { ETransferModal } from "@/components/sections/members/etransfer-modal";
import { BillingToggle, type Billing } from "@/components/sections/members/billing-toggle";
import { useCheckout } from "@/components/sections/members/use-checkout";

const PLAN_PREFIX: Record<string, string> = { "dr-member": "member", "top-tier": "top-tier" };

export function TierCards({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const [plan, setPlan] = useState<MembershipTier | null>(null);
  const [billing, setBilling] = useState<Billing>("monthly");
  const { subscribe, pending, error } = useCheckout();

  return (
    <>
      <div className="mb-8 flex justify-center">
        <BillingToggle value={billing} onChange={setBilling} />
      </div>
      {error && <p className="mb-6 text-center text-sm text-red-400">{error}</p>}
      <div className="grid gap-6 lg:grid-cols-3">
        {membershipTiers.map((tier, i) => (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card
              className={cn(
                "card-lift relative flex h-full flex-col p-8",
                tier.highlighted && "border-drip-500/60 shadow-glow-drip",
              )}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-drip-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-obsidian">
                  Most Popular
                </span>
              )}
              <Gem className="h-8 w-8 text-drip-500" aria-hidden="true" />
              <h3 className="mt-5 font-display text-2xl text-white">{tier.name}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-3xl text-white">
                  {billing === "yearly" ? tier.yearly : tier.monthly}
                </span>
                {tier.id !== "general" && billing === "yearly" && (
                  <span className="text-sm text-text-secondary">billed yearly</span>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-2.5">
                {tier.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2 text-sm text-text-secondary">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-drip-500" aria-hidden="true" />
                    {perk}
                  </li>
                ))}
              </ul>

              {tier.id === "general" && (
                <Button asChild className="mt-8 w-full" variant="outline">
                  <Link href="/signup">Create Free Account</Link>
                </Button>
              )}
              {tier.id !== "general" && (
                <div className="mt-8">
                  <Button
                    className="w-full"
                    variant={tier.highlighted ? "primary" : "outline"}
                    disabled={pending !== null}
                    onClick={() => subscribe(`${PLAN_PREFIX[tier.id]}-${billing}`)}
                  >
                    {pending === `${PLAN_PREFIX[tier.id]}-${billing}` ? "Redirecting..." : "Subscribe"}
                  </Button>
                  <button
                    onClick={() => setPlan(tier)}
                    className="mt-3 w-full text-center text-xs text-text-secondary hover:text-drip-500"
                  >
                    Rather pay once? <span className="underline">Use e-Transfer</span>
                  </button>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      <ETransferModal
        open={plan !== null}
        onOpenChange={(open) => !open && setPlan(null)}
        plan={plan ?? undefined}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}
