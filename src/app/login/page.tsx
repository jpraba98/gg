import type { Metadata } from "next";
import { Suspense } from "react";

import { AuthShell } from "@/components/sections/auth/auth-shell";
import { LoginForm } from "@/components/sections/auth/login-form";

export const metadata: Metadata = {
  title: "Log In",
};

export default function LoginPage() {
  return (
    <AuthShell title="Welcome Back" description="Log in to your TheDripRoom6ix account.">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
