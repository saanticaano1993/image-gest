import { z, ZodError } from "zod";

export const updateUserSchema = z
  .object({
    username: z.string().min(3).max(20).optional(),
    oldPassword: z.string(),
    newPassword: z
      .string()
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]?)[A-Za-z\d@$!%*#?&]{8,}$/,
        "Minimum 8 characters, at least 1 digit"
      )
      .optional(),
  })
  .refine(
    data => {
      return data.username !== undefined || data.newPassword !== undefined;
    },
    {
      message: "Either username or password must be provided",
    }
  );
