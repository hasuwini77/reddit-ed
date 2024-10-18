// page.tsx
import MainContent from "@/components/MainContent";
import { getHomePosts, type HomePostsType } from "../../utils/supabase/queries";

export default async function Home() {
  const { data, error } = await getHomePosts();

  // Use a type assertion to let TypeScript know the expected shape
  const posts: HomePostsType = data || [];

  return (
    <>
      {error || !posts || posts.length === 0 ? (
        <div> no post found! </div>
      ) : (
        <MainContent posts={posts} showPostForm={false} selectedPage={"feed"} /> // Pass the asserted posts
      )}
    </>
  );
}
