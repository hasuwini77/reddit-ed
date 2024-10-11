"use client";
import { MySidebar } from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import MyNavbar from "@/components/Navbar";
import { useState } from "react";

export default function Home() {
  const [showPostForm, setShowPostForm] = useState(false);

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

  return (
    <div className="font-sans">
      <MyNavbar onCreatePostClick={handleCreatePostClick} />
      <div className="flex flex-grow">
        <MySidebar
          showPostForm={showPostForm}
          onPostSubmit={handlePostSubmit}
        />
        <Dashboard
          showPostForm={showPostForm}
          onPostSubmit={handlePostSubmit}
        />
      </div>
    </div>
  );
}
