import { HomePostsType } from "../../utils/supabase/queries";
import { FeedPost } from "./FeedPost";

interface HomeFeedProps {
  initialPosts: HomePostsType;
}

export default function HomeFeed({ initialPosts }: HomeFeedProps) {
  if (!initialPosts || initialPosts.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div className="space-y-4">
      {initialPosts.map((post) => (
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
