"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../utils/supabase/server";

export const deleteComment = async (commentId: string, postSlug: string) => {
  const supabase = createClient();

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

  if (user.id !== comment.user_id) {
    throw new Error("You are not the author of this comment");
  }

  // Delete the comment
  const { error: deleteError } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (deleteError) {
    throw new Error("Failed to delete comment");
  }

  revalidatePath(`/post/${postSlug}`);
};
