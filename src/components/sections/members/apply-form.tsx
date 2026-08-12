"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { applicationSchema, applicationRoles, type ApplicationFormValues } from "@/lib/schemas";

export function ApplyForm({ prefillEmail }: { prefillEmail?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { email: prefillEmail ?? "" },
  });

  const role = watch("role");

  async function onSubmit(values: ApplicationFormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to submit");
      setSubmitted(true);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (submitted) {
    return (
      <Card className="mx-auto max-w-xl p-10 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-drip-500" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl text-white">Application Sent</h3>
        <p className="mt-2 text-sm text-text-secondary">
          Thanks for applying — check your{" "}
          <Link href="/dashboard" className="text-drip-500 hover:underline">
            dashboard
          </Link>{" "}
          for status updates.
        </p>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-2xl p-8 sm:p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...register("fullName")} />
            {errors.fullName && <p className="text-xs text-red-400">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="instagram">Instagram Handle</Label>
            <Input id="instagram" placeholder="@yourhandle" {...register("instagram")} />
          </div>
          <div className="space-y-1.5">
            <Label>Role Applying For</Label>
            <Select value={role} onValueChange={(v) => setValue("role", v as ApplicationFormValues["role"], { shouldValidate: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {applicationRoles.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.role && <p className="text-xs text-red-400">{errors.role.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="whyJoin">Why do you want to join the team?</Label>
          <Textarea id="whyJoin" {...register("whyJoin")} />
          {errors.whyJoin && <p className="text-xs text-red-400">{errors.whyJoin.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="portfolioUrl">Link to Portfolio or Past Work</Label>
          <Input id="portfolioUrl" placeholder="https://..." {...register("portfolioUrl")} />
          {errors.portfolioUrl && (
            <p className="text-xs text-red-400">{errors.portfolioUrl.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="whyCreate">Why do you create?</Label>
          <Textarea id="whyCreate" {...register("whyCreate")} />
          {errors.whyCreate && <p className="text-xs text-red-400">{errors.whyCreate.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="whoFor">Who do you create for?</Label>
          <Textarea id="whoFor" {...register("whoFor")} />
          {errors.whoFor && <p className="text-xs text-red-400">{errors.whoFor.message}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="oneThing">If you could create one thing, what would it be?</Label>
          <Textarea id="oneThing" {...register("oneThing")} />
          {errors.oneThing && <p className="text-xs text-red-400">{errors.oneThing.message}</p>}
        </div>

        {serverError && <p className="text-sm text-red-400">{serverError}</p>}

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </Card>
  );
}
