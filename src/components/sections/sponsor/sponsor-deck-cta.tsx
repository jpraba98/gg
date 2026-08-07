import { Download } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";

export function SponsorDeckCta() {
  return (
    <section className="border-y border-border bg-surface py-16">
      <Container className="flex flex-col items-center gap-5 text-center">
        <h2 className="font-display text-2xl text-white sm:text-3xl">
          Want the full breakdown? Download our sponsor deck.
        </h2>
        {/* TODO: swap href="#" for the real sponsor deck PDF once the client provides it */}
        <Button asChild variant="outline" size="lg">
          <a href="#" aria-label="Download Sponsor Deck (PDF — coming soon)">
            <Download className="h-4 w-4" aria-hidden="true" />
            Download Sponsor Deck
          </a>
        </Button>
      </Container>
    </section>
  );
}
