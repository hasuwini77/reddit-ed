import Image from "next/image";
import { HomePostsType } from "../../utils/supabase/queries";
import Link from "next/link";

interface FeedPostProps {
  title: string;
  content: string | null;
  slug: string;
  image?: string | null;
  user_id: string | null;
  users?: { username: string } | null;
}

export function FeedPost({
  title,
  slug,
  content,
  image,
  users,
}: FeedPostProps) {
  return (
    <Link href={`/post/${slug}`} className="blockrounded-lg p-4">
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-gray-600 mt-2">{content?.substring(0, 150)}...</p>
        {users && (
          <p className="text-sm text-gray-500 mt-2">
            Posted by {users.username}
          </p>
        )}
      </div>
      {image && (
        <div className="mb-4 w-full max-w-md">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <Image
              src={image}
              alt={title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </Link>
  );
}
