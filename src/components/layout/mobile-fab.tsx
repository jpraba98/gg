"use client";

import Link from "next/link";
import { CalendarDays, Sparkles } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { getUpcomingEvents, homeFeature } from "@/data/events";
import {
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
  XIcon,
  DiscordIcon,
} from "@/components/shared/social-icons";

const socialLinks = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: InstagramIcon },
  { label: "TikTok", href: siteConfig.social.tiktok, icon: TikTokIcon },
  { label: "Twitter/X", href: siteConfig.social.twitter, icon: XIcon },
  { label: "Discord", href: siteConfig.social.discord, icon: DiscordIcon },
  { label: "YouTube", href: siteConfig.social.youtube, icon: YouTubeIcon },
];

export function MobileFab() {
  // Point at real tickets when an event is on sale; otherwise at the teaser CTA.
  const nextEvent = getUpcomingEvents()[0];
  const right = nextEvent
    ? { href: nextEvent.ticketUrl, label: "Get Tickets" }
    : { href: homeFeature.ctaHref, label: homeFeature.ctaLabel };

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 lg:hidden">
      <div className="flex items-center justify-center gap-6 border-t border-border bg-obsidian/95 py-2.5 backdrop-blur-lg">
        {socialLinks.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-text-secondary transition-colors hover:text-drip-500"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </a>
        ))}
      </div>

      <div className="flex border-t border-border bg-obsidian/95 backdrop-blur-lg">
        <Link
          href="/services#book"
          className="flex flex-1 items-center justify-center gap-2 border-r border-border py-4 text-xs font-semibold uppercase tracking-wide text-drip-500"
        >
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          Book a Service
        </Link>
        <a
          href={right.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 py-4 text-xs font-semibold uppercase tracking-wide text-gold-500"
        >
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          {right.label}
        </a>
      </div>
    </div>
  );
}
