import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  Button,
  Avatar,
} from "@nextui-org/react";
import Image from "next/image";
import { SearchIcon } from "./SearchIcon";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function MyNavbar() {
  return (
    <div className="py-3">
      <Navbar isBordered>
        {/* Left side: Brand and Links */}
        <NavbarContent justify="start" className="flex items-center">
          <NavbarBrand className="mr-4 flex items-center">
            <Image src={"/eddriT.png"} alt="mylogo" width={70} height={70} />
            <p className="hidden sm:block font-bold font-sans text-2xl ml-2">
              eddriT
            </p>
          </NavbarBrand>
        </NavbarContent>

        {/* Center: Simple Search Bar */}
        <NavbarContent className="flex-grow flex items-center justify-center">
          <div className="relative w-full max-w-xl">
            <input
              type="search"
              placeholder="Search Reddit..."
              className="w-full h-12 rounded-full bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:border-purple-400 focus:ring focus:ring-purple-700 pl-10 pr-4 transition"
            />
            <SearchIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </NavbarContent>

        {/* Right side: Avatar and Create Post Button */}
        <NavbarContent justify="end" className="flex items-center gap-4">
          {/* Button for creating post */}
          <Button color="primary" className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            Create Post
          </Button>
          <Avatar
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            alt="User Avatar"
            size="md"
          />
        </NavbarContent>
      </Navbar>
    </div>
  );
}
