import { NextResponse } from "next/server";
import { auth } from "@/auth";

const middleware = auth(async (req) => {
  const { pathname } = req.nextUrl;
  const { auth } = req;

  if (pathname.startsWith('/game')) {
    if(!auth) {
      const newUrl = new URL("/signin", req.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }
    else {
      const session = auth;

      if(pathname.startsWith('/game/create') && (session.user.pet)) {
        const newUrl = new URL("/game", req.nextUrl.origin);
        return NextResponse.redirect(newUrl);
      }

      if(!pathname.startsWith('/game/create') && (!session.user.pet)) {
        const newUrl = new URL("/game/create", req.nextUrl.origin);
        return NextResponse.redirect(newUrl);
      }

      if (session.user) {
        const userID = session.user.id;
        const host = req.nextUrl.origin;
        await fetch(`${host}/api/users/active-status`, {
          method: 'POST',
          body: userID,
          headers: {
            'Content-Type': 'text/html; charset=utf-8'
          }
        });
      }
    
      return NextResponse.next();
    }
  }

  else if(pathname.startsWith('/signin') || pathname.startsWith('/signup')) {
    if(auth) {
      const newUrl = new URL("/game", req.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }

    return NextResponse.next();
  }

});

export { middleware };

export const config = {
  matcher: ["/game/:path*", '/signin', '/signup'],
};
