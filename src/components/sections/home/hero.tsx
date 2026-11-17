"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { homeFeature } from "@/data/events";
import { Glow } from "@/components/shared/glow";

const title = "TORONTO'S CREATIVE ENGINE";
const featuredEvent = homeFeature;

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-obsidian">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:64px_64px] opacity-40" />
      <Glow color="drip" opacity={0.2} size={800} className="left-1/2 -top-[140px] -translate-x-1/2" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian" />

      <Container className="relative flex flex-col items-center py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Logo showWordmark={false} size="lg" className="mb-8" />
        </motion.div>

        {featuredEvent && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <Link
              href="/events"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-drip-500/30 bg-drip-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-drip-400 transition-colors hover:border-drip-500/60 hover:text-drip-300"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Up Next: {featuredEvent.name}
              {featuredEvent.season ? ` ${featuredEvent.season}` : ""} — {featuredEvent.status}
            </Link>
          </motion.div>
        )}

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl font-display text-5xl leading-[1.05] tracking-wide text-white sm:text-7xl lg:text-8xl"
        >
          {title.split(" ").map((w, i) => (
            <motion.span key={i} variants={word} className="mr-4 inline-block last:mr-0">
              {i === title.split(" ").length - 1 ? (
                <span className="text-gradient-drip">{w}</span>
              ) : (
                w
              )}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-6 max-w-xl text-lg text-text-secondary"
        >
          Events. Talent. Media. Culture.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button asChild size="lg" variant="primary">
            <Link href="/events">Explore Events</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/services">Book Services</Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
