"use client";

import { editProfile } from "@/actions/edit-user";
import { userProfileSchema } from "@/actions/schemas";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useUser } from "@/hooks/useUser";

type UserFormData = z.infer<typeof userProfileSchema>;

export const EditProfileForm = ({
  defaultValues,
  userId,
}: {
  defaultValues: UserFormData;
  userId: string;
}) => {
  const { refreshUser } = useUser();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserFormData) => editProfile({ userId, userData: data }),
    onError: (error: Error) => {
      toast.error(
        error.message || "An error occurred while updating the profile"
      );
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Profile updated successfully");
        refreshUser();
      } else {
        toast.error("Failed to update profile");
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      email: defaultValues.email,
      username: defaultValues.username,
      avatar: defaultValues.avatar || undefined,
    },
  });

  const onSubmit = handleSubmit((data) => mutate(data));

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div>
        <label className="block text-gray-700 dark:text-gray-200">Email</label>
        <Input
          {...register("email")}
          error={errors.email?.message}
          placeholder="Enter your email"
          type="email"
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200">
          Username
        </label>
        <Input
          {...register("username")}
          error={errors.username?.message}
          placeholder="Enter your username"
        />
      </div>

      <div>
        <label className="block text-gray-700 dark:text-gray-200">
          Avatar URL
        </label>
        <Input
          {...register("avatar")}
          error={errors.avatar?.message}
          placeholder="Enter avatar URL"
          type="url"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  );
};
