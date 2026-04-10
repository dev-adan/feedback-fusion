import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  // Allow 30 seconds of clock skew (30000ms) to handle time synchronization issues
  clockSkewInMs: 30000,
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};