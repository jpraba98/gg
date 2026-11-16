"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/** Starts Stripe Checkout (subscriptions) or the billing portal, with shared loading/error state. */
export function useCheckout() {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function go(endpoint: string, key: string, body?: object) {
    setPending(key);
    setError(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body ?? {}),
      });
      const data = await res.json();
      if (data.needsAccount) {
        router.push("/signup");
        return;
      }
      if (!res.ok || !data.url) throw new Error(data.error ?? "Something went wrong.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setPending(null);
    }
  }

  return {
    pending,
    error,
    subscribe: (plan: string) => go("/api/checkout", plan, { plan }),
    manageBilling: () => go("/api/billing-portal", "portal"),
  };
}
