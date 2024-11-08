import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { createClient } from "../../utils/supabase/server";
import { Button } from "./ui/button";
import { LogOutButton } from "./ui/logout-button";

export default async function MyNavbar() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="py-3">
      <Navbar isBordered className="w-full">
        {/* Left side: Brand and Links */}
        <Link href="/">
          <NavbarContent justify="start" className="flex items-center mx-2">
            <NavbarBrand className="mr-4 flex items-center">
              <Image src={"/eddriT.png"} alt="mylogo" width={70} height={70} />
              <p className=" sm:block font-bold font-sans text-2xl ml-2">
                eddriT
              </p>
            </NavbarBrand>
          </NavbarContent>
        </Link>

        {/* Center: Simple Search Bar */}
        <NavbarContent className="hidden lg:flex lg:flex-grow items-center justify-center">
          <SearchBar />
        </NavbarContent>

        {/* Right side: Avatar and Create Post Button */}
        <NavbarContent justify="end" className="flex items-center gap-4 mx-3">
          {user ? (
            <>
              <div className="flex items-center gap-2">
                <Button
                  as={Link}
                  href="/create-post"
                  className="flex items-center gap-2 rounded-lg border-2 bg-slate-800"
                >
                  <PlusIcon className="h-5 w-5" />
                  Create Post
                </Button>
                <LogOutButton />
              </div>
            </>
          ) : (
            <Button as={Link} href="/auth/log-in" className="bg-green-500">
              log in
            </Button>
          )}
        </NavbarContent>
      </Navbar>
    </div>
  );
}
