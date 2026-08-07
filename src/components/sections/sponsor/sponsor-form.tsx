"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sponsorSchema, type SponsorFormValues } from "@/lib/schemas";
import { sponsorEvents } from "@/data/sponsor";

export function SponsorForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SponsorFormValues>({
    resolver: zodResolver(sponsorSchema),
    defaultValues: { type: "sponsor" },
  });

  const eventInterest = watch("eventInterest");

  async function onSubmit(values: SponsorFormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again or email us directly.");
    }
  }

  if (submitted) {
    return (
      <Card className="mx-auto max-w-xl p-10 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-drip-500" aria-hidden="true" />
        <h3 className="mt-4 font-display text-2xl text-white">Inquiry Sent</h3>
        <p className="mt-2 text-sm text-text-secondary">
          Thanks for your interest in sponsoring — we&apos;ll be in touch shortly.
        </p>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <Card className="mx-auto max-w-2xl p-8 sm:p-10">
        <h3 className="font-display text-2xl text-white">Sponsor Inquiry</h3>
        <p className="mt-1 text-sm text-text-secondary">
          Tell us about your brand and goals — we&apos;ll follow up with a custom proposal.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <input type="hidden" value="sponsor" {...register("type")} />

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="companyName">Company / Brand Name</Label>
              <Input id="companyName" {...register("companyName")} />
              {errors.companyName && <p className="text-xs text-red-400">{errors.companyName.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input id="contactName" {...register("contactName")} />
              {errors.contactName && <p className="text-xs text-red-400">{errors.contactName.message}</p>}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" {...register("phone")} />
              {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Event or Campaign You&apos;re Interested In</Label>
            <Select value={eventInterest} onValueChange={(v) => setValue("eventInterest", v, { shouldValidate: true })}>
              <SelectTrigger>
                <SelectValue placeholder="Select an event or campaign" />
              </SelectTrigger>
              <SelectContent>
                {sponsorEvents.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.eventInterest && <p className="text-xs text-red-400">{errors.eventInterest.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">Message / What You&apos;re Looking For</Label>
            <Textarea id="message" {...register("message")} />
            {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
          </div>

          {serverError && <p className="text-sm text-red-400">{serverError}</p>}

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Submit Inquiry"}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
}
