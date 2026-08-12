import type { Metadata } from "next";

import { AuthShell } from "@/components/sections/auth/auth-shell";
import { StaffLoginForm } from "@/components/sections/auth/staff-login-form";

export const metadata: Metadata = {
  title: "Staff Login",
};

export default function StaffLoginPage() {
  return (
    <AuthShell title="Staff Login" description="Sign in with your staff account.">
      <StaffLoginForm />
    </AuthShell>
  );
}
