import { createClient } from "../../utils/supabase/client";
import { FeedPost } from "./FeedPost";
import { PostProps } from "../../types";

interface HomeFeedProps {
  posts: PostProps[];
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
          image={""}
          content={post.content}
          comments={post.comments}
          id={0}
        />
      ))}
    </div>
  );
}
