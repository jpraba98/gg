"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SupabaseNotConfigured } from "@/components/sections/auth/supabase-not-configured";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginFormValues } from "@/lib/schemas";

export function LoginForm({ redirectTo = "/dashboard" }: { redirectTo?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const [serverError, setServerError] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);
  const [resetting, setResetting] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  if (!supabase) {
    return <SupabaseNotConfigured />;
  }

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);
    const { error } = await supabase!.auth.signInWithPassword(values);
    if (error) {
      setServerError(error.message);
      return;
    }
    router.push(searchParams.get("next") ?? redirectTo);
    router.refresh();
  }

  async function handleForgotPassword() {
    const email = getValues("email");
    if (!email) {
      setServerError("Enter your email above first, then click Forgot password.");
      return;
    }
    setResetting(true);
    setServerError(null);
    const { error } = await supabase!.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setResetting(false);
    if (error) {
      setServerError(error.message);
      return;
    }
    setResetSent(true);
  }

  async function handleGoogle() {
    await supabase!.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}` },
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={resetting}
              className="text-xs font-semibold text-drip-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
        </div>

        {resetSent && (
          <p className="text-xs text-drip-500">Password reset link sent — check your email.</p>
        )}
        {serverError && <p className="text-sm text-red-400">{serverError}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log In"}
        </Button>
      </form>

      <div className="mt-5 border-t border-border pt-5">
        <Button variant="outline" className="w-full" onClick={handleGoogle}>
          Continue with Google
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-semibold text-drip-500 hover:underline">
          Create one free
        </Link>
      </p>
    </div>
  );
}
