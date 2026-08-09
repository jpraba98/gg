"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "drip" | "gold";
  className?: string;
  showWordmark?: boolean;
  /** "sm" for navbar/footer contexts, "lg" for standalone hero marks. */
  size?: "sm" | "lg";
}

const accentMap = {
  drip: { primary: "#5BC8F5", secondary: "#2BAEE8" },
  gold: { primary: "#D4AF37", secondary: "#B3922A" },
};

// public/images/logo-blue.png (global) and logo-gold.png (events pages) are the
// client-provided assets. If either is ever removed, the <img> below 404s and the
// component falls back to the inline SVG mark automatically.
//
// logo-blue.png has a long dripping tail below the wordmark that reads fine at hero
// size but disappears into illegibility at navbar height, so logo-blue-compact.png
// (a plain crop of the same source — no re-editing) is used for "sm" contexts instead.
// logo-gold.png is a self-contained circular badge that reads fine small as-is.
const logoSrc: Record<"drip" | "gold", Record<"sm" | "lg", string>> = {
  drip: {
    sm: "/images/logo-blue-compact.png",
    lg: "/images/logo-blue.png",
  },
  gold: {
    sm: "/images/logo-gold.png",
    lg: "/images/logo-gold.png",
  },
};

// Real pixel dimensions of each source file, so next/image can compute the correct
// aspect ratio (avoids layout shift) instead of assuming a square.
const naturalSize: Record<"drip" | "gold", Record<"sm" | "lg", { width: number; height: number }>> = {
  drip: {
    sm: { width: 680, height: 390 },
    lg: { width: 1000, height: 1000 },
  },
  gold: {
    sm: { width: 880, height: 1214 },
    lg: { width: 880, height: 1214 },
  },
};

const sizeClasses: Record<"sm" | "lg", string> = {
  sm: "h-9",
  lg: "h-14 sm:h-16",
};

export function Logo({ variant = "drip", className, showWordmark = true, size = "sm" }: LogoProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const accent = accentMap[variant];
  const heightClass = sizeClasses[size];

  if (!imageFailed) {
    return (
      <Image
        src={logoSrc[variant][size]}
        alt="TheDripRoom6ix"
        width={naturalSize[variant][size].width}
        height={naturalSize[variant][size].height}
        className={cn(heightClass, "w-auto object-contain", className)}
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 48 48" className={cn(heightClass, "aspect-square shrink-0")} aria-hidden="true">
        <g transform="translate(24 24)">
          <rect
            x="-16"
            y="-16"
            width="32"
            height="32"
            rx="4"
            transform="rotate(45)"
            fill="none"
            stroke={accent.primary}
            strokeWidth="2.5"
          />
          <rect
            x="-8"
            y="-8"
            width="16"
            height="16"
            rx="2"
            transform="rotate(45)"
            fill={accent.primary}
            fillOpacity="0.15"
            stroke={accent.secondary}
            strokeWidth="2"
          />
          <circle cx="0" cy="0" r="3.5" fill={accent.primary} />
        </g>
      </svg>
      {showWordmark && (
        <span className="font-display text-xl leading-none tracking-wide text-white">
          THEDRIPROOM<span style={{ color: accent.primary }}>6IX</span>
        </span>
      )}
    </div>
  );
}
