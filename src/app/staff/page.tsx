import type { Metadata } from "next";

import { Container } from "@/components/shared/container";
import { requireStaff } from "@/lib/supabase/guards";
import { StaffDashboardTabs } from "@/components/sections/staff/staff-dashboard-tabs";
import { SignOutButton } from "@/components/sections/dashboard/sign-out-button";

export const metadata: Metadata = {
  title: "Staff Dashboard",
};

export default async function StaffPage() {
  const profile = await requireStaff();

  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="section-label">Staff</p>
            <h1 className="mt-3 font-display text-4xl text-white sm:text-5xl">
              {profile.displayName ? `${profile.displayName}'s Panel` : "Staff Panel"}
            </h1>
          </div>
          <SignOutButton />
        </div>

        <div className="mt-10">
          <StaffDashboardTabs userId={profile.id} isAdmin={profile.role === "admin"} />
        </div>
      </Container>
    </section>
  );
}
