import { createClient } from "../../supabase/client";
import { FeedPost } from "./FeedPost";

export default async function HomeFeed() {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select("*");
  console.log({ data, error });

  return (
    <div>
      <FeedPost
        title="test1"
        image="test2.jpg"
        content="betapost1"
        comments={""}
      />
    </div>
  );
}
