// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Rutas que quieres proteger con Clerk
    "/admin/:path*",
    "/students/:path*",
    "/api/:path*",   // protege tus APIs
  ],
};