import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string(),
});

export const registerSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]?)[A-Za-z\d@$!%*#?&]{8,}$/,
      "Minimum 8 characters, at least 1 digit"
    ),
});
