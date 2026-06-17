import { NextRequest, NextResponse } from "next/server";

const ZINE_HOSTS = new Set(["zine.destructor666.com", "zine.destructor666.vercel.app"]);

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  const { pathname } = request.nextUrl;

  if (!host || !ZINE_HOSTS.has(host)) {
    return NextResponse.next();
  }

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/zine";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
