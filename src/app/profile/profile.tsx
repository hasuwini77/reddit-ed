"use client";

import { EditProfileForm } from "./form";

interface User {
  id: string;
  email: string;
  username: string;
  avatar: string | null | undefined;
}

export default function ProfilePage({ user }: { user: User }) {
  return (
    <div className="py-1">
      <h1 className="py-3 text-2xl">Edit Profile</h1>
      <div className="py-2">
        <EditProfileForm
          defaultValues={{
            email: user.email,
            username: user.username,
            avatar: user.avatar || "",
          }}
          userId={user.id}
        />
      </div>
    </div>
  );
}
