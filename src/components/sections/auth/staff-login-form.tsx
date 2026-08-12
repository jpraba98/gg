"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { SupabaseNotConfigured } from "@/components/sections/auth/supabase-not-configured";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginFormValues } from "@/lib/schemas";

export function StaffLoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
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
    router.push("/staff");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      {serverError && <p className="text-sm text-red-400">{serverError}</p>}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
      <p className="text-center text-xs text-text-secondary">
        Staff access is assigned by an admin — this page won&apos;t grant staff permissions on
        its own.
      </p>
    </form>
  );
}
