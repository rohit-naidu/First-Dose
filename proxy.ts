import { type NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Skip static assets and image optimization files.
     * Every real page request still gets Supabase session refresh behavior.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
