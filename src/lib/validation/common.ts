import { z } from "zod";

export const urlSchema = z.string().url();

export const requiredString = z.string().trim().min(1);

export const optionalUrl = z
    .string()
    .url()
    .or(z.literal(""));