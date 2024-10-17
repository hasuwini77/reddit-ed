import MainContent from "@/components/MainContent";
import { createClient } from "../../utils/supabase/client";
import { Database } from "../../utils/supabase/database.types";
import { PostProps } from "../../types";
import { getHomePosts } from "../../utils/supabase/queries";

// Define the type for the fetched posts
type SupabasePost = Database["public"]["Tables"]["posts"]["Row"] & {
  users?: { email: string | null }; // Adding users relationship if needed
};

export default async function Home() {
  const { data, error } = await getHomePosts();

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
