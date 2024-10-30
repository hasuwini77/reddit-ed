import Image from "next/image";
import { PostProps } from "../../types/types";

export function DetailedPost({ title, image, content, comments }: PostProps) {
  return (
    <div>
      <p>{title}</p>
      <Image src={image} alt={title} height={150} width={200} />
      <p>{content}</p>
      <p>{comments}</p>
    </div>
  );
}
