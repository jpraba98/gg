import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { TierCards } from "@/components/sections/members/tier-cards";
import { CommunityStats } from "@/components/sections/members/community-stats";
import { ApplySection } from "@/components/sections/members/apply-section";
import { LoggedInPanel } from "@/components/sections/members/logged-in-panel";
import { siteConfig } from "@/lib/site-config";
import { getCurrentProfile } from "@/lib/supabase/profile";
import { getMemberActivity } from "@/lib/supabase/dashboard-data";
import { getCommunityStats } from "@/lib/supabase/community-stats";

export const metadata: Metadata = {
  title: "Members",
  description:
    "Join TheDripRoom6ix membership community — discounts on services, events, and merch, plus early info drops.",
};

export default async function MembersPage() {
  const profile = await getCurrentProfile();
  const stats = await getCommunityStats();
  const applications = profile ? (await getMemberActivity(profile.id)).applications : [];

  return (
    <>
      {profile ? (
        <LoggedInPanel profile={profile} applications={applications} />
      ) : (
        <section className="py-20">
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-label">Members Portal</p>
              <h1 className="mt-3 font-display text-5xl text-white sm:text-6xl">
                Join The Drip Room <span className="text-gradient-drip">Community</span>
              </h1>
              <p className="mt-4 text-text-secondary">
                Pick a tier below, or join our{" "}
                <a
                  href={siteConfig.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-drip-500 hover:underline"
                >
                  Discord community
                </a>{" "}
                to connect right away.
              </p>
            </div>

            <div className="mt-14">
              <TierCards />
            </div>
          </Container>
        </section>
      )}

      <CommunityStats
        members={stats.members}
        membersLabel={stats.membersLabel}
        articlesPublished={stats.articlesPublished}
        eventsCovered={stats.eventsCovered}
      />

      <ApplySection isLoggedIn={!!profile} prefillEmail={profile?.email ?? undefined} />
    </>
  );
}
