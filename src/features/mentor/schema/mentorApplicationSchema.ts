import { z } from "zod";

export const mentorApplicationSchema = z.object({
  about: z
    .string()
    .trim()
    .min(1, "About is required")
    .max(2000, "About must not exceed 2000 characters"),

  hourlyRate: z
    .number({
      message: "Hourly rate is required",
    })
    .min(0, "Hourly rate cannot be negative"),
});

export type MentorApplicationFormValues = z.infer<
  typeof mentorApplicationSchema
>;