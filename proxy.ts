import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/products(.*)',
]);

const isPublicRoute = createRouteMatcher(['/login(.*)', '/signup(.*)', '/forgot-password(.*)',]);

export default clerkMiddleware(async (auth, req) => {

  const {userId} = await auth();

  if(userId && isPublicRoute(req)){
    return NextResponse.redirect(new URL("/", req.url));
  }
  
  
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});



export const config = {
  matcher: [
    // This regex skips Next.js internal files and static assets
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};