"use server";

import { z } from "zod";
import { userProfileSchema } from "./schemas";
import { createClient } from "../../utils/supabase/server";
import { revalidatePath } from "next/cache";

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

  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .single();

  if (!existingUser) {
    throw new Error("User not found");
  }

  const isUser = user.id === existingUser.id;

  if (!isUser) {
    throw new Error("Unauthorized");
  }

  const { data: updatedUser, error } = await supabase
    .from("users")
    .update({
      email: parsedData.email,
      username: parsedData.username,
      avatar: parsedData.avatar,
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }

  if (!updatedUser) {
    throw new Error("Failed to update user");
  }

  revalidatePath("/profile");
  return { success: true, user: updatedUser };
};
