"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { pastEvents } from "@/data/events";

const networkMentions = [
  "6ixBuzz placement",
  "Corus Entertainment collaboration",
  "Multiple viral placements across Toronto media",
];

export function TrackRecord() {
  return (
    <section className="py-20">
      <Container>
        <div className="mb-10">
          <p className="section-label">Track Record</p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Event History &amp; Network
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-xl text-white">Event Timeline</h3>
            <ol className="mt-5 space-y-4 border-l border-border pl-6">
              {pastEvents.map((event, i) => (
                <motion.li
                  key={`${event.name}-${event.season ?? ""}`}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                  className="relative"
                >
                  <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-drip-500" />
                  <p className="font-semibold text-white">
                    {event.name}
                    {event.season ? ` ${event.season}` : ""}
                  </p>
                  <p className="text-xs text-text-secondary">{event.year}</p>
                </motion.li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="font-display text-xl text-white">Notable Network</h3>
            <Card className="mt-5 divide-y divide-border p-0">
              {networkMentions.map((mention) => (
                <p key={mention} className="px-6 py-4 text-sm text-text-secondary">
                  {mention}
                </p>
              ))}
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
