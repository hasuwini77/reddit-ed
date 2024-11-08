import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && protectedRoutes.includes(request.nextUrl.pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/log-in";

    url.searchParams.set(
      "message",
      getMessageForRoute(request.nextUrl.pathname)
    );

    return NextResponse.redirect(url);
  }
  return supabaseResponse;
};

const protectedRoutes = ["/create-post", "/profile"];

function getMessageForRoute(pathname: string): string {
  switch (pathname) {
    case "/create-post":
      return "Please log in to create a post";
    case "/profile":
      return "Please log in to view your profile";
    default:
      return "Please log in to access this page";
  }
}
