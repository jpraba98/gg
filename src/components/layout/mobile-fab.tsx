"use client";

import Link from "next/link";
import { CalendarDays, Sparkles } from "lucide-react";

import { siteConfig } from "@/lib/site-config";

export function MobileFab() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex border-t border-border bg-obsidian/95 backdrop-blur-lg lg:hidden">
      <Link
        href="/services"
        className="flex flex-1 items-center justify-center gap-2 border-r border-border py-4 text-xs font-semibold uppercase tracking-wide text-drip-500"
      >
        <Sparkles className="h-4 w-4" />
        Book a Service
      </Link>
      <a
        href={siteConfig.eventbriteUrl}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 items-center justify-center gap-2 py-4 text-xs font-semibold uppercase tracking-wide text-gold-500"
      >
        <CalendarDays className="h-4 w-4" />
        Get Tickets
      </a>
    </div>
  );
}
