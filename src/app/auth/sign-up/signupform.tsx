"use client";

import { signUp } from "@/actions/sign-up";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/actions/schemas";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => toast.success("User successfully Created"),
    onError: (error) => toast.error(error.message),
    onSettled: () => toast.dismiss(),
  });

  const onSubmit = (data: SignUpFormData) => {
    setErrorMsg(null);
    mutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screenpx-4 py-8">
      <div className="w-full max-w-md bg-gray-700 rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center text-white">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 placeholder:text-white placeholder:opacity-50"
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label
              htmlFor="username"
              className="text-sm font-medium text-gray-700 "
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              {...register("username")}
              placeholder="Username"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50  placeholder:text-white placeholder:opacity-50"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50  placeholder:text-white placeholder:opacity-50"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="avatar"
              className="text-sm font-medium text-gray-700"
            >
              Avatar URL (optional)
            </Label>
            <Input
              id="avatar"
              type="url"
              {...register("avatar")}
              placeholder="Avatar URL"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50  placeholder:text-white placeholder:opacity-50"
            />
            {errors.avatar && (
              <p className="mt-1 text-xs text-red-500">
                {errors.avatar.message}
              </p>
            )}
          </div>

          {errorMsg && (
            <p className="text-sm text-red-500 text-center">{errorMsg}</p>
          )}

          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {mutation.isPending ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
