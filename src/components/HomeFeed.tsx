"use client";
import { useQuery } from "@tanstack/react-query";
import { getHomePosts, HomePostsType } from "../../utils/supabase/queries";
import { FeedPost } from "./FeedPost";

interface HomeFeedProps {
  initialPosts: HomePostsType;
}

export default function HomeFeed({ initialPosts }: HomeFeedProps) {
  const { data: posts } = useQuery<HomePostsType>({
    queryKey: ["home-posts"],
    queryFn: async () => {
      const { data, error } = await getHomePosts();
      if (error) throw error;
      return data;
    },
    initialData: initialPosts,
    refetchOnMount: false,
    staleTime: 10000,
    refetchOnWindowFocus: true,
  });

  if (!initialPosts || initialPosts.length === 0) {
    throw new Error("No initial posts available");
  }

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
