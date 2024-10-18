import HomeFeed from "@/components/HomeFeed";
import { HomePostsType } from "../../../utils/supabase/queries";
import { createClient } from "../../../utils/supabase/client";

export default async function FeedPage() {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    console.error("Error fetching posts:", error);
    return <div>Error loading posts.</div>;
  }

  const posts: HomePostsType = data || [];

  return <HomeFeed posts={posts} />;
}
