import HomeFeed from "@/components/HomeFeed";
import { getHomePosts, HomePostsType } from "../../../utils/supabase/queries";

export default async function FeedPage() {
  const { data, error } = await getHomePosts();

  if (error) {
    console.error("Error fetching posts:", error);
    return <div>Error loading posts.</div>;
  }

  const posts: HomePostsType = data || [];

  return <HomeFeed initialPosts={posts} />;
}
