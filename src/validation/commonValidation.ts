import { z } from "zod";

export const idData = z.object({
  id: z
    .string()
    .transform((val) => Number(val))
    .pipe(z.number().min(1)),
});

export const pageData = z.object({
  page: z
    .string()
    .transform((val) => Number(val))
    .pipe(z.number().min(1)),
});
