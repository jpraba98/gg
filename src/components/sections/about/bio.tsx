import { Container } from "@/components/shared/container";

const paragraphs = [
  "JP, a 27-year-old creative entrepreneur and multimedia producer born and raised in Scarborough, Ontario. Rooted in Toronto's entertainment scene, JP has built a multi-faceted career that bridges the corporate world and the creative industry simultaneously.",
  "By day, JP serves as a Court and Client Representative with the Ministry of the Attorney General within the Ontario Public Service — bringing professionalism, accountability, and a deep understanding of the justice system to his work. By night, he operates as the founder and driving force behind The Drip Room 6ix — a vertically integrated entertainment company spanning talent management, media production, and event production across the Greater Toronto Area.",
  "Over the past several years, JP has produced and organized marquee events including Stars Align in the 6ix, Love in the 6ix, and 6ixclusive, while building a media platform that has secured placements on major Toronto outlets. He has directed and produced music videos, managed emerging artists, and grown an engaged digital community — all while maintaining his commitment to public service and more.",
  "JP's ongoing story is one of balance — proving that ambition, discipline, and community impact are not mutually exclusive, no matter where you come from.",
];

export function Bio() {
  return (
    <section className="py-20">
      <Container className="max-w-3xl">
        <p className="section-label">About</p>
        <h1 className="mt-3 font-display text-5xl text-white sm:text-6xl">
          The Person Behind <span className="text-gradient-drip">The Drip Room</span>
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
