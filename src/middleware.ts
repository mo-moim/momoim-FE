import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", url.toString());
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// matcher는 원하는 데로 설정 한다.
export const config = {
  matcher: ["/:path*"],
};
