// app/page.tsx or pages/index.tsx
import MainContent from "@/components/MainContent";
import { createClient } from "../../supabase/client";
import { PostProps } from "../../types";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select("*");
  console.log({ data, error });

  if (error) {
    console.error("Error fetching posts on the server:", error);
    return <div>Error loading posts.</div>;
  }

  const posts: PostProps[] = data || [];

  return <MainContent posts={posts} />;
}
