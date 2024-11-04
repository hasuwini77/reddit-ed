import Image from "next/image";
import { HomePostsType } from "../../utils/supabase/queries";
import Link from "next/link";

type SinglePostType = Omit<HomePostsType[number], "id">;

export function FeedPost({ title, slug, content, users }: SinglePostType) {
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
      <div>
        {slug && <Image src={""} alt={title} height={150} width={200} />}
      </div>
    </Link>
  );
}
