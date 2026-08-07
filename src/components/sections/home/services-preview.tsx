"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck2, Mic2, Megaphone, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";

const services = [
  {
    icon: CalendarCheck2,
    title: "Events Production",
    description:
      "Full-scale planning, day-of management, and Eventbrite setup for showcases and private events.",
    href: "/services#event-services",
  },
  {
    icon: Mic2,
    title: "Artist Management",
    description:
      "Consultation, social media management, SEO, and email marketing to grow independent artists.",
    href: "/services#artist-development",
  },
  {
    icon: Megaphone,
    title: "Media & Promo",
    description:
      "Hype packs, content bundles, and collab campaigns that put your brand in front of Toronto.",
    href: "/services#hype-packs",
  },
];

export function ServicesPreview() {
  return (
    <section className="py-24">
      <Container>
        <div className="mb-12 max-w-xl">
          <p className="section-label">What We Do</p>
          <h2 className="mt-3 font-display text-4xl text-white sm:text-5xl">
            Built for Toronto&apos;s Creators
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={service.href}>
                <Card className="card-lift group h-full p-8 hover:border-drip-500/50 hover:shadow-glow-drip">
                  <service.icon className="h-9 w-9 text-drip-500" />
                  <h3 className="mt-6 font-display text-2xl text-white">{service.title}</h3>
                  <p className="mt-3 text-sm text-text-secondary">{service.description}</p>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-drip-500">
                    Learn More
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
