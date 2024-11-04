"use client";

import { useState } from "react";
import { commentSchema } from "@/actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { postComment } from "@/actions/create-comment";

export const CommentArea = ({ postId }: { postId: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: z.infer<typeof commentSchema>) => {
    console.log("Form submitted", { ...data, postId });
    setIsSubmitting(true);
    try {
      await postComment({ content: data.content, postId });
      reset();
    } catch (error) {
      console.error("Failed to post comment:", error);
    } finally {
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
};
