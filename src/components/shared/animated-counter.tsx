"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  label: string;
  className?: string;
}

function parseValue(value: string) {
  const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
  const prefix = value.match(/^[^0-9]*/)?.[0] ?? "";
  const suffix = value.match(/[^0-9]*$/)?.[0] ?? "";
  return { numeric: isNaN(numeric) ? 0 : numeric, prefix, suffix };
}

export function AnimatedCounter({ value, label, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);
  const { numeric, prefix, suffix } = parseValue(value);

  useEffect(() => {
    if (!isInView) return;
    let start: number | null = null;
    const duration = 1400;

    function step(timestamp: number) {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * numeric));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [isInView, numeric]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <p className="font-display text-4xl text-white sm:text-5xl">
        {prefix}
        {display.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-1 text-sm uppercase tracking-wide text-text-secondary">{label}</p>
    </motion.div>
  );
}
