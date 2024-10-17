import { createClient } from "./client";

export const getHomePosts = () => { 
    const supabase = createClient();
    return supabase
      .from("posts")
      .select("id, title, slug, content, user_id, users(email)")
      .order("created_at", { ascending: false });
  
}