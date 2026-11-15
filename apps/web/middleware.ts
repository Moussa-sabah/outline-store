import { Customer } from "@repo/types";
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
        storageKey: "watch-web-auth-token",
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

  let customer: null | Customer = null;

  if (user) {
    const { data: currentUser } = await supabase
      .from("customers")
      .select()
      .eq("id", user.id)
      .single();

    customer = currentUser;
  }

  const pathname = request.nextUrl.pathname;

  if (
    customer &&
    (pathname === "/sign-up" || pathname === "/sign-in")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // if (
  //   !customer &&

  //     pathname === "/profile"
  // ) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }

  return response;
}

export const config = {
  matcher: [ "/sign-in", "/sign-up"],
};
