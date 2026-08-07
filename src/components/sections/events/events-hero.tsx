import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";

export function EventsHero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-obsidian py-24">
      <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-gold-500/15 blur-[130px]" />
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
