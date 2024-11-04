"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../utils/supabase/server";
import { z } from "zod";
import { commentSchema } from "./schemas";

export const postComment = async (data: z.infer<typeof commentSchema>) => {
  // Validate the data
  const validationResult = commentSchema.safeParse(data);
  if (!validationResult.success) {
    console.error("Validation error:", validationResult.error);
    throw new Error("Invalid input data");
  }
  const validatedData = validationResult.data;

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
      "You must be logged in with a valid email to post a comment"
    );
  }

  // Fetch the user's ID from the users table
  const { data: userData, error: userDataError } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .single();

  if (userDataError || !userData) {
    console.error("Error fetching user data:", userDataError);
    throw new Error("Failed to retrieve user information");
  }

  // Insert new comment into the database
  const { error: commentError } = await supabase
    .from("comments")
    .insert({
      content: validatedData.content,
      post_id: validatedData.postId,
      user_id: userData.id,
    })
    .throwOnError();

  if (commentError) {
    console.error("Error inserting comment:", commentError);
    throw new Error("Failed to post comment");
  }

  console.log("Comment posted successfully");

  // Revalidate the post page to show the new comment
  revalidatePath(`/post/${validatedData.postId}`);
};
