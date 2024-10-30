"use server";

import { z } from "zod";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import { logInSchema } from "./schemas";

export const logIn = async (data: z.infer<typeof logInSchema>) => {
  const supabase = createClient();

  const parsedData = logInSchema.parse(data);

  const { error } = await supabase.auth.signInWithPassword(parsedData);

  if (error) {
    throw error;
  }

  redirect("/");
};
