"use client";

import { EditProfileForm } from "./form";
import Image from "next/image";

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
      {user.avatar && (
        <div className="m-0 py-0">
          <Image src={user.avatar} width={100} height={100} alt="User-Avatar" />
        </div>
      )}
    </div>
  );
}
