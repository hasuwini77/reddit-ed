import Link from "next/link";

import { LogInForm } from "./form";
import LoginMessage from "./login-msg";

export default function LogInPage() {
  return (
    <main className="main mt-[20vh] flex grow flex-col items-center">
      <div className="flex w-full grow flex-col items-center gap-12">
        <LoginMessage />
        <h1 className="text-2xl font-bold">welcome back</h1>
        <LogInForm />
      </div>
      <Link href="/auth/sign-up" className="text-zinc-500 py-7 p-3">
        don&apos;t have an account? sign up
      </Link>
    </main>
  );
}
