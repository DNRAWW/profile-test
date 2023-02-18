import { z } from "zod";

export const registerData = z
  .object({
    first_name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8).max(30),
  })
  .strict();

export const loginData = z.object({
  email: z.string(),
  password: z.string(),
});

export const updateData = z
  .object({
    first_name: z.string().min(3),
    email: z.string().email(),
    last_name: z.string().min(3),
    sex: z.enum(["M", "F"]),
  })
  .partial();
