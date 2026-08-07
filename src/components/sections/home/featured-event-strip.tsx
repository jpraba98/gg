"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { upcomingEvents } from "@/data/events";

export function FeaturedEventStrip() {
  const event = upcomingEvents[0];
  if (!event) return null;

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface py-16">
      <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-motion-500/25 blur-[120px]" />
      <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-motion-500/15 blur-[120px]" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-motion-500/30 bg-gradient-to-br from-motion-500/10 via-transparent to-transparent p-8 sm:p-10 lg:flex-row lg:items-center"
        >
          <div>
            <p className="section-label-motion">Featured Event</p>
            <h3 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              {event.name}
            </h3>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-secondary">
              <span className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-motion-400" />
                {event.dateLabel}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-motion-400" />
                {event.venue}, {event.address}
              </span>
            </div>
          </div>

          <Button asChild variant="motion" size="lg" className="shrink-0">
            <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
              Get Tickets
            </a>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
