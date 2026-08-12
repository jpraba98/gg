"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SupabaseNotConfigured } from "@/components/sections/auth/supabase-not-configured";
import { createClient } from "@/lib/supabase/client";
import { signUpSchema, type SignUpFormValues } from "@/lib/schemas";

export function SignUpForm() {
  const supabase = createClient();
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({ resolver: zodResolver(signUpSchema) });

  if (!supabase) {
    return <SupabaseNotConfigured />;
  }

  async function onSubmit(values: SignUpFormValues) {
    setServerError(null);
    const { data, error } = await supabase!.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: { display_name: values.displayName },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setServerError(error.message);
      return;
    }
    if (data.session) {
      window.location.href = "/dashboard";
      return;
    }
    setEmailSent(true);
  }

  async function handleGoogle() {
    await supabase!.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  if (emailSent) {
    return (
      <Card className="p-6 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-drip-500" aria-hidden="true" />
        <p className="mt-3 text-sm text-text-secondary">
          Check your email to confirm your account, then log in.
        </p>
      </Card>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="displayName">Display Name</Label>
          <Input id="displayName" {...register("displayName")} />
          {errors.displayName && (
            <p className="text-xs text-red-400">{errors.displayName.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="text-xs text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        {serverError && <p className="text-sm text-red-400">{serverError}</p>}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create Free Account"}
        </Button>
      </form>

      <div className="mt-5 border-t border-border pt-5">
        <Button variant="outline" className="w-full" onClick={handleGoogle}>
          Continue with Google
        </Button>
      </div>

      <p className="mt-6 text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-drip-500 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
