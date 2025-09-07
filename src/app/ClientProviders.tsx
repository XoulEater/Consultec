/*"use client";
import { Provider } from "react-redux";
import { store } from "../store";
import Toast from "../components/toast/Toast";

export default function ClientProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Provider store={store}>
            <Toast />
            {children}
        </Provider>
    );
}*/

"use client";

import { Provider } from "react-redux";
import { store } from "../store";
import Toast from "../components/toast/Toast";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ClientProviders({ children }: Props) {
  return (
    <ClerkProvider>
      <Provider store={store}>
        <Toast />
        {children}
      </Provider>
    </ClerkProvider>
  );
}


