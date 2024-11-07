"use server";

import { createClient } from "../../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { createReplySchema } from "@/actions/schemas";
import { z } from "zod";

export const createReply = async (input: z.infer<typeof createReplySchema>) => {
  const supabase = createClient();

  const validatedData = createReplySchema.parse(input);

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return { status: "unauthenticated" };
  }

  // Check if the parent comment exists
  const { data: parentComment, error: parentError } = await supabase
    .from("comments")
    .select("id")
    .eq("id", validatedData.parentId)
    .single();

  if (parentError || !parentComment) {
    console.error("Error finding parent comment:", parentError);
    return { status: "error", message: "Parent comment not found" };
  }

  // Fetch the post ID (UUID) from the post slug
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("id")
    .eq("slug", validatedData.postSlug)
    .single();

  if (postError || !postData) {
    console.error("Error finding post:", postError);
    return { status: "error", message: "Post not found" };
  }

  const postId = postData.id; // This is the UUID of the post

  // Insert the reply with the correct post ID (UUID)
  const { error } = await supabase.from("comments").insert({
    content: validatedData.content,
    post_id: postId,
    user_id: user.id,
    parent_id: validatedData.parentId,
  });

  if (error) {
    console.error("Error inserting reply:", error);
    return { status: "error", message: "Failed to post reply" };
  }

  revalidatePath(`/post/${validatedData.postSlug}`);

  return { status: "success" };
};
