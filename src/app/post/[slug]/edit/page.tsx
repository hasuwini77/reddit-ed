import { createClient } from "../../../../../utils/supabase/server";
import { EditPostForm } from "./form";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  const { data: post, error } = await supabase
    .from("posts")
    .select("id, user_id, title, content")
    .eq("slug", params.slug)
    .single();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthor = user?.id === post?.user_id;

  if (error || !post) {
    notFound();
  }
  return (
    <main>
      <h1>Edit Post</h1>
      <EditPostForm
        defaultValues={{ title: post.title, content: post.content }}
        postId={post.id}
      />
    </main>
  );
}
