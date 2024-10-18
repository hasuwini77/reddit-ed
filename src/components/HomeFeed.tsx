import { FeedPost } from "./FeedPost";
import { type HomePostsType } from "../../utils/supabase/queries";

interface HomeFeedProps {
  posts: HomePostsType;
}

export default function HomeFeed({ posts }: HomeFeedProps) {
  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <FeedPost
          key={post.id}
          title={post.title}
          content={post.content}
          users={post.users}
          user_id={post.user_id}
          slug={post.slug}
          id={post.id}
        />
      ))}
    </div>
  );
}
