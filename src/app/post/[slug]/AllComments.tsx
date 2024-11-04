"use client";

import { deleteComment } from "@/actions/delete-comment";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useState } from "react";

type Comment = {
  id: string;
  content: string;
  created_at: string;
  users: {
    id: string;
    username: string;
    avatar: string | null | undefined;
  };
};

type AllCommentsProps = {
  comments: Comment[];
  currentUserId: string | undefined;
  postSlug: string;
};

export default function AllComments({
  comments,
  currentUserId,
  postSlug,
}: AllCommentsProps) {
  const router = useRouter();
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );

  const { mutate, isPending } = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId, postSlug),
    onMutate: (commentId) => {
      setDeletingCommentId(commentId);
    },
    onError: (error: Error) => {
      if (error.message === "You are not the author of this comment") {
        toast.error("You can only delete your own comments.");
      } else if (error.message === "Authentication error") {
        toast.error("You must be logged in to delete a comment.");
        router.push("/auth/log-in");
      } else {
        toast.error("Failed to delete comment. Please try again.");
      }
      setDeletingCommentId(null);
    },
    onSuccess: () => {
      toast.success("Comment deleted successfully", { richColors: true });
      router.refresh();
      setDeletingCommentId(null);
    },
  });

  const handleEditComment = (commentId: string) => {
    // Implement edit logic here
    console.log("Edit comment:", commentId);
  };

  const handleDeleteComment = (commentId: string) => {
    mutate(commentId);
  };

  return (
    <div className="mt-8 space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            {comment.users.avatar ? (
              <Image
                src={comment.users.avatar}
                alt={`${comment.users.username}'s avatar`}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
            )}
            <span className="font-semibold text-black">
              {comment.users.username || "Anonymous"}
            </span>
          </div>
          <p className="text-gray-700">{comment.content}</p>
          <span className="text-sm text-gray-500 mt-2 block">
            {new Date(comment.created_at).toLocaleString()}
          </span>
          {comment.users.id === currentUserId && (
            <div className="mt-2">
              <Button
                onClick={() => handleEditComment(comment.id)}
                variant="secondary"
                className="bg-blue-600 hover:bg-blue-900 mr-2 text-xs"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteComment(comment.id)}
                variant="secondary"
                className="bg-red-600 hover:bg-red-900 space-x-2 text-xs"
                disabled={deletingCommentId === comment.id}
              >
                {deletingCommentId === comment.id && isPending ? (
                  <>
                    <Loader2 className="mr-2 h-2 w-2 animate-spin text-xs" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
