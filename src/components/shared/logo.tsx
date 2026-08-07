import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "drip" | "gold";
  className?: string;
  showWordmark?: boolean;
}

const accentMap = {
  drip: { primary: "#5BC8F5", secondary: "#2BAEE8" },
  gold: { primary: "#D4AF37", secondary: "#B3922A" },
};

export function Logo({ variant = "drip", className, showWordmark = true }: LogoProps) {
  const accent = accentMap[variant];
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 48 48"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
      >
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
          THE DRIP<span style={{ color: accent.primary }}> ROOM</span>
        </span>
      )}
    </div>
  );
}
