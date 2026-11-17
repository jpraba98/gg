import type { Metadata } from "next";

import { ServicesHero } from "@/components/sections/services/services-hero";
import { Bundles } from "@/components/sections/services/bundles";
import { HypePacks } from "@/components/sections/services/hype-packs";
import { ProofOfWork } from "@/components/sections/services/proof-of-work";
import { CatalogGrid } from "@/components/sections/services/catalog-grid";
import { BookingForm } from "@/components/sections/services/booking-form";
import { Container } from "@/components/shared/container";
import { HashScroll } from "@/components/shared/hash-scroll";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Event production, artist management, and media & promo services from TheDripRoom6ix — bundles, hype packs, and custom campaigns.",
};

export default function ServicesPage() {
  return (
    <>
      <HashScroll />
      <ServicesHero />
      <Bundles />
      <HypePacks />
      <ProofOfWork />
      <CatalogGrid />
      <section id="book" className="scroll-mt-24 border-t border-border py-24">
        <Container>
          <BookingForm />
        </Container>
      </section>
    </>
  );
}
