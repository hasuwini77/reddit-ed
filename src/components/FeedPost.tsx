import Image from "next/image";
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
        <p className="text-gray-600 mt-2 max-w-[500px]">
          {content?.substring(0, 150)}...
        </p>
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
              fill
              style={{
                objectFit: "cover",
                borderRadius: "0.5rem",
              }}
              className="rounded-lg"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </div>
      )}
    </Link>
  );
}
