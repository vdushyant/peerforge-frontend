import { z } from "zod";

export const profileSchema = z.object({

  headline: z
    .string()
    .max(100, "Headline cannot exceed 100 characters"),

  bio: z
    .string()
    .max(1000, "Bio cannot exceed 1000 characters"),

  yearsOfExperience: z.string(),

  githubUrl: z
    .string()
    .url("Enter a valid GitHub URL")
    .or(z.literal("")),

  linkedInUrl: z
    .string()
    .url("Enter a valid LinkedIn URL")
    .or(z.literal("")),

  skills: z.array(z.string()),
});