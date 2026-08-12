import type { Metadata } from "next";

import { AuthShell } from "@/components/sections/auth/auth-shell";
import { SignUpForm } from "@/components/sections/auth/signup-form";

export const metadata: Metadata = {
  title: "Create Free Account",
};

export default function SignUpPage() {
  return (
    <AuthShell
      title="Join TheDripRoom6ix"
      description="Create a free account to comment, like, and apply for team roles. No credit card required."
    >
      <SignUpForm />
    </AuthShell>
  );
}
