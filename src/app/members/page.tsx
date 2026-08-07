import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { TierCards } from "@/components/sections/members/tier-cards";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Members",
  description:
    "Join The Drip Room membership community — discounts on services, events, and merch, plus early info drops.",
};

export default function MembersPage() {
  return (
    <section className="py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label">Members Portal</p>
          <h1 className="mt-3 font-display text-5xl text-white sm:text-6xl">
            Join The <span className="text-gradient-drip">Community</span>
          </h1>
          <p className="mt-4 text-text-secondary">
            Pick a tier below, or join our{" "}
            <a
              href={siteConfig.discordUrl}
              target="_blank"
              rel="noreferrer"
              className="text-drip-500 hover:underline"
            >
              Discord community
            </a>{" "}
            to connect right away.
          </p>
        </div>

        <div className="mt-14">
          <TierCards />
        </div>
      </Container>
    </section>
  );
}
