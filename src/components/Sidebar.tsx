"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody } from "./ui/sidebar";
import { IconArrowLeft, IconSettings, IconUserBolt } from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MySidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    {
      label: "Profile",
      href: "/profile",
      icon: <IconUserBolt className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Settings",
      href: "/configure",
      icon: <IconSettings className="text-white h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Logout",
      href: "/logout",
      icon: <IconArrowLeft className="text-white h-5 w-5 flex-shrink-0" />,
    },
  ];

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gradient-to-b from-[#1e3a8a] to-[#1e40af] dark:bg-gradient-to-b dark:from-[#0f172a] dark:to-[#1e3a8a] overflow-hidden",
        "h-[70vh] w-auto flex-shrink-0"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Link
              href="/feed"
              className={cn(
                "font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20",
                pathname === "/feed" && "font-bold"
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
          <div>
            <Link
              href="/profile"
              className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
            >
              <Image
                src="https://assets.aceternity.com/manu.png"
                className="h-7 w-7 flex-shrink-0 rounded-full"
                width={50}
                height={50}
                alt="Avatar"
              />
              {open && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium text-white whitespace-pre"
                >
                  Manu Arora
                </motion.span>
              )}
            </Link>
          </div>
        </SidebarBody>
      </Sidebar>
    </div>
  );
}
