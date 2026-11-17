"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SupabaseNotConfigured } from "@/components/sections/auth/supabase-not-configured";
import { createClient } from "@/lib/supabase/client";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const supabase = createClient();
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  // null = still checking; false = no valid reset session (expired/used link)
  const [hasSession, setHasSession] = useState<boolean | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    (async () => {
      const params = new URLSearchParams(window.location.search);
      // Reset emails sent before the /auth/callback change land here with ?code=
      const code = params.get("code");
      if (code) {
        await supabase.auth.exchangeCodeForSession(code);
        window.history.replaceState(null, "", "/reset-password");
      }
      const { data } = await supabase.auth.getSession();
      if (!cancelled) setHasSession(params.get("expired") ? false : Boolean(data.session));
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  if (!supabase) {
    return <SupabaseNotConfigured />;
  }

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const { error } = await supabase!.auth.updateUser({ password: values.password });
    if (error) {
      setServerError(error.message);
      return;
    }
    setDone(true);
    setTimeout(() => router.push("/dashboard"), 1500);
  }

  if (hasSession === null) {
    return <p className="text-sm text-text-secondary">Checking your reset link...</p>;
  }

  if (hasSession === false) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-red-400">
          This reset link has expired or was already used, or it was opened in a different
          browser from the one you requested it in.
        </p>
        <Button asChild className="w-full">
          <Link href="/login">Request a new link</Link>
        </Button>
        <p className="text-xs text-text-secondary">
          Tip: open the email link on the same device and browser where you clicked
          &quot;Forgot password&quot;.
        </p>
      </div>
    );
  }

  if (done) {
    return <p className="text-sm text-drip-500">Password updated — redirecting...</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="password">New Password</Label>
        <Input id="password" type="password" {...register("password")} />
        {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
        )}
      </div>

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}
