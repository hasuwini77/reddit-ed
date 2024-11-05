import { createClient } from "../../../utils/supabase/server";
import { redirect } from "next/navigation";
import ProfilePage from "./profile";

export default async function ProfilePageWrapper() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/log-in?message=Please log in to view your profile");
  }

  // Fetch additional user data from your database if needed
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id, email, username, avatar")
    .eq("id", user.id)
    .single();

  if (userError || !userData) {
    console.error("Error fetching user data:", userError);
    redirect("/auth/log-in?message=Error fetching user data");
  }

  return <ProfilePage user={userData} />;
}
