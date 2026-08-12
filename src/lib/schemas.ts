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

export const contactSchema = bookingSchema;

export const applicationRoles = [
  "Writer / Blogger",
  "Content Moderator",
  "Media Curator",
  "Event Correspondent",
  "Social Media Contributor",
] as const;

export const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email"),
  instagram: z.string().optional(),
  role: z.enum(applicationRoles, { errorMap: () => ({ message: "Select a role" }) }),
  whyJoin: z.string().min(20, "Tell us more (20+ characters)"),
  portfolioUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  whyCreate: z.string().min(10, "Tell us more (10+ characters)"),
  whoFor: z.string().min(10, "Tell us more (10+ characters)"),
  oneThing: z.string().min(10, "Tell us more (10+ characters)"),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;

export const signUpSchema = z
  .object({
    displayName: z.string().min(2, "Display name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
