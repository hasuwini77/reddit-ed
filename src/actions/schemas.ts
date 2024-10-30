import { z } from "zod";

export const logInSchema = z.object({
  email: z.string().email("invalid email format"),
  password: z.string().min(5, "password must be at least 5 characters"),
});
