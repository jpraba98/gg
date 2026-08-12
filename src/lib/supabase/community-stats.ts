import { createClient } from "@/lib/supabase/server";
import { blogPosts } from "@/data/blog";
import { upcomingEvents, pastEvents } from "@/data/events";
import { siteConfig } from "@/lib/site-config";

export async function getCommunityStats() {
  const supabase = createClient();
  let members = siteConfig.stats.followers;

  if (supabase) {
    const { count } = await supabase.from("profiles").select("id", { count: "exact", head: true });
    if (typeof count === "number" && count > 0) {
      members = `${count.toLocaleString()}+`;
    }
  }

  return {
    members,
    articlesPublished: blogPosts.length,
    eventsCovered: upcomingEvents.length + pastEvents.length,
  };
}
