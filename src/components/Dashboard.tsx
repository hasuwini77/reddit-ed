import React from "react";
import PostForm from "./PostForm";
import MockupDashboard from "./MockupDashboard";
import { FeedPost } from "./FeedPost";

interface DashboardProps {
  showPostForm: boolean;
  selectedPage: string;
  onPostSubmit: (postData: {
    title: string;
    image: string;
    content: string;
  }) => void;
}
const Dashboard: React.FC<DashboardProps> = ({
  showPostForm,
  onPostSubmit,
  selectedPage,
}) => {
  const renderPageContent = () => {
    switch (selectedPage) {
      case "dashboard":
        return (
          <FeedPost
            title={"test2"}
            image={""}
            content={"Content here"}
            comments={""}
          />
        );
      case "profile":
        return <ProfileContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <DefaultContent />;
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

const DefaultContent = () => <MockupDashboard />;

export default Dashboard;
