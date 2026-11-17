"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { pastEvents } from "@/data/events";

export function PastEvents() {
  return (
    <section className="py-24">
      <Container>
        <div className="mb-10">
          <p className="section-label-gold">Track Record</p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">Past Events</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pastEvents.map((event, i) => {
            const label = `${event.name}${event.season ? ` ${event.season}` : ""}`;
            return (
              <motion.div
                key={`${event.name}-${event.season ?? ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
              >
                <Card className="card-lift overflow-hidden p-0 hover:border-gold-500/40">
                  {/* Swap for a real recap photo when available — keep the aspect-video ratio */}
                  <div
                    className="flex aspect-video flex-col items-center justify-center bg-gradient-to-br from-gold-500/25 to-obsidian px-4 text-center"
                    aria-hidden="true"
                  >
                    <span className="font-display text-2xl uppercase leading-tight text-white/90">
                      {event.name}
                    </span>
                    {event.season && (
                      <span className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold-500">
                        {event.season}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="truncate font-semibold text-white">{label}</p>
                    <p className="text-xs text-text-secondary">{event.year}</p>
                    {event.recapUrl && (
                      <a
                        href={event.recapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-xs font-semibold text-gold-500 hover:underline"
                      >
                        View Recap
                      </a>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
