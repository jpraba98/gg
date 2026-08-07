import { Container } from "@/components/shared/container";

export function ServicesHero() {
  return (
    <section className="relative overflow-hidden border-b border-border py-24">
      <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-drip-500/15 blur-[130px]" />
      <Container className="relative text-center">
        <p className="section-label">Services</p>
        <h1 className="mx-auto mt-3 max-w-3xl font-display text-5xl text-white sm:text-6xl">
          LEVEL UP YOUR BRAND. <span className="text-gradient-drip">WE BRING THE HYPE.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-text-secondary">
          From single posts to full campaigns — pick the package that fits, or build your own.
        </p>
      </Container>
    </section>
  );
}
