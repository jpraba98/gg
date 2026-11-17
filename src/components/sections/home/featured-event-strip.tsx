"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { homeFeature } from "@/data/events";
import { Glow } from "@/components/shared/glow";

export function FeaturedEventStrip() {
  const feature = homeFeature;
  if (!feature) return null;

  const isExternal = feature.ctaHref.startsWith("http");

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface py-16">
      <Glow color="gold" opacity={0.2} size={528} className="-left-[216px] top-1/2 -translate-y-1/2" />
      <Glow color="gold" opacity={0.1} size={528} className="-right-[216px] top-1/2 -translate-y-1/2" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-gold-500/30 bg-gradient-to-br from-gold-500/10 via-transparent to-transparent p-8 sm:p-10 lg:flex-row lg:items-center"
        >
          <div>
            <p className="section-label-gold">Featured Event</p>
            <h3 className="mt-3 font-display text-3xl uppercase text-white sm:text-4xl">
              {feature.name}
              {feature.season && <span className="text-gold-500"> {feature.season}</span>}
            </h3>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-400">
              <Heart className="h-3.5 w-3.5" aria-hidden="true" />
              {feature.status}
            </p>
            <p className="mt-4 max-w-xl text-sm text-text-secondary">{feature.blurb}</p>
          </div>

          <Button asChild variant="gold" size="lg" className="shrink-0">
            {isExternal ? (
              <a href={feature.ctaHref} target="_blank" rel="noopener noreferrer">
                {feature.ctaLabel}
              </a>
            ) : (
              <a href={feature.ctaHref}>{feature.ctaLabel}</a>
            )}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
