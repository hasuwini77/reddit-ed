"use client";

import { EditProfileForm } from "./form";
import { toast } from "sonner";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface User {
  id: string;
  email: string;
  username: string;
  avatar: string | null;
}

export default function ProfilePage({ user }: { user: User }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message) {
      toast.error(message);
    }
  }, [searchParams]);

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
