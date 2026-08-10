import { Hero } from "@/components/sections/home/hero";
import { FeaturedEventStrip } from "@/components/sections/home/featured-event-strip";
import { PressStrip } from "@/components/sections/home/press-strip";
import { ServicesPreview } from "@/components/sections/home/services-preview";
import { StatsBar } from "@/components/sections/home/stats-bar";
import { MediaPreview } from "@/components/sections/home/media-preview";
import { MembersCta } from "@/components/sections/home/members-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedEventStrip />
      <PressStrip />
      <ServicesPreview />
      <StatsBar />
      <MediaPreview />
      <MembersCta />
    </>
  );
}
