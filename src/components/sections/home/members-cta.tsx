"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Gem } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export function MembersCta() {
  return (
    <section className="py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-drip-500/30 bg-gradient-to-br from-drip-500/15 via-surface to-surface p-10 text-center sm:p-16"
        >
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-drip-500/25 blur-[120px]" />
          <Gem className="relative mx-auto h-10 w-10 text-drip-500" />
          <h2 className="relative mt-6 font-display text-4xl text-white sm:text-5xl">
            Join TheDripRoom6ix Community
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-text-secondary">
            Discounts on services, events, and merch — plus early info drops for members.
          </p>
          <div className="relative mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-text-secondary">
            <span>
              <span className="font-semibold text-white">DR Member</span> — $5/mo or $60/yr
            </span>
            <span className="hidden h-4 w-px bg-border sm:block" />
            <span>
              <span className="font-semibold text-white">Top Tier</span> — $10/mo or $120/yr
            </span>
          </div>
          <Button asChild size="lg" className="relative mt-8">
            <Link href="/members">Join Now</Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
