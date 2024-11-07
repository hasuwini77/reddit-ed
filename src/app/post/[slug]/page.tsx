import { DeletePostButton } from "@/components/ui/delete-post-button";
import { createClient } from "../../../../utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CommentArea } from "@/components/CommentArea";
import { PostType, Comment } from "../../../../types/types";
import AllComments from "./AllComments";
import Image from "next/image";

// Helper function to structure comments
function structureComments(flatComments: Comment[]): Comment[] {
  const commentMap = new Map();
  const rootComments: Comment[] = []; // for my "parent" comment

  flatComments.forEach((comment) => {
    comment.replies = [];
    commentMap.set(comment.id, comment);

    if (comment.parent_id) {
      const parent = commentMap.get(comment.parent_id);
      if (parent) {
        parent.replies.push(comment);
      }
    } else {
      rootComments.push(comment);
    }
  });

  return rootComments;
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();

  // Fetch the post details
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("id, title, content, user_id, image, users(username)")
    .eq("slug", params.slug)
    .single();

  const post = postData as PostType | null;

  if (!post || postError) {
    notFound();
  }

  // Fetch comments with user data using a join
  const { data: commentsData, error: commentsError } = await supabase
    .from("comments")
    .select(
      `
      id,
      post_id,
      content,
      created_at,
      parent_id,
      users:user_id (
        id,
        username,
        email,
        avatar
      )
    `
    )
    .eq("post_id", post.id)
    .order("created_at", { ascending: true });

  if (commentsError) {
    console.error("Error fetching comments:", commentsError);
  }

  // Map comments to ensure they conform to Comment type
  const flatComments: Comment[] =
    commentsData?.map((comment: any) => ({
      id: comment.id,
      content: comment.content,
      created_at: comment.created_at,
      parent_id: comment.parent_id,
      users: {
        id: comment.users.id,
        username: comment.users.username,
        avatar: comment.users.avatar ?? null,
      },
    })) || [];

  // Structure comments into a nested format
  const structuredComments = structureComments(flatComments);

  const { data: authData } = await supabase.auth.getUser();
  const user = authData?.user;

  const isAuthor = user?.id === post.user_id;

  return (
    <main className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
      <div className="max-w-2xl mx-auto">
        <span className="mb-2 block text-sm text-gray-500">
          {post.users?.username || "Anonymous"}
        </span>

        <h1 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
          {post.title}
        </h1>

        {post.image && (
          <div className="mb-4 w-full max-w-md p-3 rounded-lg shadow-sm">
            <Image
              src={post.image}
              width={600}
              height={200}
              alt={post.title}
              className="rounded-lg shadow-md object-cover w-full h-[300px]"
              priority
            />
          </div>
        )}

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

      <div className="max-w-2xl mx-auto mt-12">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="mt-8 space-y-6">
          {structuredComments.length > 0 ? (
            <AllComments
              comments={structuredComments}
              currentUserId={user?.id}
              postSlug={params.slug}
            />
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
        <CommentArea postId={post.id} postSlug={params.slug} />
      </div>
    </main>
  );
}
