"use server";

import { createClient } from "../../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { createReplySchema } from "@/actions/schemas";
import { z } from "zod";

export const createReply = async (input: z.infer<typeof createReplySchema>) => {
  const supabase = createClient();

  // Validate the input data
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

  // Insert the reply
  const { error } = await supabase.from("comments").insert({
    content: validatedData.content,
    post_id: validatedData.postId,
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
