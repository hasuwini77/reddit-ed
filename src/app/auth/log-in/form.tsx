import { logIn } from "@/actions/log-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const LogInForm = () => {
  return (
    <form action={logIn} className="flex w-full max-w-md flex-col gap-4">
      <Input type="email" name="email" placeholder="email" required />
      <Input type="password" name="password" placeholder="password" required />
      <Button type="submit">log in</Button>
    </form>
  );
};
