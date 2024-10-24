"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create the postData object
    const postData = {
      title,
      image,
      content,
    };

    console.log(postData);

    // After submitting, redirect to the feed page
    router.push("/feed");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
        Create a New Post
      </h2>
      <form onSubmit={handlePostSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-200">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter the post title"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200">
            Image URL
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter the image URL"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-200">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
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
          >
            Submit Post
          </button>
        </div>
      </form>
    </div>
  );
}
