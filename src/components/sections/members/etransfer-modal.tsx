"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Copy } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { membershipTiers } from "@/data/membership";

const paidTiers = membershipTiers.filter((t) => t.id !== "general");

export interface ETransferPlan {
  name: string;
  monthly: string;
  yearly: string;
}

export function ETransferModal({
  open,
  onOpenChange,
  plan,
  displayName,
  isLoggedIn,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan?: ETransferPlan;
  /** The member's display name, to put in the memo so staff can match the payment. */
  displayName?: string | null;
  isLoggedIn: boolean;
}) {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText(siteConfig.eTransferEmail).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{plan ? `${plan.name}: Pay Once` : "Pay Once by E-Transfer"}</DialogTitle>
          <DialogDescription>
            A one-time Interac e-Transfer, no auto-renew.{" "}
            {plan ? (
              <>
                <span className="font-semibold text-white">{plan.monthly.replace("/month", "")}</span>{" "}
                covers one month,{" "}
                <span className="font-semibold text-white">{plan.yearly.replace("/year", "")}</span>{" "}
                covers a full year.
              </>
            ) : (
              paidTiers
                .map((t) => `${t.name}: ${t.monthly.replace("/month", "")} a month or ${t.yearly.replace("/year", "")} a year`)
                .join(" · ")
            )}{" "}
            Want it to renew automatically? Subscribe by card instead.
          </DialogDescription>
        </DialogHeader>

        {!isLoggedIn ? (
          <div className="space-y-4">
            <p className="text-sm text-text-secondary">
              Step 1 is a free account, so we have somewhere to put your perks. Create one, then
              come back here to pay.
            </p>
            <Button asChild className="w-full">
              <Link href="/signup">Create Free Account</Link>
            </Button>
            <p className="text-center text-xs text-text-secondary">
              Already have one?{" "}
              <Link href="/login?next=/members" className="text-drip-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        ) : (
          <>
            <ol className="space-y-3 text-sm text-text-secondary">
              <li>
                <span className="font-semibold text-white">1.</span> Send your e-Transfer to:
              </li>
            </ol>
            <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
              <span className="text-sm font-medium text-white">{siteConfig.eTransferEmail}</span>
              <button
                onClick={copyEmail}
                className="text-text-secondary hover:text-drip-500"
                aria-label="Copy email"
              >
                {copied ? <Check className="h-4 w-4 text-drip-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <ol className="space-y-3 text-sm text-text-secondary">
              <li>
                <span className="font-semibold text-white">2.</span> In the message/memo, write:
                <span className="mt-1 block rounded-md border border-border bg-card px-3 py-2 font-mono text-xs text-white">
                  {(displayName || "Your display name") +
                    ` — ${plan ? plan.name : "tier"} — month or year`}
                </span>
              </li>
              <li>
                <span className="font-semibold text-white">3.</span> We activate your tier within
                24 hours. It&apos;ll show on your dashboard. When your time runs out, pay again to
                renew.
              </li>
            </ol>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
