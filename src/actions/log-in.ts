"use server";

import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
import { logInSchema } from "./schemas";

export const logIn = async (formaData: FormData) => {
  const supabase = createClient();

  const data = {
    email: formaData.get("email"),
    password: formaData.get("password"),
  };

  const parsedData = logInSchema.parse(data);

  const { error } = await supabase.auth.signInWithPassword(parsedData);

  if (error) {
    throw error;
  }

  redirect("/");
};
