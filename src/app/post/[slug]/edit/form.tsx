"use client";

import { editPost } from "@/actions/edit-post";
import { postSchema } from "@/actions/schemas";
import { Input } from "@/components/ui/input";
import Textarea from "@/components/ui/text-area";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Tables } from "../../../../../utils/supabase/database.types";

export const EditPostForm = ({
  defaultValues,
  postId,
}: {
  defaultValues: Pick<Tables<"posts">, "title" | "content">;
  postId: string;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: editPost,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Post updated successfully");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: defaultValues.title,
      content: defaultValues.content || undefined,
    },
  });

  const onSubmit = handleSubmit((data) => mutate({ data, postId }));

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="block text-gray-700 dark:text-gray-200">Title</label>
        <Input
          {...register("title")}
          error={errors.title?.message}
          placeholder="Enter the post title"
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200">
          Content
        </label>
        <Textarea
          {...register("content")}
          error={errors.content?.message}
          placeholder="Write your content here..."
          rows={4}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update Post"}
        </button>
      </div>
    </form>
  );
};
