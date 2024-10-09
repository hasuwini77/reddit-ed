import Image from "next/image";
import { PostProps } from "../../types";
export function FeedPost({ title, image, content }: PostProps) {
  return (
    <div>
      <div>
        <h1>{title}</h1>
        <p>{content} </p>
      </div>
      <div>
        <Image src={image} alt={title} height={150} width={200} />
      </div>
    </div>
  );
}
