import { upcomingEvents } from "@/data/events";
import { EventDetailContent } from "@/components/sections/events/event-detail-content";

export function FeaturedEventDetail() {
  const event = upcomingEvents.find((e) => e.slug === "island-motion-vol-1");
  if (!event) return null;

  return <EventDetailContent event={event} />;
}
