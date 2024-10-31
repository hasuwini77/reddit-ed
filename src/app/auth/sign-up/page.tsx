"use client";

import { signUp } from "@/actions/sign-up";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/actions/schemas";
import { z } from "zod";

type SignUpFormData = z.infer<typeof signUpSchema>;

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    const result = await signUp(data);
    if (result.error) {
      console.error(result.error);
    } else {
      // Handle successful sign-up
      console.log("User signed up:", result.user);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-500 text-black 
                ${errors.email ? "border-red-500" : "border-gray-300"}`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              id="password"
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-500 text-black 
                ${errors.password ? "border-red-500" : "border-gray-300"}`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              id="username"
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-500 text-black 
                ${errors.username ? "border-red-500" : "border-gray-300"}`}
              placeholder="Your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">
                {errors.username.message as string}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            >
              Avatar URL (optional)
            </label>
            <input
              {...register("avatar")}
              type="url"
              id="avatar"
              className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-blue-500 text-black 
                ${errors.avatar ? "border-red-500" : "border-gray-300"}`}
              placeholder="https://example.com/avatar.jpg"
            />
            {errors.avatar && (
              <p className="text-red-500 text-sm">
                {errors.avatar.message as string}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
