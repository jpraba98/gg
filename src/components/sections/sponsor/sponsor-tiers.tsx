"use client";

import { motion } from "framer-motion";
import { Check, Download } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { sponsorTiers } from "@/data/sponsor";

export function SponsorTiers() {
  return (
    <section className="py-20">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-label">Sponsorship Tiers</p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              Choose Your Level
            </h2>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4" />
            Download Sponsor Deck
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {sponsorTiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
            >
              <Card className="card-lift p-6 hover:border-drip-500/40">
                <Accordion type="single" collapsible>
                  <AccordionItem value={tier.name} className="border-b-0">
                    <AccordionTrigger className="hover:text-drip-500">
                      <div className="flex flex-1 items-center justify-between pr-4">
                        <span className="font-display text-xl tracking-wide text-white">{tier.name}</span>
                        <span className="font-display text-xl text-drip-500">{tier.price}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {tier.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2 text-sm text-text-secondary">
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-drip-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
