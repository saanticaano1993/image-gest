import { z } from "zod";

export const imageUploadSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(5),
});

export const updateImageSchema = z.object({
  title: z.string().min(5),
});
