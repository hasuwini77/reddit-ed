import MainContent from "@/components/MainContent";
import { createClient } from "../../supabase/client";
import { Database } from "../../utils/supabase/database.types";
import { PostProps } from "../../types";

// Define the type for the fetched posts
type SupabasePost = Database["public"]["Tables"]["posts"]["Row"] & {
  users?: { email: string | null }; // Adding users relationship if needed
};

export default async function Home() {
  const supabase = createClient();

  // Fetch posts with related user email
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, content, user_id, users(email)")
    .order("created_at", { ascending: false });

  console.log({ data, error });

  if (error) {
    console.error("Error fetching posts on the server:", error);
    return <div>Error loading posts.</div>;
  }

  // Type assertion for the fetched data
  const posts: PostProps[] = (data as SupabasePost[]).map((post) => ({
    id: parseInt(post.id), // Convert to number if needed
    title: post.title,
    image: post.slug,
    content: post.content || "",
    comments: post.users?.email || "",
  }));

  return <MainContent posts={posts} />;
}
