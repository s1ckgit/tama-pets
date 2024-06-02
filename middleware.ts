import { NextResponse } from "next/server";
import { auth } from "@/auth";

const middleware = auth(async (req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  const session = req.auth;

  if (session?.user) {
    const userID = session.user.id;
    const host = req.nextUrl.origin;
    await fetch(`${host}/api/users/active-status`, {
      method: 'POST',
      body: userID,
      headers: {
        'Content-Type': 'text/html; charset=utf-8'
      }
    });
    console.log('status updated', userID);
  }

  return NextResponse.next();
});

export { middleware };

export const config = {
  matcher: ["/game/:path*"],
};
