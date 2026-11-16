import { createClient } from "@/lib/supabase/server";
import { blogPosts } from "@/data/blog";
import { getUpcomingEvents, pastEvents } from "@/data/events";
import { siteConfig } from "@/lib/site-config";

export async function getCommunityStats() {
  const supabase = createClient();
  // Show real sign-ups once there are enough to impress; until then show
  // the Instagram following, labelled honestly as followers.
  let community = { value: siteConfig.stats.followers, label: "Followers" };

  if (supabase) {
    const { count } = await supabase.from("profiles").select("id", { count: "exact", head: true });
    if (typeof count === "number" && count >= 100) {
      community = { value: `${count.toLocaleString()}+`, label: "Members" };
    }
  }

  return {
    members: community.value,
    membersLabel: community.label,
    articlesPublished: blogPosts.length,
    eventsCovered: getUpcomingEvents().length + pastEvents.length,
  };
}
