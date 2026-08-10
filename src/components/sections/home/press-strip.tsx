import { Container } from "@/components/shared/container";
import { pressFeatures } from "@/data/press";

export function PressStrip() {
  const blogto = pressFeatures.find((p) => p.outlet === "BlogTO" && p.title.includes("Island Motion"));
  const playmore = pressFeatures.find((p) => p.outlet === "PlayMoreEnt");
  const links = [blogto, playmore].filter(Boolean) as typeof pressFeatures;

  if (links.length === 0) return null;

  return (
    <section className="border-b border-border py-10">
      <Container className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
          As Featured In
        </span>
        {links.map((item) => (
          <a
            key={item.url}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-xl tracking-wide text-white/70 transition-colors hover:text-drip-500"
          >
            {item.outlet}
          </a>
        ))}
      </Container>
    </section>
  );
}
