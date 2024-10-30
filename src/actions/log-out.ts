"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";

export const logOut = () => {
  const supabase = createClient();
  supabase.auth.signOut();

  redirect("/");
};
