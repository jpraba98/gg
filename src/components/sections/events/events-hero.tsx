import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { Glow } from "@/components/shared/glow";

export function EventsHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-obsidian py-24">
      <Glow color="gold" opacity={0.15} size={680} className="left-1/2 -top-[130px] -translate-x-1/2" />
      <Container className="relative flex flex-col items-center text-center">
        <Logo variant="gold" showWordmark={false} size="lg" className="mb-6" />
        <p className="section-label-gold">Events</p>
        <h1 className="mt-3 font-display text-5xl text-white sm:text-6xl">
          Where Toronto <span className="text-gradient-gold">Shows Up</span>
        </h1>
        <p className="mt-4 max-w-xl text-text-secondary">
          Showcases, networking nights, and members-only experiences — produced end to end
          by TheDripRoom6ix.
        </p>
      </Container>
    </section>
  );
}
