// middleware.ts
//
// Refreshes the Supabase auth session on every request. Without this,
// lib/supabase-server.ts's cookie writes are silently dropped (Server
// Components can't set cookies), so a rotated refresh token never makes it
// back to the browser — admin users would get logged out once the access
// token expires (~1hr), or sooner if Supabase rotates the refresh token.
//
// This only touches /admin routes (the only auth-gated part of the site) to
// avoid unnecessary work on every public page request.

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Touching auth.getUser() is what triggers the token refresh + cookie
  // rewrite above if the access token has expired.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
