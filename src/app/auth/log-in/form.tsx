"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema } from "@/actions/schemas";

import { logIn } from "@/actions/log-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";

export const LogInForm = () => {
  const { register, handleSubmit } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
  });

  return (
    <form
      onSubmit={handleSubmit((values) => logIn(values))}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <Input {...register("email")} />
      <Input {...register("password")} type="password" />
      <Button className="bg-slate-800" type="submit">
        log in
      </Button>
    </form>
  );
};
