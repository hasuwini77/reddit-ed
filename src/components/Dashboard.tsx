import React from "react";
import PostForm from "./PostForm";
import MockupDashboard from "./MockupDashboard";
import HomeFeed from "./HomeFeed";
import { HomePostsType } from "../../utils/supabase/queries";

interface DashboardProps {
  showPostForm: boolean;
  selectedPage: string;
  onPostSubmit: (postData: {
    title: string;
    image: string;
    content: string;
  }) => void;
  posts: HomePostsType;
}

const Dashboard: React.FC<DashboardProps> = ({
  showPostForm,
  onPostSubmit,
  selectedPage,
  posts,
}) => {
  const renderPageContent = () => {
    switch (selectedPage) {
      case "feed":
        return <HomeFeed posts={posts} />;
      case "profile":
        return <ProfileContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <HomeFeed posts={posts} />;
    }
  };

  return (
    <div className="flex-1 min-w-0">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 dark:border-neutral-600 bg-white dark:bg-gray-900 flex flex-col gap-2 flex-1 w-full h-full">
        {showPostForm && <PostForm onSubmit={onPostSubmit} />}
        {renderPageContent()}
      </div>
    </div>
  );
};

// Placeholder components for different pages
const ProfileContent = () => (
  <div>
    <h2>Profile Content</h2>
    {/* Add your profile content here */}
  </div>
);

const SettingsContent = () => (
  <div>
    <h2>Settings Content</h2>
    {/* Add your settings content here */}
  </div>
);

export default Dashboard;
