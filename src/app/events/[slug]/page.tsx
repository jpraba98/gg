import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/shared/container";
import { EventDetailContent } from "@/components/sections/events/event-detail-content";
import { CommentSection } from "@/components/shared/comment-section";
import { LikeButton } from "@/components/shared/like-button";
import { upcomingEvents } from "@/data/events";
import { getLikeState, getComments } from "@/lib/supabase/interactions";

export function generateStaticParams() {
  return upcomingEvents.map((event) => ({ slug: event.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const event = upcomingEvents.find((e) => e.slug === params.slug);
  if (!event) return {};
  return { title: event.name, description: event.description };
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = upcomingEvents.find((e) => e.slug === params.slug);
  if (!event) notFound();

  const [likeState, commentState] = await Promise.all([
    getLikeState("event", event.slug),
    getComments("event", event.slug),
  ]);

  return (
    <article>
      <Container className="pt-10">
        <Link
          href="/events"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Events
        </Link>
      </Container>

      <EventDetailContent event={event} eyebrow="Event" />

      <Container className="max-w-3xl py-16">
        <LikeButton
          contentType="event"
          contentId={event.slug}
          initialCount={likeState.count}
          initialLiked={likeState.likedByMe}
          isLoggedIn={!!likeState.currentUserId}
          className="mb-10"
        />
        <CommentSection
          contentType="event"
          contentId={event.slug}
          initialComments={commentState.comments}
          isLoggedIn={!!commentState.currentUserId}
        />
      </Container>
    </article>
  );
}
