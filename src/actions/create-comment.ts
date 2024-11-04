"use server";

import { createClient } from "../../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { commentSchema, createCommentSchema } from "@/actions/schemas";
import { z } from "zod";

export const createComment = async (
  input: z.infer<typeof createCommentSchema>
) => {
  const supabase = createClient();

  // Validate the input data
  const validatedData = createCommentSchema.parse(input);

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw new Error("Not authenticated");

  // Insert the comment
  const { error } = await supabase.from("comments").insert({
    content: validatedData.content,
    post_id: validatedData.postId,
    user_id: user?.id,
  });

  if (error) {
    console.error("Error inserting comment:", error);
    throw error;
  }
  revalidatePath(`/post/${validatedData.postSlug}`);
};
