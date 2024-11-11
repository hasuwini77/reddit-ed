"use client";

import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody } from "./ui/sidebar";
import { IconArrowLeft, IconUserBolt } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import Spinner from "./Spinner";
import { logOut } from "@/actions/log-out";

export function MySidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: user, isLoading } = useUser();
  const { refreshUser } = useUser();

  useEffect(() => {
    refreshUser();
  }, [refreshUser, pathname]);

  const links = [
    {
      label: "Profile",
      href: "/profile",
      icon: <IconUserBolt className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="text-white h-5 w-5 flex-shrink-0" />,
      onClick: async (e: React.MouseEvent) => {
        e.preventDefault();
        await logOut();
        refreshUser();
        router.push("/");
      },
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gradient-to-b from-[#1e3a8a] to-[#1e40af] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#1e3a8a] overflow-hidden",
        "flex-shrink-0 min-h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        {/* Main container with flex layout */}
        <div className="flex flex-col h-full">
          {/* Scrollable content section */}
          <SidebarBody className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-10">
              <Link
                href="/"
                className={cn(
                  "font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20",
                  pathname === "/" && "font-bold"
                )}
              >
                <div className="h-5 w-6 bg-blue-700 dark:bg-blue-400 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
                {open && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium text-white whitespace-pre"
                  >
                    Feed
                  </motion.span>
                )}
              </Link>
              <div className="mt-8 flex flex-col gap-2">
                {links.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    onClick={link.onClick}
                    className={cn(
                      "font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20",
                      pathname === link.href && "font-bold"
                    )}
                  >
                    {link.icon}
                    {open && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-medium text-white whitespace-pre"
                      >
                        {link.label}
                      </motion.span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </SidebarBody>

          <div className="p-4 border-t-4 border-transparent fixed bottom-0 left-0 bg-clip-padding bg-gradient-to-r from-blue-900 via-blue-800 to-gray-900 rounded-lg">
            {isLoading ? (
              <Spinner />
            ) : user ? (
              <Link
                href="/profile"
                className="font-normal flex space-x-2 items-center text-sm text-white py-1 z-20"
              >
                <Image
                  src={user.avatar || "https://i.pravatar.cc/300"}
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={100}
                  height={100}
                  alt="Avatar"
                />
                {open && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium text-white whitespace-pre"
                  >
                    {user.username || "User"}
                  </motion.span>
                )}
              </Link>
            ) : (
              <div className="font-normal flex space-x-2 items-center text-sm text-white py-1 z-20">
                <Image
                  src="/anonymous.png"
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={100}
                  height={100}
                  alt="Avatar-Not-Logged"
                />
                {open && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium text-white whitespace-pre"
                  >
                    {"Not Logged In"}
                  </motion.span>
                )}
              </div>
            )}
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
