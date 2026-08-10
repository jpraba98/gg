import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { industryCredits } from "@/data/press";

const highlightCategories = ["Music Video Production", "Brand Placement"];

export function ProofOfWork() {
  const highlights = industryCredits.filter((credit) =>
    highlightCategories.includes(credit.category),
  );

  return (
    <section className="border-t border-border py-20">
      <Container>
        <div className="mb-10 max-w-xl">
          <p className="section-label">Proof of Work</p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Media &amp; Promo In Action
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {highlights.map((credit) => (
            <Card key={credit.title} className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-drip-500">
                {credit.category}
              </p>
              <h3 className="mt-2 font-display text-xl text-white">{credit.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">
                {credit.role}
                {credit.note ? ` — ${credit.note}` : ""}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
