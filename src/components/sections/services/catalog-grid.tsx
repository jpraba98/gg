import { Container } from "@/components/shared/container";
import { PriceList } from "@/components/sections/services/price-list";
import {
  individualPromo,
  contentPackages,
  collabAddOns,
  artistDevelopment,
  eventServices,
  digitalProducts,
} from "@/data/services";

const groups = [
  { id: "individual-promo", label: "Individual Promo", title: "À La Carte Promo", items: individualPromo },
  { id: "content-packages", label: "Content", title: "Content Packages", items: contentPackages },
  { id: "collab-add-ons", label: "Collabs", title: "Collab Add-On", items: collabAddOns },
  { id: "artist-development", label: "Artist Development", title: "Artist Development", items: artistDevelopment },
  { id: "event-services", label: "Events", title: "Event Services", items: eventServices },
  { id: "digital-products", label: "Digital", title: "Digital Products", items: digitalProducts },
];

export function CatalogGrid() {
  return (
    <section className="py-20">
      <Container>
        <div className="mb-10">
          <p className="section-label">Full Catalog</p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            À La Carte
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {groups.map((group) => (
            <div key={group.id} id={group.id} className="scroll-mt-24">
              <h3 className="mb-3 font-display text-xl tracking-wide text-white">{group.title}</h3>
              <PriceList items={group.items} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
