import type { Metadata } from "next";

import { SponsorHero } from "@/components/sections/sponsor/sponsor-hero";
import { WhySponsor } from "@/components/sections/sponsor/why-sponsor";
import { SponsorForm } from "@/components/sections/sponsor/sponsor-form";
import { SponsorDeckCta } from "@/components/sections/sponsor/sponsor-deck-cta";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Sponsor",
  description:
    "Partner with TheDripRoom6ix — reach a real, engaged multicultural Toronto audience.",
};

export default function SponsorPage() {
  return (
    <>
      <SponsorHero />
      <WhySponsor />
      <section className="py-24">
        <Container>
          <SponsorForm />
        </Container>
      </section>
      <SponsorDeckCta />
    </>
  );
}
