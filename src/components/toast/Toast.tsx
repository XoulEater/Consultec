"use client";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { hideToast } from "../../store/toastSlice";
import { useEffect } from "react";

export default function Toast() {
    const { open, message, type } = useAppSelector((state) => state.toast);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => dispatch(hideToast()), 5000);
            return () => clearTimeout(timer);
        }
    }, [open, dispatch]);

    if (!open) return null;

    let bg;
    switch (type) {
        case "success":
            bg = "bg-green-950";
            break;
        case "error":
            bg = "bg-red-950";
            break;
        case "info":
            bg = "bg-blue-950";
            break;
        default:
            bg = "bg-gray-950";
            break;
    }

    let border;
    switch (type) {
        case "success":
            border = "border-green-500";
            break;
        case "error":
            border = "border-red-500";
            break;
        case "info":
            border = "border-blue-500";
            break;
        default:
            border = "border-gray-500";
            break;
    }

    function getIcon() {
        switch (type) {
            case "success":
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M5 12l5 5l10 -10" />
                    </svg>
                );
            case "error":
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M12 9v4" />
                        <path d="M12 16v.01" />
                    </svg>
                );
            case "info":
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                        <path d="M12 9h.01" />
                        <path d="M11 12h1v4h1" />
                    </svg>
                );
            default:
                return (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                        <path d="M12 9h.01" />
                        <path d="M11 12h1v4h1" />
                    </svg>
                );
        }
    }

    return (
        <div
            className={`fixed  top-4 left-1/2 -translate-x-1/2 px-6 py-4 rounded text-white shadow-lg z-50 border-2 ${bg} ${border} flex items-center gap-2 `}
        >
            {getIcon()}
            <span className="">{message}</span>
        </div>
    );
}
