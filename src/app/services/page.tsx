import type { Metadata } from "next";

import { ServicesHero } from "@/components/sections/services/services-hero";
import { Bundles } from "@/components/sections/services/bundles";
import { HypePacks } from "@/components/sections/services/hype-packs";
import { CatalogGrid } from "@/components/sections/services/catalog-grid";
import { BookingForm } from "@/components/sections/services/booking-form";
import { Container } from "@/components/shared/container";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Event production, artist management, and media & promo services from TheDripRoom6ix — bundles, hype packs, and custom campaigns.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <Bundles />
      <HypePacks />
      <CatalogGrid />
      <section className="border-t border-border py-24">
        <Container>
          <BookingForm />
        </Container>
      </section>
    </>
  );
}
