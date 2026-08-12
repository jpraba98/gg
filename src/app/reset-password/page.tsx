import type { Metadata } from "next";

import { AuthShell } from "@/components/sections/auth/auth-shell";
import { ResetPasswordForm } from "@/components/sections/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Set a New Password" description="Choose a new password for your account.">
      <ResetPasswordForm />
    </AuthShell>
  );
}
