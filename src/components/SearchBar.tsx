"use client";
import { useQuery } from "@tanstack/react-query";
import { getPostByQuery } from "../../utils/supabase/queries";
import { SearchIcon } from "./SearchIcon";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const searchResultClasses =
  "absolute left-0 right-0 z-10 mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto";
const searchResultItemClasses =
  "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900";

export const SearchBar = () => {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const { data, error } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => {
      const { data, error } = await getPostByQuery(query);
      if (error) throw error;
      return data;
    },
    enabled: query.length >= 2,
  });

  useEffect(() => {
    setQuery("");
  }, [pathname]);

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="search"
        placeholder="Search Reddit..."
        value={query}
        className="w-full h-12 rounded-full bg-gray-700 text-white placeholder-gray-400 border border-gray-200 focus:border-yellow-300 focus:ring focus:ring-yellow-100 focus:ring-opacity-10 focus:outline-none transition duration-300 ease-in-out pl-10 pr-4"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <SearchIcon
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
      {data && (
        <div className={searchResultClasses}>
          {data.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-700">
              No posts found with that title
            </div>
          ) : (
            data.map((post) => (
              <Link
                key={post.id}
                href={`/post/${post.slug}`}
                className={searchResultItemClasses}
              >
                {post.title}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};
