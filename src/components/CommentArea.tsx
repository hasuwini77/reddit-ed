"use client";

import { useState } from "react";
import { commentSchema } from "@/actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createComment } from "@/actions/create-comment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CommentFormData = z.infer<typeof commentSchema>;

export function CommentArea({
  postId,
  postSlug,
}: {
  postId: string;
  postSlug: string;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: CommentFormData) => {
    setIsSubmitting(true);
    try {
      const result = await createComment({
        content: data.content,
        postId,
        postSlug,
      });

      if (result.status === "unauthenticated") {
        toast.error("You must be logged in to post a comment.");
        router.push("/auth/log-in");
      } else if (result.status === "error") {
        toast.error(
          result.message || "Failed to post comment. Please try again."
        );
      } else if (result.status === "success") {
        toast.success("Comment posted successfully!");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      reset();
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="comment-area bg-white rounded-lg shadow-md p-4 mt-4">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center">
          <textarea
            {...register("content")}
            className="comment-textarea w-full text-black md:w-3/4 lg:w-2/3 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[100px]"
            placeholder="Add a comment..."
          />
        </div>
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content.message}</p>
        )}
        <div className="flex justify-end mt-3 space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg transition duration-150 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="comment-button px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-150 ease-in-out disabled:opacity-50"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
