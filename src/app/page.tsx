import { getHomePosts, HomePostsType } from "../../utils/supabase/queries";
import { createClient } from "../../utils/supabase/server";
import { FeedPost } from "@/components/FeedPost";

export const revalidate = 60 * 15; // 15 minutes

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await getHomePosts(supabase);

  if (error) {
    console.error("Error fetching posts:", error.message);
    return <div>Error loading posts.</div>;
  }

  const posts: HomePostsType = data || [];

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <FeedPost
          key={post.id}
          title={post.title}
          content={post.content}
          users={post.users}
          user_id={post.user_id}
          slug={post.slug}
        />
      ))}
    </div>
  );
}
