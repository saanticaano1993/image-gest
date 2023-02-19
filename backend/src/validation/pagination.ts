import { z } from "zod";

const queryParamsSchema = z.object({
  page: z.string().transform(Number).optional().default("1"),
  limit: z.string().transform(Number).optional().default("10"),
  search: z.string().optional(),
  orderByFilesize: z
    .string()
    .optional()
    .transform(value => {
      if (value === "asc") {
        return 1;
      } else if (value === "desc") {
        return -1;
      }
    }),
  orderByUploadDate: z
    .string()
    .optional()
    .default("desc")
    .transform(value => {
      if (value === "asc") {
        return 1;
      } else if (value === "desc") {
        return -1;
      }

      return -1;
    }),
});

export { queryParamsSchema };
