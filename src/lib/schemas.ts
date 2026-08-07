import { z } from "zod";

export const bookingSchema = z.object({
  type: z.literal("booking"),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  serviceInterest: z.string().min(1, "Select a service"),
  budgetRange: z.string().min(1, "Select a budget range"),
  message: z.string().min(10, "Tell us a bit more (10+ characters)"),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;

export const sponsorSchema = z.object({
  type: z.literal("sponsor"),
  companyName: z.string().min(2, "Company name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a valid phone number"),
  eventInterest: z.string().min(1, "Select an event"),
  packageInterest: z.string().min(1, "Select a package"),
  message: z.string().min(10, "Tell us a bit more (10+ characters)"),
});

export type SponsorFormValues = z.infer<typeof sponsorSchema>;

export const contactSchema = z.discriminatedUnion("type", [bookingSchema, sponsorSchema]);
