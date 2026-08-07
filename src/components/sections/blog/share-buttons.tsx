"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { XIcon } from "@/components/shared/social-icons";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare(platform: "x" | "copy") {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (platform === "x") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        "_blank",
      );
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mt-10 flex items-center gap-3 border-t border-border pt-8">
      <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
        Share
      </span>
      <Button variant="outline" size="sm" onClick={() => handleShare("x")}>
        <XIcon className="h-3.5 w-3.5" />
        Share
      </Button>
      <Button variant="outline" size="sm" onClick={() => handleShare("copy")}>
        {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
        {copied ? "Copied" : "Copy Link"}
      </Button>
    </div>
  );
}
