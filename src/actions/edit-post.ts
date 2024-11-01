"use server";

import { z } from "zod";
import { postSchema } from "./schemas";
import { createClient } from "../../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const editPost = async ({
  postId,
  data,
}: {
  postId: string;
  data: z.infer<typeof postSchema>;
}) => {
  const parsedData = postSchema.parse(data);
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data: post } = await supabase
    .from("posts")
    .select("user_id")
    .eq("id", postId)
    .single();

  if (!post) {
    throw new Error("Post not found");
  }

  const isAuthor = user.id === post.user_id;

  if (!isAuthor) {
    throw new Error("Unauthorized");
  }

  const { data: updatedPost } = await supabase
    .from("posts")
    .update({
      title: parsedData.title,
      content: parsedData.content,
    })
    .eq("id", postId)
    .select("slug")
    .single()
    .throwOnError();

  if (!updatedPost) {
    throw new Error("Failed to update post");
  }

  revalidatePath("/");
  redirect(`/post/${updatedPost.slug}`);
};
