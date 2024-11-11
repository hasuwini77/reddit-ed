import { z } from "zod";

const avatarUrlSchema = z
  .string()
  .url()
  .refine(
    (url) => {
      const allowedDomains = ["i.pravatar.cc", "avatar.iran.liara.run"];
      try {
        const parsedUrl = new URL(url);
        return (
          allowedDomains.includes(parsedUrl.hostname) &&
          /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(parsedUrl.pathname)
        );
      } catch (e) {
        return false;
      }
    },
    {
      message:
        "Please use an avatar URL from one of the following trusted sites: 'i.pravatar.cc' or 'avatar.iran.liara.run'. For example, try 'i.pravatar.cc/888' or 'avatar.iran.liara.run/public/20' to get a cool avatar!",
    }
  )
  .optional();

export const logInSchema = z.object({
  email: z.string().email("invalid email format"),
  password: z.string().min(5, "password must be at least 5 characters"),
});

export const signUpSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  avatar: avatarUrlSchema,
});

export const postSchema = z.object({
  title: z.string().min(3, "title must be at least 3 characters"),
  content: z
    .string()
    .min(10, "content must be at least 10 characters")
    .optional(),
  image: z.instanceof(FormData).optional(),
});

export const commentSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
});

export const createCommentSchema = z.object({
  content: commentSchema.shape.content,
  postId: z.string(),
  postSlug: z.string(),
});

export const createReplySchema = z.object({
  content: commentSchema.shape.content,
  postId: z.string(),
  postSlug: z.string(),
  parentId: z.string(),
});

export const userProfileSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3).max(20),
  avatar: z.string().url().nullable().optional(),
});
