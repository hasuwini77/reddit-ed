"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "./button";
import { deletePost } from "@/actions/delete-post";
import { toast } from "sonner";

export const DeletePostButton = ({ postId }: { postId: string }) => {
  const { mutate } = useMutation({
    mutationFn: () => deletePost(postId),
    onError: (error) => toast.error(error.message),
    onSuccess: () =>
      toast.success("Post deleted successfully", { richColors: true }),
    onMutate: () => toast.loading("Deleting post..."),
    onSettled: () => toast.dismiss(),
  });

  return (
    <Button
      className="text-sm md:text-base bg-red-500 hover:bg-red-700 w-30 h-10  px-4 py-2 rounded-md"
      variant="secondary"
      onClick={() => mutate()}
    >
      Delete
    </Button>
  );
};
