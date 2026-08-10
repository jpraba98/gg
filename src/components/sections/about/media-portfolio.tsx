"use client";

import { motion } from "framer-motion";
import { ExternalLink, PlayCircle } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { pressFeatures, industryCredits } from "@/data/press";

export function MediaPortfolio() {
  return (
    <section className="border-t border-border py-20">
      <Container>
        <div className="mb-10">
          <p className="section-label">Portfolio</p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Industry Credits &amp; Media Portfolio
          </h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-xl tracking-wide text-white">As Featured In</h3>
            <div className="mt-5 space-y-3">
              {pressFeatures.map((item, i) => (
                <motion.a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                  className="block"
                >
                  <Card className="card-lift flex items-center justify-between gap-3 p-5 hover:border-drip-500/40">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-drip-500">
                        {item.outlet}
                      </p>
                      <p className="mt-1 truncate text-sm font-medium text-white">{item.title}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 shrink-0 text-text-secondary" aria-hidden="true" />
                  </Card>
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl tracking-wide text-white">
              Industry Credits &amp; Production Record
            </h3>
            <Card className="mt-5 divide-y divide-border p-0">
              {industryCredits.map((credit) => (
                <div
                  key={credit.title}
                  className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-drip-500">
                      {credit.category}
                    </p>
                    <p className="mt-1 font-medium text-white">{credit.title}</p>
                    {credit.note && <p className="text-xs text-text-secondary">{credit.note}</p>}
                    {credit.videoUrl && (
                      <a
                        href={credit.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-drip-500 hover:underline"
                      >
                        <PlayCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        Watch Here
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary sm:shrink-0 sm:text-right">{credit.role}</p>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
