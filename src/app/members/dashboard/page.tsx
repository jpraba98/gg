import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Gem, Lock, Settings } from "lucide-react";

import { Container } from "@/components/shared/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Member Dashboard",
};

export default async function MemberDashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = supabase ? await supabase.auth.getUser() : { data: { user: null } };

  if (!supabase) {
    return (
      <section className="py-24">
        <Container className="max-w-lg text-center">
          <Lock className="mx-auto h-10 w-10 text-drip-500" />
          <h1 className="mt-4 font-display text-3xl text-white">Members Not Configured</h1>
          <p className="mt-2 text-text-secondary">
            Set the Supabase environment variables to enable member accounts and this
            dashboard.
          </p>
          <Button asChild className="mt-6">
            <Link href="/members">Back to Members</Link>
          </Button>
        </Container>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="py-24">
        <Container className="max-w-lg text-center">
          <Lock className="mx-auto h-10 w-10 text-drip-500" />
          <h1 className="mt-4 font-display text-3xl text-white">Log In Required</h1>
          <p className="mt-2 text-text-secondary">
            Please log in from the Members page to view your dashboard.
          </p>
          <Button asChild className="mt-6">
            <Link href="/members">Go to Members</Link>
          </Button>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20">
      <Container>
        <p className="section-label">Dashboard</p>
        <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
          Welcome back{user.email ? `, ${user.email.split("@")[0]}` : ""}
        </h1>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          <Card className="p-6">
            <Gem className="h-6 w-6 text-drip-500" />
            <h3 className="mt-4 font-display text-xl text-white">Membership Status</h3>
            <p className="mt-2 text-sm text-text-secondary">
              Tier and expiry sync once billing is fully connected.
            </p>
          </Card>
          <Card className="p-6">
            <CalendarDays className="h-6 w-6 text-drip-500" />
            <h3 className="mt-4 font-display text-xl text-white">Saved Events</h3>
            <p className="mt-2 text-sm text-text-secondary">
              You haven&apos;t saved any events yet — browse{" "}
              <Link href="/events" className="text-drip-500 hover:underline">
                upcoming events
              </Link>
              .
            </p>
          </Card>
          <Card className="p-6">
            <Settings className="h-6 w-6 text-drip-500" />
            <h3 className="mt-4 font-display text-xl text-white">Account Settings</h3>
            <p className="mt-2 text-sm text-text-secondary">
              Manage your profile and notification preferences.
            </p>
          </Card>
        </div>

        <Card className="mt-6 p-6">
          <h3 className="font-display text-xl text-white">Exclusive Content</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Member-only drops and content will appear here.
          </p>
        </Card>
      </Container>
    </section>
  );
}
