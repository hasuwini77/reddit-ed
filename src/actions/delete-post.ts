"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";
import { revalidatePath } from "next/cache";

export const deletePost = async (postId: string) => {
  const supabase = createClient();
  await supabase.from("posts").delete().eq("id", postId).throwOnError();

  revalidatePath("/");
  redirect("/");
};
