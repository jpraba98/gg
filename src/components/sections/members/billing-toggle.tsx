"use client";

import { cn } from "@/lib/utils";

export type Billing = "monthly" | "yearly";

export function BillingToggle({
  value,
  onChange,
  className,
}: {
  value: Billing;
  onChange: (v: Billing) => void;
  className?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      className={cn("inline-flex rounded-full border border-border bg-card p-1", className)}
    >
      {(["monthly", "yearly"] as const).map((option) => (
        <button
          key={option}
          role="radio"
          aria-checked={value === option}
          onClick={() => onChange(option)}
          className={cn(
            "rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
            value === option ? "bg-drip-500 text-obsidian" : "text-text-secondary hover:text-white",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
