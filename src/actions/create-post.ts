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
  if (!user || !user.email) {
    console.error("User not authenticated or email not found");
    throw new Error(
      "You must be logged in with a valid email to create a post"
    );
  }

  // Fetch the user's ID from the users table
  const { data: userData, error: userDataError } = await supabase
    .from("users")
    .select("id")
    .eq("email", user.email)
    .single();

  if (userDataError || !userData) {
    console.error("Error fetching user data:", userDataError);
    throw new Error("Failed to retrieve user information");
  }

  console.log("User data from users table:", userData);

  // Insert new post into the database
  const { error: postError } = await supabase
    .from("posts")
    .insert({
      ...validatedData,
      slug: uniqueSlug,
      user_id: userData.id,
    })
    .throwOnError();

  if (postError) {
    console.error("Error inserting post:", postError);
    throw new Error("Failed to create post");
  }

  console.log("Post created successfully");

  // Optionally revalidate and redirect if needed
  revalidatePath("/");
  redirect("/");
};
