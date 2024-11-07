"use client";

import { createPost, CreatePostResponse } from "@/actions/create-post";
import { postSchema } from "@/actions/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { Loader2 } from "lucide-react";

const isOnlyWhitespace = (str: string | undefined) =>
  !str || str.trim().length === 0;

const createPostSchema = postSchema.omit({ image: true }).extend({
  image: z.instanceof(File).optional(),
});

export default function CreatePostPage() {
  const router = useRouter();
  const { register, handleSubmit, setValue } = useForm<
    z.infer<typeof createPostSchema>
  >({
    resolver: zodResolver(createPostSchema),
    mode: "onBlur",
  });

  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setValue("image", file);
        setFileName(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const onSubmit = handleSubmit((values) => {
    if (isOnlyWhitespace(values.title) || isOnlyWhitespace(values.content)) {
      toast.error("Title and content cannot be empty or only whitespace");
      return;
    }

    setIsSubmitting(true);
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("title", values.title?.trim() || "");
        formData.append("content", values.content?.trim() || "");
        if (values.image && values.image instanceof File) {
          formData.append("image", values.image);
        }

        const response: CreatePostResponse = await createPost(formData);
        if (!response.success) {
          // Throw an error with the specific message if title already exists
          throw new Error(response.error);
        }

        toast.success("Post created successfully!");
        // Reset form and preview
        setPreviewImage(null);
        setFileName(null);
        //redirect user to homepage
        router.push("/");
        // Handle successful post creation
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Title already exists") {
            toast.error(
              "Title already exists, please choose a different title"
            );
          } else {
            toast.error(`Failed to create post: ${error.message}`);
          }
        } else {
          toast.error("Failed to create post: An unknown error occurred");
        }
      } finally {
        setIsSubmitting(false);
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

        <div>
          <label className="block text-gray-700 dark:text-gray-200">
            Upload Image
          </label>
          <div
            {...getRootProps()}
            className={`mt-1 p-6 border-2 border-dashed rounded-lg ${
              isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            } cursor-pointer`}
          >
            <input {...getInputProps()} />
            {previewImage ? (
              <div className="flex flex-col items-center">
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="object-cover"
                />
                <p className="mt-2 text-sm text-gray-500">{fileName}</p>
              </div>
            ) : isDragActive ? (
              <p className="text-blue-500">Drop the image here ...</p>
            ) : (
              <p className="text-gray-500">
                Drag 'n' drop an image here, or click to select a file
              </p>
            )}
          </div>
        </div>

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
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="flex justify-center items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </div>
              </>
            ) : (
              "Create Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
