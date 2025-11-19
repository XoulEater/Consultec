"use client";

import { useRouter, usePathname } from "next/navigation";

import React, { useState } from "react";

export type NavItemProps = {
    title: string;
    icon: string;
    href?: string;
    onClick?: () => void;
    children?: NavItemProps[];
};

export default function NavItem({
    title,
    icon,
    href,
    onClick,
    children,
}: NavItemProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        if (children && children.length > 0) {
            setOpen((prev) => !prev);
        } else {
            if (onClick) {
                onClick();
            }
            if (href) {
                router.push(href);
            }
        }
    };
    if (!href && (!children || children.length === 0) && !onClick) {
        return null;
    }
    const isActive = href ? pathname.includes(href) : false;

    return (
        <div className="w-full">
            <button
                className={`flex items-center gap-2 py-2 cursor-pointer px-4 w-full text-main  rounded-md transition-all duration-300 ease-in-out group decoration-current ${
                    isActive ? "bg-bghover " : ""
                }`}
                onClick={handleClick}
            >
                <div
                    className={`w-5 h-5 flex items-center justify-center rounded-sm transition-transform duration-400 ease-in-out ${
                        !children || children.length === 0
                            ? "group-hover:translate-x-2"
                            : ""
                    }`}
                >
                    <img src={"/icons/" + icon} alt={title} />
                </div>
                <span
                    className={`font-medium text-lg transition-transform duration-400 ease-in-out group-hover:underline ${
                        !children || children.length === 0
                            ? "group-hover:translate-x-2 "
                            : ""
                    }`}
                >
                    {title}
                </span>
                {children && children.length > 0 && (
                    <span className="ml-auto">{open ? "▲" : "▼"}</span>
                )}
            </button>
            {children && children.length > 0 && open && (
                <div className="ml-8 flex flex-col gap-1">
                    {children.map((child, idx) => (
                        <NavItem key={idx} {...child} />
                    ))}
                </div>
            )}
        </div>
    );
}
