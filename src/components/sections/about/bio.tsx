import { Container } from "@/components/shared/container";

const paragraphs = [
  "The Drip Room was born in Scarborough, Ontario — built from the ground up by a creator who refused to wait for permission.",
  "What started as a passion for music, events, and connecting people evolved into one of Toronto's most active independent entertainment brands. Over 5+ years, The Drip Room has produced marquee events, developed emerging artists, secured major media placements, and built a community that spans the Greater Toronto Area and beyond.",
  "We've organized sold-out showcases, directed and produced music videos, managed talent, and created content that has landed on some of Toronto's biggest platforms. We've partnered with brands, collaborated with established industry names, and built stages for artists who had none.",
  "But more than the events and the numbers — The Drip Room has always been about the community. About giving Toronto's creatives, artists, and culture a platform they actually deserve. About proving that you don't need a corporate budget to build something real.",
  "This is Toronto's creative engine. And we're just getting started.",
];

export function Bio() {
  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <p className="section-label">About</p>
        <h1 className="mt-3 font-display text-5xl text-white sm:text-6xl">
          The Story Behind <span className="text-gradient-drip">TheDripRoom6ix</span>
        </h1>
        <div className="mt-8 space-y-5 text-base leading-relaxed text-text-secondary">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Container>
    </section>
  );
}
