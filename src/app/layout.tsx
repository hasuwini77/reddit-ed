import type { Metadata } from "next";
import { QueryClientProvider } from "@/providers/query-client-provider";
import localFont from "next/font/local";
import { MySidebar } from "@/components/Sidebar";
import MyNavbar from "@/components/Navbar";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const redditSans = localFont({
  src: [
    {
      path: "./fonts/RedditSans-Regular.ttf",
      weight: "400", // Regular weight
    },
    {
      path: "./fonts/RedditSans-SemiBold.ttf", //
      weight: "600",
    },
  ],
  variable: "--font-reddit-sans",
});

export const metadata: Metadata = {
  title: "eddriT",
  description: "The Next Reddit Clone that revolutionized the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`dark ${redditSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider>
          <div className="font-sans">
            <MyNavbar />
            <div className="flex flex-grow">
              <MySidebar />
              <div className="flex-1 min-w-0">
                <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 dark:border-neutral-600 bg-white dark:bg-gray-900 flex flex-col gap-2 flex-1 w-full h-full">
                  <main>
                    <Toaster richColors />
                    {children}
                  </main>
                </div>
              </div>
            </div>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
