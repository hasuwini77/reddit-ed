"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema } from "@/actions/schemas";

import { z } from "zod";
import { logIn } from "@/actions/log-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export const LogInForm = () => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: logIn,
    onError: (error: any) => {
      console.error("Login error:", error);
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    mode: "onBlur",
  });

  const onSubmit = async (values: z.infer<typeof logInSchema>) => {
    try {
      await mutate(values);
    } catch (error: any) {
      if (error.message === "Email not registered") {
        setError("email", {
          type: "manual",
          message: "This email is not registered",
        });
      } else if (error.message === "Invalid credentials") {
        setError("password", {
          type: "manual",
          message: "Invalid email or password",
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full max-w-md flex-col gap-4 text-white"
    >
      <div className="flex flex-col gap-1">
        <Input
          {...register("email")}
          error={errors.email}
          placeholder="Your Email"
          className="placeholder:text-white placeholder:opacity-50"
        />
      </div>

      <div className="flex flex-col gap-1">
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
          error={errors.password}
          className="placeholder:text-white placeholder:opacity-50"
        />
      </div>

      <Button className="bg-slate-800" type="submit">
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging...
          </>
        ) : (
          "Log in"
        )}
      </Button>

      {error && <p className="text-red-500 p-1">{error.message}</p>}
    </form>
  );
};
