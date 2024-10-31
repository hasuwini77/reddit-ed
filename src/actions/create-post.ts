"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import { createPostSchema } from "./schemas";
import { z } from "zod";
import { slugify } from "../../utils/slugify";

export const createPost = async (data: z.infer<typeof createPostSchema>) => {
  // Validate the data
  const validationResult = createPostSchema.safeParse(data);
  if (!validationResult.success) {
    console.error("Validation error:", validationResult.error);
    throw new Error("Invalid input data");
  }
  const validatedData = validationResult.data;

  // Generate a unique slug
  const baseSlug = slugify(validatedData.title);
  const timestamp = Date.now();
  const uniqueSlug = `${baseSlug}-${timestamp}`;

  // Initialize Supabase client
  const supabase = createClient();

  // Retrieve authenticated user data
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("User retrieval error:", userError);
    throw new Error("Error retrieving user data");
  }
  if (!user) {
    console.error("User not authenticated or session not found");
    throw new Error("You must be logged in to create a post");
  }

  console.log("Authenticated user:", user);

  // Insert new post into the database
  const { error: postError } = await supabase
    .from("posts")
    .insert({
      ...validatedData,
      slug: uniqueSlug,
      user_id: user.id,
    })
    .throwOnError();

  if (postError) {
    console.error("Error inserting post:", postError);
    throw new Error("Failed to create post due to foreign key constraint");
  }

  console.log("Post created successfully");

  // Optionally revalidate and redirect if needed
  revalidatePath("/");
  redirect("/");
};
