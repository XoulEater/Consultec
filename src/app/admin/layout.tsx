"use client";

import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

export default function LayoutB({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
