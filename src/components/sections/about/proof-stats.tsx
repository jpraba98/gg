import { Container } from "@/components/shared/container";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import { siteConfig } from "@/lib/site-config";

export function ProofStats() {
  const stats = [
    { value: siteConfig.stats.events, label: "Events Produced" },
    { value: siteConfig.stats.followers, label: "Community Members" },
    { value: siteConfig.stats.clients, label: "Clients Served" },
    { value: siteConfig.stats.years, label: "Years Operating" },
    { value: siteConfig.stats.revenue, label: "Online Revenue Generated" },
  ];

  return (
    <section className="border-y border-border bg-surface py-16">
      <Container className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} className="text-center" />
        ))}
      </Container>
    </section>
  );
}
