import type { Metadata } from "next";

import { SponsorHero } from "@/components/sections/sponsor/sponsor-hero";
import { WhySponsor } from "@/components/sections/sponsor/why-sponsor";
import { SponsorTiers } from "@/components/sections/sponsor/sponsor-tiers";
import { SponsorForm } from "@/components/sections/sponsor/sponsor-form";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Sponsor",
  description:
    "Partner with The Drip Room — sponsorship tiers and packages to put your brand in front of Toronto's creative community.",
};

export default function SponsorPage() {
  return (
    <>
      <SponsorHero />
      <WhySponsor />
      <SponsorTiers />
      <section className="border-t border-border py-24">
        <Container>
          <SponsorForm />
        </Container>
      </section>
    </>
  );
}
