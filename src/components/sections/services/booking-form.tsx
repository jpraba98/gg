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
import { bookingSchema, type BookingFormValues } from "@/lib/schemas";
import { allServiceNames, budgetRanges } from "@/data/services";

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { type: "booking" },
  });

  const serviceInterest = watch("serviceInterest");
  const budgetRange = watch("budgetRange");

  async function onSubmit(values: BookingFormValues) {
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
        <CheckCircle2 className="mx-auto h-10 w-10 text-drip-500" />
        <h3 className="mt-4 font-display text-2xl text-white">Inquiry Sent</h3>
        <p className="mt-2 text-sm text-text-secondary">
          Thanks for reaching out — we&apos;ll get back to you shortly.
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
        <h3 className="font-display text-2xl text-white">Booking / Inquiry Form</h3>
        <p className="mt-1 text-sm text-text-secondary">
          Tell us what you need — we&apos;ll follow up within 1–2 business days.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <input type="hidden" value="booking" {...register("type")} />

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

          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" {...register("phone")} />
            {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Service Interested In</Label>
              <Select value={serviceInterest} onValueChange={(v) => setValue("serviceInterest", v, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {allServiceNames.map((name) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.serviceInterest && (
                <p className="text-xs text-red-400">{errors.serviceInterest.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Budget Range</Label>
              <Select value={budgetRange} onValueChange={(v) => setValue("budgetRange", v, { shouldValidate: true })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.budgetRange && <p className="text-xs text-red-400">{errors.budgetRange.message}</p>}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">Message / Details</Label>
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
