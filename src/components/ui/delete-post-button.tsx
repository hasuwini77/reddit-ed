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
    <div className="py-3 p-2">
      <Button variant={"secondary"} onClick={() => mutate()}>
        Delete
      </Button>
    </div>
  );
};
