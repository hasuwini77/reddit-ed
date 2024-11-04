"use server";

import { createClient } from "../../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { createCommentSchema } from "@/actions/schemas";
import { z } from "zod";
import { redirect } from "next/dist/server/api-utils";

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
  if (userError || !user) {
    return { status: "unauthenticated" };
  }

  // Insert the comment
  const { error } = await supabase.from("comments").insert({
    content: validatedData.content,
    post_id: validatedData.postId,
    user_id: user?.id,
  });

  if (error) {
    console.error("Error inserting comment:", error);
    return { status: "error", message: "Failed to post comment" };
  }
  revalidatePath(`/post/${validatedData.postSlug}`);

  return { status: "success" };
};
