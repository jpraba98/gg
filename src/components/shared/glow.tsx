import { cn } from "@/lib/utils";

const COLORS = {
  drip: "91, 200, 245",
  gold: "212, 175, 55",
  motion: "139, 92, 246",
} as const;

/**
 * Soft background glow drawn as a radial gradient. Replaces the old
 * `rounded-full blur-[140px]` circles: huge CSS blur filters are cut out by
 * iPhone Safari behind animated content, leaving dark boxes on mobile.
 * Position it with className (absolute + offsets); size is the visible glow.
 */
export function Glow({
  color,
  opacity,
  size,
  className,
}: {
  color: keyof typeof COLORS;
  opacity: number;
  /** Diameter in px of the visible glow. */
  size: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(closest-side, rgba(${COLORS[color]}, ${opacity}) 0%, rgba(${COLORS[color]}, ${opacity * 0.45}) 45%, rgba(${COLORS[color]}, 0) 100%)`,
      }}
    />
  );
}
