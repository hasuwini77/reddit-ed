"use server";

import { z } from "zod";
import { createClient } from "../../utils/supabase/server";
import { signUpSchema } from "./schemas";

export const signUp = async (data: z.infer<typeof signUpSchema>) => {
  // Validate data using Zod schema
  const result = signUpSchema.safeParse(data);

  if (!result.success) {
    // If validation fails, return the error messages
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
    // Insert the new user into the users table
    const { error: insertError } = await supabase.from("users").insert({
      email: user.email,
      username: validatedData.username,
      avatar: validatedData.avatar,
      // id is not included as it's likely auto-generated
    });

    if (insertError) {
      return { error: "Failed to create user profile" };
    }

    return { success: true, user };
  }

  return { error: "Failed to create user" };
};
