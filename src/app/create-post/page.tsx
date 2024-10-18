"use client";

import PostForm from "@/components/PostForm";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter();

  const handlePostSubmit = (postData: {
    title: string;
    image: string;
    content: string;
  }) => {
    // Handle post submission logic here
    console.log(postData);
    router.push("/feed");
  };

  return <PostForm onSubmit={handlePostSubmit} />;
}
