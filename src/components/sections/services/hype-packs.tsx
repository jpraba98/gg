import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { hypePacks } from "@/data/services";

export function HypePacks() {
  return (
    <section id="hype-packs" className="scroll-mt-24 py-20">
      <Container>
        <div className="mb-10">
          <p className="section-label">Hype Packs</p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Get Seen, Fast
          </h2>
        </div>

        <Card className="overflow-x-auto p-0">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-text-secondary">
                <th className="px-6 py-4 font-medium">Pack</th>
                <th className="px-6 py-4 font-medium">Posts / Stories</th>
                <th className="px-6 py-4 font-medium">Window</th>
                <th className="px-6 py-4 font-medium">Price</th>
              </tr>
            </thead>
            <tbody>
              {hypePacks.map((pack) => (
                <tr key={pack.name} className="border-b border-border last:border-b-0">
                  <td className="px-6 py-4 font-semibold text-white">{pack.name}</td>
                  <td className="px-6 py-4 text-text-secondary">{pack.postsStories}</td>
                  <td className="px-6 py-4 text-text-secondary">{pack.window}</td>
                  <td className="px-6 py-4 font-semibold text-drip-500">{pack.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Container>
    </section>
  );
}
