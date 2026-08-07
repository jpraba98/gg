"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";

const title = "TORONTO'S CREATIVE ENGINE";

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
      <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-drip-500/20 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian" />

      <Container className="relative flex flex-col items-center py-32 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Logo showWordmark={false} size="lg" className="mb-8" />
        </motion.div>

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
