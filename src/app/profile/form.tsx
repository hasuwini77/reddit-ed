"use client";

import { editProfile } from "@/actions/edit-user";
import { userProfileSchema } from "@/actions/schemas";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type UserFormData = z.infer<typeof userProfileSchema>;

export const EditProfileForm = ({
  defaultValues,
  userId,
}: {
  defaultValues: UserFormData;
  userId: string;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: editProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userProfileSchema>>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      email: defaultValues.email,
      username: defaultValues.username,
      avatar: defaultValues.avatar || undefined,
    },
  });

  const onSubmit = handleSubmit((data) => mutate({ userId, userData: data }));

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
