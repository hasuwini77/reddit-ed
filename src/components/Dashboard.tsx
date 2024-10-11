import React from "react";
import PostForm from "./PostForm";

interface DashboardProps {
  showPostForm: boolean;
  onPostSubmit: (postData: {
    title: string;
    image: string;
    content: string;
  }) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  showPostForm,
  onPostSubmit,
}) => {
  return (
    <div className="flex-1 min-w-0">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 dark:border-neutral-600 bg-white dark:bg-gray-900 flex flex-col gap-2 flex-1 w-full h-full">
        {showPostForm ? (
          <PostForm onSubmit={onPostSubmit} />
        ) : (
          <>
            <div className="flex gap-2">
              {[...new Array(4)].map((_, i) => (
                <div
                  key={`first-array-${i}`}
                  className="h-20 w-full rounded-lg bg-gray-100 dark:bg-neutral-600 animate-pulse"
                ></div>
              ))}
            </div>
            <div className="flex gap-2 flex-1">
              {[...new Array(2)].map((_, i) => (
                <div
                  key={`second-array-${i}`}
                  className="h-full w-full rounded-lg bg-gray-100 dark:bg-neutral-600 animate-pulse"
                ></div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
