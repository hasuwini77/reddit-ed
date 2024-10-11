"use client";

import MyNavbar from "@/components/Navbar";
import { MySidebar } from "@/components/Sidebar";
import { useState } from "react";

export default function Home() {
  const [isCreatePostClicked, setIsCreatePostClicked] = useState(false);

  const handleCreatePostClick = () => {
    setIsCreatePostClicked(true);
  };

  return (
    <div className="font-sans">
      <MyNavbar />
      <MySidebar />
    </div>
  );
}
