"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const logOut = () => {
  const supabase = createClient();
  supabase.auth.signOut();

  cookies().set("auth_changed", "true", { maxAge: 5, path: "/" });
  revalidatePath("/");
  redirect("/");
};
