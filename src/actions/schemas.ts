import { z } from "zod";

export const logInSchema = z.object({
  email: z.string().email("invalid email format"),
  password: z.string().min(5, "password must be at least 5 characters"),
});

export const signUpSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  avatar: z.string().optional(),
});

export const createPostSchema = z.object({
  title: z.string().min(3, "title must be at least 3 characters"),
  content: z
    .string()
    .min(10, "content must be at least 10 characters")
    .optional(),
});
