"use server";

import { z } from "zod";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import { logInSchema } from "./schemas";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const logIn = async (data: z.infer<typeof logInSchema>) => {
  const supabase = createClient();

  const parsedData = logInSchema.parse(data);

  const { error } = await supabase.auth.signInWithPassword(parsedData);

  if (error) {
    throw error;
  }

  cookies().set("auth_changed", "true", { maxAge: 5, path: "/" });
  revalidatePath("/");
  redirect("/");
};
