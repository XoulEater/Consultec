// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    
    "/admin/:path*",
    "/students/:path*",
    "/api/:path*",   
  ],
};