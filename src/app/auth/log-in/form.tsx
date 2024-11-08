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
  });

  console.log({ error });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    mode: "onBlur",
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <Input {...register("email")} error={errors.email} />
      <Input
        {...register("password")}
        type="password"
        error={errors.password}
      />
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
