"use server";

import { z } from "zod";
import { userProfileSchema } from "./schemas";
import { createClient } from "../../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const editProfile = async ({
  userId,
  userData,
}: {
  userId: string;
  userData: z.infer<typeof userProfileSchema>;
}) => {
  const parsedData = userProfileSchema.parse(userData);
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .single();

  if (!data) {
    throw new Error("User not found");
  }

  const isUser = user.id === data.id;

  if (!isUser) {
    throw new Error("Unauthorized");
  }

  const { data: newData } = await supabase
    .from("users")
    .update({
      email: parsedData.email,
      username: parsedData.username,
      avatar: parsedData.avatar,
    })
    .eq("id", userId)
    .single()
    .throwOnError();

  if (!newData) {
    throw new Error("Failed to update user");
  }

  revalidatePath("/profile");
  redirect(`/profile`);
};
