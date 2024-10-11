import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Button,
  Avatar,
} from "@nextui-org/react";
import Image from "next/image";
import { SearchIcon } from "./SearchIcon";
import { PlusIcon } from "@heroicons/react/24/solid";

interface NavbarProps {
  onCreatePostClick: () => void;
}

export default function MyNavbar({ onCreatePostClick }: NavbarProps) {
  return (
    <div className="py-3">
      <Navbar isBordered>
        {/* Left side: Brand and Links */}
        <NavbarContent justify="start" className="flex items-center mx-2">
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
              className="w-full h-12 rounded-full bg-gray-700 text-white placeholder-gray-400 border border-gray-200 focus:border-yellow-300 focus:ring focus:ring-yellow-100 focus:ring-opacity-10 focus:outline-none transition duration-300 ease-in-out pl-10 pr-4"
            />
            <SearchIcon
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </NavbarContent>

        {/* Right side: Avatar and Create Post Button */}
        <NavbarContent justify="end" className="flex items-center gap-4 mx-3">
          {/* Button for creating post */}
          <Button
            color="primary"
            className="flex items-center gap-2 rounded-lg border-2"
            onClick={onCreatePostClick}
          >
            <PlusIcon className="h-5 w-5" />
            Create Post
          </Button>
          <div className="flex items-center">
            <Image
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              alt="mylogo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
