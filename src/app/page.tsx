import HomeFeed from "@/components/HomeFeed";
import { getHomePosts, HomePostsType } from "../../utils/supabase/queries";
import { createClient } from "../../utils/supabase/server";
createClient;

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await getHomePosts(supabase);

  if (error) {
    console.error("Error fetching posts:", error.message);
    return <div>Error loading posts.</div>;
  }

  const posts: HomePostsType = data || [];

  return <HomeFeed initialPosts={posts} />;
}
