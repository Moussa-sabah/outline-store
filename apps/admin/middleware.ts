import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        storageKey: "watch-admin-auth-token",
      },
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let admin = false;
  let manager = false;

  if (user) {
    const { data: currentUser } = await supabase
      .from("admins")
      .select("role")
      .eq("id", user.id)
      .single();

    admin = currentUser?.role === "admin";
    manager = currentUser?.role === "manager";
  }

  const pathname = request.nextUrl.pathname;

  if (
    (admin || manager) &&
    (pathname === "/" || pathname === "/auth/signIn" || pathname === "/auth")
  ) {
    return NextResponse.redirect(new URL("/dashboard/products", request.url));
  }

  if (
    !admin &&
    !manager &&
    (pathname === "/" ||
      pathname.startsWith("/dashboard") ||
      pathname === "/auth")
  ) {
    return NextResponse.redirect(new URL("/auth/signIn", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/auth/:path*", "/dashboard/:path*"],
};
