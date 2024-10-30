import { DeletePostButton } from "@/components/ui/delete-post-button";
import { createClient } from "../../../../utils/supabase/server";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select('id, title, content, user_id, users("email")')
    .eq("slug", params.slug)
    .single();

  if (!post || error) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthor = user?.id === post.user_id;

  console.log("Logged in user:", user);
  console.log("Post author user_id:", post.user_id);
  console.log("Is author:", isAuthor);

  return (
    <main className="main">
      <span className="mb-1 text-zinc-600">
        {post.users?.email || "anonymous"}
      </span>
      <h1 className="mb-4 text-2xl font-bold">{post.title}</h1>
      <p>{post.content}</p>
      {isAuthor && <DeletePostButton postId={post.id} />}
    </main>
  );
}
