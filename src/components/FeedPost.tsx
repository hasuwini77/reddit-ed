import Image from "next/image";
import { HomePostsType } from "../../utils/supabase/queries";

type SinglePostType = HomePostsType[number];

export function FeedPost({ title, slug, content, users }: SinglePostType) {
  return (
    <div>
      <div>
        <h1>{title}</h1>
        <p>{content || "No content available"}</p>
        {users && <p>Posted by: {users.email}</p>}
      </div>
      <div>
        {slug && <Image src={""} alt={title} height={150} width={200} />}
      </div>
    </div>
  );
}
