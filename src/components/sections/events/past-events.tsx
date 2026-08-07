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
                  {/* TODO: swap for the real event recap photo once the client provides it — keep the aspect-video ratio */}
                  <div
                    className="flex aspect-video items-center justify-center bg-gradient-to-br from-gold-500/25 to-obsidian"
                    role="img"
                    aria-label={`${label} recap photo placeholder`}
                  >
                    <ImageIcon className="h-6 w-6 text-gold-500" aria-hidden="true" />
                  </div>
                  <div className="p-5">
                    <p className="truncate font-semibold text-white">{label}</p>
                    <p className="text-xs text-text-secondary">{event.year}</p>
                    {/* TODO: link to the real recap post/gallery once available */}
                    <a
                      href="#"
                      aria-label={`View recap for ${label} (coming soon)`}
                      className="mt-1 inline-block text-xs font-semibold text-gold-500 hover:underline"
                    >
                      View Recap
                    </a>
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
