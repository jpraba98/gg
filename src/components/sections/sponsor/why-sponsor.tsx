import { Users, CalendarCheck2, Mail, Globe2 } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";

const stats = [
  { icon: Users, label: "Community Reach", value: siteConfig.stats.followers },
  { icon: CalendarCheck2, label: "Events Produced", value: siteConfig.stats.events },
  { icon: Mail, label: "Email Database", value: "500+" },
  { icon: Globe2, label: "Audience", value: "Tamil, Caribbean, Jamaican & multicultural GTA" },
];

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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <stat.icon className="h-6 w-6 text-drip-500" />
              <p className="mt-4 font-display text-2xl text-white">{stat.value}</p>
              <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
