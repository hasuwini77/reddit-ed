"use server";

import { z } from "zod";
import { createClient } from "../../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { commentSchema } from "./schemas";

// Define a schema for the input data

export const editComment = async (
  commentId: string,
  postSlug: string,
  data: z.infer<typeof commentSchema>
) => {
  const supabase = createClient();

  const validatedData = commentSchema.parse(data);

  // Check if the comment exists and get the user_id
  const { data: comment, error: fetchError } = await supabase
    .from("comments")
    .select("user_id")
    .eq("id", commentId)
    .single();

  if (fetchError || !comment) {
    throw new Error("Comment not found");
  }

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("Authentication error");
  }

  // Check if the current user is the author of the comment
  if (user.id !== comment.user_id) {
    throw new Error("You are not the author of this comment");
  }

  // Update the comment
  const { error: updateError } = await supabase
    .from("comments")
    .update({ content: validatedData.content })
    .eq("id", commentId);

  if (updateError) {
    throw new Error("Failed to update comment");
  }

  // Revalidate the path
  revalidatePath(`/post/${postSlug}`);
};
