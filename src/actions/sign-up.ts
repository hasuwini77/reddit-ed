"use server";

import { z } from "zod";
import { createClient } from "../../utils/supabase/server";
import { signUpSchema } from "./schemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const signUp = async (data: z.infer<typeof signUpSchema>) => {
  const result = signUpSchema.safeParse(data);

  if (!result.success) {
    return { error: result.error.flatten().fieldErrors };
  }

  const validatedData = result.data;

  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.signUp({
    email: validatedData.email,
    password: validatedData.password,
  });

  if (authError) {
    return { error: authError.message };
  }

  if (user && user.email) {
    const { error: insertError } = await supabase.from("users").insert({
      email: user.email,
      username: validatedData.username,
      avatar: validatedData.avatar,
    });

    if (insertError) {
      return { error: "Failed to create user profile" };
    }

    cookies().set("auth_changed", "true", { maxAge: 5, path: "/" });
    revalidatePath("/");
    redirect("/");
  }

  return { error: "Failed to create user" };
};
