import { Container } from "@/components/shared/container";
import { InstagramIcon } from "@/components/shared/social-icons";
import { siteConfig } from "@/lib/site-config";

export function InstagramPreview() {
  return (
    <section className="border-t border-border py-24">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-label">Instagram</p>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              @thedriproom6ix
            </h2>
          </div>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-drip-500 hover:underline"
          >
            Follow on Instagram
          </a>
        </div>

        {/* TODO: replace with the live Instagram Basic Display API feed once connected */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              role="img"
              aria-label={`Instagram post placeholder ${i + 1}`}
              className="flex aspect-square items-center justify-center rounded-xl border border-border bg-gradient-to-br from-drip-500/15 to-card"
            >
              <InstagramIcon className="h-6 w-6 text-drip-500/60" aria-hidden="true" />
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-text-secondary">
          Live feed coming soon via the Instagram Basic Display API — showing placeholders for now.
        </p>
      </Container>
    </section>
  );
}
