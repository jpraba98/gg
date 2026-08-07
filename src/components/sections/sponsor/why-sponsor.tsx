import { TrendingUp, Globe2 } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { sponsorStats, sponsorAudience } from "@/data/sponsor";

export function WhySponsor() {
  return (
    <section className="py-20">
      <Container>
        <div className="mb-10 max-w-xl">
          <p className="section-label">Why Sponsor</p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            A Real, Engaged Toronto Audience
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sponsorStats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <TrendingUp className="h-6 w-6 text-drip-500" aria-hidden="true" />
              <p className="mt-4 font-display text-2xl text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
            </Card>
          ))}

          <Card className="p-6 sm:col-span-2 lg:col-span-3">
            <Globe2 className="h-6 w-6 text-drip-500" aria-hidden="true" />
            <p className="mt-4 text-sm uppercase tracking-wide text-text-secondary">Audience</p>
            <p className="mt-1 font-display text-xl text-white">{sponsorAudience}</p>
          </Card>
        </div>
      </Container>
    </section>
  );
}
