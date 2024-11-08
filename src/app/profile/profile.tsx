"use client";

import { EditProfileForm } from "./form";

interface User {
  id: string;
  email: string;
  username: string;
  avatar: string | null;
}

export default function ProfilePage({ user }: { user: User }) {
  return (
    <div>
      <h1>Edit Profile</h1>
      <EditProfileForm
        defaultValues={{
          email: user.email,
          username: user.username,
          avatar: user.avatar,
        }}
        userId={user.id}
      />
    </div>
  );
}
