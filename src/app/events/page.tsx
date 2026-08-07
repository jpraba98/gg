import type { Metadata } from "next";

import { EventsHero } from "@/components/sections/events/events-hero";
import { UpcomingEvents } from "@/components/sections/events/upcoming-events";
import { FeaturedEventDetail } from "@/components/sections/events/featured-event-detail";
import { PastEvents } from "@/components/sections/events/past-events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past events from The Drip Room — Toronto showcases, networking nights, and members-only experiences.",
};

export default function EventsPage() {
  return (
    <>
      <EventsHero />
      <UpcomingEvents />
      <FeaturedEventDetail />
      <PastEvents />
    </>
  );
}
