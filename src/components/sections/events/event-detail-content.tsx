"use client";

import { motion } from "framer-motion";
import { CalendarDays, MapPin, Clock, IdCard, Ticket, Mic2, Newspaper } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import type { DripEvent } from "@/data/events";

export function EventDetailContent({ event, eyebrow = "Featured" }: { event: DripEvent; eyebrow?: string }) {
  const details = [
    { icon: CalendarDays, label: "Date", value: event.dateLabel },
    { icon: MapPin, label: "Venue", value: `${event.venue} — ${event.address}` },
    { icon: Clock, label: "Doors / Last Call", value: `${event.doors} / ${event.lastCall}` },
    { icon: IdCard, label: "Age", value: event.age },
    { icon: Ticket, label: "Tickets", value: event.priceRange },
  ];

  return (
    <section className="relative overflow-hidden border-y border-motion-500/30 bg-gradient-to-b from-motion-500/10 via-obsidian to-obsidian py-24">
      <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-motion-500/25 blur-[150px]" />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label-motion">{eyebrow}</p>
          {event.presentedBy && (
            <p className="mt-2 text-sm text-text-secondary">
              Presented by <span className="text-white">{event.presentedBy}</span>
              {event.poweredBy && (
                <>
                  {" "}
                  · Powered by <span className="text-white">{event.poweredBy}</span>
                </>
              )}
            </p>
          )}
          <h2 className="mt-3 max-w-2xl font-display text-4xl text-white sm:text-5xl">
            {event.name}
          </h2>
          <p className="mt-4 max-w-2xl text-text-secondary">{event.description}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {details.map((detail) => (
              <div key={detail.label} className="rounded-xl border border-border bg-surface/60 p-5">
                <detail.icon className="h-5 w-5 text-motion-400" />
                <p className="mt-3 text-xs uppercase tracking-wide text-text-secondary">
                  {detail.label}
                </p>
                <p className="mt-1 text-sm font-medium text-white">{detail.value}</p>
              </div>
            ))}

            <div className="rounded-xl border border-border bg-surface/60 p-5 sm:col-span-2 lg:col-span-1">
              <Mic2 className="h-5 w-5 text-motion-400" />
              <p className="mt-3 text-xs uppercase tracking-wide text-text-secondary">Talent</p>
              <ul className="mt-1 space-y-0.5 text-sm font-medium text-white">
                {event.talent.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button asChild size="lg" variant="motion">
              <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                Get Tickets
              </a>
            </Button>
            {event.pressUrl && (
              <a
                href={event.pressUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-motion-400 hover:underline"
              >
                <Newspaper className="h-4 w-4" aria-hidden="true" />
                {event.pressLabel ?? "As Featured In"}
              </a>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
