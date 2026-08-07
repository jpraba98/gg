"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

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
          {pastEvents.map((event, i) => (
            <motion.div
              key={`${event.name}-${event.season ?? ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
            >
              <Card className="card-lift group flex items-center gap-4 p-5 hover:border-gold-500/40">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-gold-500/25 to-obsidian">
                  <ImageIcon className="h-5 w-5 text-gold-500" />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">
                    {event.name}
                    {event.season ? ` ${event.season}` : ""}
                  </p>
                  <p className="text-xs text-text-secondary">{event.year}</p>
                  <button className="mt-1 text-xs font-semibold text-gold-500 opacity-0 transition-opacity group-hover:opacity-100">
                    View Recap
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
