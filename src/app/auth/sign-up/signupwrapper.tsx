// app/auth/sign-up/SignUpWrapper.tsx
import { createClient } from "../../../../utils/supabase/server";
import { redirect } from "next/navigation";
import SignUpForm from "./signupform";

export default async function SignUpWrapper() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return <SignUpForm />;
}
