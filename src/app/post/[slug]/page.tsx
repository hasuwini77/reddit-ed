import { createClient } from "../../../../utils/supabase/server";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select('title, content, users("email")')
    .eq("slug", params.slug)
    .single();

  console.log(data);

  if (!data || error) notFound();

  return (
    <main className="main">
      <span className="mb-1 text-zinc-600">
        {data.users?.email || "anonymous"}
      </span>
      <h1 className="mb-4 text-2xl font-bold">{data.title}</h1>
      <p>{data.content}</p>
    </main>
  );
}
