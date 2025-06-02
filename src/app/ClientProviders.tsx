"use client";
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
}
