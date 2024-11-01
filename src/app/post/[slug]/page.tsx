import { DeletePostButton } from "@/components/ui/delete-post-button";
import { createClient } from "../../../../utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select("id, title, content, user_id, users(email)")
    .eq("slug", params.slug)
    .single();

  if (!post || error) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthor = user?.id === post.user_id;

  return (
    <main className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
      <div className="max-w-2xl mx-auto">
        <span className="mb-2 block text-sm text-gray-500">
          {post.users?.email || "anonymous"}
        </span>
        <h1 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
          {post.title}
        </h1>
        <p className="mb-8 text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
          {post.content}
        </p>
        {isAuthor && (
          <div className="flex flex-wrap gap-4">
            <Button
              as={Link}
              variant="secondary"
              href={`/post/${params.slug}/edit`}
              className="text-sm md:text-base w-30 h-10 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit
            </Button>
            <DeletePostButton postId={post.id} />
          </div>
        )}
      </div>
    </main>
  );
}
