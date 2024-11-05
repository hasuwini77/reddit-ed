"use client";

import { deleteComment } from "@/actions/delete-comment";
import { editComment } from "@/actions/edit-comment";
import { commentSchema } from "@/actions/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

interface EditCommentFormData {
  content: string;
}

export default function AllComments({
  comments,
  currentUserId,
  postSlug,
}: AllCommentsProps) {
  const router = useRouter();
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null
  );
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<EditCommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const deleteMutation = useMutation({
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

  const editMutation = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: string;
      content: string;
    }) => editComment(commentId, postSlug, { content }),
    onSuccess: () => {
      toast.success("Comment edited successfully");
      setEditingCommentId(null);
      reset();
      router.refresh();
    },
    onError: (error) => {
      toast.error("Failed to edit comment");
      console.error(error);
    },
  });

  const handleDeleteComment = (commentId: string) => {
    deleteMutation.mutate(commentId);
  };

  const onSubmitEdit: SubmitHandler<z.infer<typeof commentSchema>> = (data) => {
    if (editingCommentId) {
      editMutation.mutate({
        commentId: editingCommentId,
        content: data.content,
      });
    }
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

          {editingCommentId === comment.id ? (
            <form onSubmit={handleSubmit(onSubmitEdit)} className="mt-2">
              <Input
                {...register("content")}
                defaultValue={comment.content}
                className="w-full p-2 border rounded"
              />
              <div className="mt-2 space-x-2 flex">
                <Button
                  type="submit"
                  disabled={editMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                >
                  {editMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
                <Button
                  type="button"
                  onClick={() => setEditingCommentId(null)}
                  className="bg-gray-300 hover:bg-gray-400 text-black text-xs"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </form>
          ) : (
            <p className="text-gray-700">{comment.content}</p>
          )}

          <span className="text-sm text-gray-500 mt-2 block">
            {new Date(comment.created_at).toLocaleString()}
          </span>

          {comment.users.id === currentUserId && (
            <div className="mt-2">
              {editingCommentId !== comment.id && (
                <Button
                  onClick={() => setEditingCommentId(comment.id)}
                  variant="secondary"
                  className="bg-blue-600 hover:bg-blue-900 mr-2 text-xs"
                >
                  Edit
                </Button>
              )}
              <Button
                onClick={() => handleDeleteComment(comment.id)}
                variant="secondary"
                className="bg-red-600 hover:bg-red-900 space-x-2 text-xs"
                disabled={
                  deletingCommentId === comment.id || deleteMutation.isPending
                }
              >
                {deletingCommentId === comment.id &&
                deleteMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
