"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "./button";
import { deletePost } from "@/actions/delete-post";

export const DeletePostButton = ({ postId }: { postId: string }) => {
  const { mutate } = useMutation({ mutationFn: () => deletePost(postId) });
  return (
    <div className="py-3 p-2">
      <Button variant={"secondary"} onClick={() => mutate()}>
        Delete
      </Button>
    </div>
  );
};
