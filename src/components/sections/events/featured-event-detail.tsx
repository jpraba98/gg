import { getUpcomingEvents } from "@/data/events";
import { EventDetailContent } from "@/components/sections/events/event-detail-content";

export function FeaturedEventDetail() {
  const event = getUpcomingEvents()[0];
  if (!event) return null;

  return <EventDetailContent event={event} />;
}
