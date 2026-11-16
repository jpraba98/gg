import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Gem, Heart, MessageSquare, ClipboardList } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { requireMember } from "@/lib/supabase/guards";
import { getMemberActivity } from "@/lib/supabase/dashboard-data";
import { AccountSettings } from "@/components/sections/dashboard/account-settings";
import { UpgradeCta } from "@/components/sections/dashboard/upgrade-cta";
import { SignOutButton } from "@/components/sections/dashboard/sign-out-button";

export const metadata: Metadata = {
  title: "Dashboard",
};

const tierLabel: Record<string, string> = {
  free: "Free Member",
  member: "TheDripRoom6ix Member",
  top_tier: "Top Tier",
};

const statusColor: Record<string, string> = {
  pending: "text-gold-500",
  approved: "text-drip-500",
  accepted: "text-drip-500",
  hidden: "text-text-secondary",
  rejected: "text-red-400",
  reviewed: "text-gold-500",
};

export default async function DashboardPage() {
  const profile = await requireMember();
  const { likes, comments, applications } = await getMemberActivity(profile.id);

  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="section-label">Dashboard</p>
            <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
              {profile.displayName ? `Welcome back, ${profile.displayName}` : "Welcome back"}
            </h1>
          </div>
          <SignOutButton />
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <Card className="p-6">
            <Gem className="h-6 w-6 text-drip-500" aria-hidden="true" />
            <p className="mt-3 text-xs uppercase tracking-wide text-text-secondary">
              Membership
            </p>
            <p className="mt-1 font-display text-xl text-white">
              {tierLabel[profile.membershipTier] ?? "Free Member"}
            </p>
          </Card>
          <Card className="p-6">
            <CalendarDays className="h-6 w-6 text-drip-500" aria-hidden="true" />
            <p className="mt-3 text-xs uppercase tracking-wide text-text-secondary">
              Member Since
            </p>
            <p className="mt-1 font-display text-xl text-white">
              {profile.createdAt
                ? new Date(profile.createdAt).toLocaleDateString("en-CA", {
                    year: "numeric",
                    month: "short",
                  })
                : "—"}
            </p>
          </Card>
          <Card className="p-6">
            <ClipboardList className="h-6 w-6 text-drip-500" aria-hidden="true" />
            <p className="mt-3 text-xs uppercase tracking-wide text-text-secondary">
              Application Status
            </p>
            <p className="mt-1 font-display text-xl capitalize text-white">
              {applications[0]?.status ?? "Not applied"}
            </p>
          </Card>
        </div>

        <div className="mt-6">
          <UpgradeCta tier={profile.membershipTier} displayName={profile.displayName} />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 font-display text-xl text-white">
              <Heart className="h-5 w-5 text-drip-500" aria-hidden="true" />
              Saved &amp; Liked
            </h2>
            <Card className="mt-4 divide-y divide-border p-0">
              {likes.length === 0 && (
                <p className="px-6 py-4 text-sm text-text-secondary">
                  Nothing liked yet — browse the{" "}
                  <Link href="/blog" className="text-drip-500 hover:underline">
                    blog
                  </Link>{" "}
                  or{" "}
                  <Link href="/media" className="text-drip-500 hover:underline">
                    media
                  </Link>
                  .
                </p>
              )}
              {likes.map((item) => (
                <Link
                  key={`${item.contentType}-${item.contentId}`}
                  href={item.href}
                  className="block px-6 py-4 text-sm text-white hover:bg-white/5"
                >
                  <p className="text-xs uppercase tracking-wide text-text-secondary">
                    {item.contentType}
                  </p>
                  <p className="mt-0.5">{item.title}</p>
                </Link>
              ))}
            </Card>
          </div>

          <div>
            <h2 className="flex items-center gap-2 font-display text-xl text-white">
              <MessageSquare className="h-5 w-5 text-drip-500" aria-hidden="true" />
              Comment History
            </h2>
            <Card className="mt-4 divide-y divide-border p-0">
              {comments.length === 0 && (
                <p className="px-6 py-4 text-sm text-text-secondary">
                  You haven&apos;t commented yet.
                </p>
              )}
              {comments.map((comment) => (
                <Link
                  key={comment.id}
                  href={comment.href}
                  className="block px-6 py-4 text-sm hover:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs uppercase tracking-wide text-text-secondary">
                      {comment.title}
                    </p>
                    <span className={`text-xs font-semibold capitalize ${statusColor[comment.status] ?? "text-text-secondary"}`}>
                      {comment.status}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-white">{comment.body}</p>
                </Link>
              ))}
            </Card>
          </div>
        </div>

        <div id="settings" className="mt-12 scroll-mt-24">
          <h2 className="font-display text-xl text-white">Account Settings</h2>
          <div className="mt-4">
            <AccountSettings
              userId={profile.id}
              initialDisplayName={profile.displayName ?? ""}
              initialNotifyEmail={profile.notifyEmail}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
