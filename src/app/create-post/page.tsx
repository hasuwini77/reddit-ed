"use client";

import { createPost } from "@/actions/create-post";
import { postSchema } from "@/actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";
import { toast } from "sonner";

export default function CreatePostPage() {
  const { register, handleSubmit } = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    mode: "onBlur",
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      try {
        await createPost(values);
        toast.success("Post created successfully!");
        // Handle successful post creation
      } catch (error) {
        toast.error("Failed to create post. Please try again.");
        // Handle error
      }
    });
  });

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Create a New Post
      </h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-gray-700 dark:text-gray-200">
            Title
          </label>
          <input
            {...register("title")}
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter the post title"
            required
          />
        </div>

        {/* <div>
          <label className="block text-gray-700 dark:text-gray-200">
            Image URL
          </label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter the image URL"
          />
        </div> */}

        <div>
          <label className="block text-gray-700 dark:text-gray-200">
            Content
          </label>
          <textarea
            {...register("content")}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Write your content here..."
            rows={4}
            required
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
