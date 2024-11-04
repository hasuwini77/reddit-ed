"use server";

import { createClient } from "../../utils/supabase/server";
import { commentSchema } from "@/actions/schemas";

export const postComment = async ({
  content,
  postId,
}: {
  content: string;
  postId: string;
}) => {
  const supabase = createClient();
  const validatedData = commentSchema.parse({ content });

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw new Error("Not authenticated");

  // Check if the post exists
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("id")
    .eq("id", postId)
    .single();

  if (postError || !post) {
    console.error("Post not found:", postError);
    throw new Error("Invalid post ID");
  }

  // Insert the comment
  const { error } = await supabase.from("comments").insert({
    content: validatedData.content,
    post_id: postId,
    user_id: user?.id,
  });

  if (error) {
    console.error("Error inserting comment:", error);
    throw error;
  }

  console.log("Comment posted successfully");
};
