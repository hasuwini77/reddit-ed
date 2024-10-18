"use client";
import { useState } from "react";
import { MySidebar } from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import MyNavbar from "@/components/Navbar";
import { HomePostsType } from "../../utils/supabase/queries";

interface MainContentProps {
  posts: HomePostsType;
  showPostForm: boolean;
  selectedPage: string;
}

export default function MainContent({ posts }: MainContentProps) {
  const [showPostForm, setShowPostForm] = useState(false);
  const [pageSelected, setPageSelected] = useState("feed");

  const handleCreatePostClick = () => {
    setShowPostForm(true);
  };

  const handlePostSubmit = (postData: {
    title: string;
    image: string;
    content: string;
  }) => {
    console.log(postData);
    setShowPostForm(false);
  };

  const handlePageSelected = (page: string) => {
    setPageSelected(page);
  };

  return (
    <div className="font-sans">
      <MyNavbar onCreatePostClick={handleCreatePostClick} />
      <div className="flex flex-grow">
        <MySidebar
          showPostForm={showPostForm}
          onPostSubmit={handlePostSubmit}
          onPageSelect={handlePageSelected}
        />
        <Dashboard
          showPostForm={showPostForm}
          onPostSubmit={handlePostSubmit}
          selectedPage={pageSelected}
          posts={posts}
        />
      </div>
    </div>
  );
}
