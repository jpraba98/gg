"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, MapPin, Newspaper } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { upcomingEvents } from "@/data/events";
import { cn } from "@/lib/utils";

const filters = ["All", "Showcases", "Networking", "Members Only"] as const;

export function UpcomingEvents() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const events = upcomingEvents.filter(
    (event) => filter === "All" || event.category === filter,
  );

  return (
    <section className="py-20">
      <Container>
        <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2 className="font-display text-3xl text-white sm:text-4xl">Upcoming Events</h2>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <TabsList>
              {filters.map((f) => (
                <TabsTrigger
                  key={f}
                  value={f}
                  className="data-[state=active]:bg-gold-500 data-[state=active]:text-obsidian"
                >
                  {f}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {events.length === 0 && (
          <p className="text-text-secondary">No events in this category right now — check back soon.</p>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <motion.div
              key={event.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card
                className={cn(
                  "card-lift h-full overflow-hidden p-0",
                  event.theme === "motion" && "border-motion-500/40 hover:shadow-glow-motion",
                  event.theme === "gold" && "border-gold-500/40 hover:shadow-glow-gold",
                )}
              >
                <div
                  className={cn(
                    "flex h-40 items-center justify-center bg-gradient-to-br",
                    event.theme === "motion" && "from-motion-500/30 to-obsidian",
                    event.theme === "gold" && "from-gold-500/30 to-obsidian",
                  )}
                >
                  <span className="font-display text-3xl text-white/90">{event.name.split(" ").slice(0, 2).join(" ")}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-white">{event.name}</h3>
                  <div className="mt-3 space-y-1.5 text-sm text-text-secondary">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-gold-500" />
                      {event.dateLabel}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gold-500" />
                      {event.venue}
                    </p>
                  </div>
                  <p className="mt-3 text-sm font-semibold text-white">{event.priceRange}</p>
                  {event.pressUrl && (
                    <a
                      href={event.pressUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-500 hover:underline"
                    >
                      <Newspaper className="h-3.5 w-3.5" aria-hidden="true" />
                      {event.pressLabel ?? "As Featured In"}
                    </a>
                  )}
                  <Button asChild variant="gold" className="mt-5 w-full">
                    <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer">
                      RSVP / Buy Tickets
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
