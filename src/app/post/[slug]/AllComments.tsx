"use client";

import Image from "next/image";

type Comment = {
  id: string;
  content: string;
  created_at: string;
  users: {
    username: string;
    avatar: string | null | undefined;
  };
};

type AllCommentsProps = {
  comments: Comment[];
};

export default function AllComments({ comments }: AllCommentsProps) {
  return (
    <div className="mt-8 space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center mb-2">
            {comment.users.avatar ? (
              <Image
                src={comment.users.avatar}
                alt={`${comment.users.username}'s avatar`}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
            ) : (
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
            )}
            <span className="font-semibold">
              {comment.users.username || "Anonymous"}
            </span>
          </div>
          <p className="text-gray-700">{comment.content}</p>
          <span className="text-sm text-gray-500 mt-2 block">
            {new Date(comment.created_at).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
