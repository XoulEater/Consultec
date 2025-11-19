"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import NavItem, { NavItemProps } from "./NavItem";

export function NavBar({
    items,
    href,
}: {
    items: NavItemProps[];
    href: string;
}) {
    const [showSidebar, setShowSidebar] = useState(false); // Estado para controlar la visibilidad de la barra lateral
    const sidebarRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Click outside logic for mobile sidebar
    useEffect(() => {
        if (!showSidebar) return;
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            // Ignore clicks inside the sidebar or on the toggle button
            if (
                (sidebarRef.current && sidebarRef.current.contains(target)) ||
                (buttonRef.current && buttonRef.current.contains(target))
            ) {
                return;
            }
            setShowSidebar(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSidebar]);

    return (
        <>
            <header className="w-full z-10 h-16 bg-bgmain shadow-md flex items-center gap-5 px-4 fixed lg:hidden">
                <button
                    ref={buttonRef}
                    onClick={() => setShowSidebar((s) => !s)}
                    aria-expanded={showSidebar}
                    aria-controls="sidebar"
                    className="p-1"
                >
                    <img
                        src="/icons/menu.svg"
                        className="w-6 hover:scale-110 hover:opacity-80 transition-all duration-300"
                        alt="Abrir menú"
                    />
                </button>
                <Link href={href}>
                    <img
                        src="/logos/Consultec.svg"
                        className="h-8 cursor-pointer hover:scale-110 transition-all duration-300"
                        alt=""
                    />
                </Link>
            </header>

            {/* Desktop NavBar */}

            <div
                ref={sidebarRef}
                className={`border-r border-hr flex-col items-center top-0 -left-[300px] lg:mt-0 mt-16  gap-6 lg:p-6 p-2 fixed lg:flex lg:static ${
                    showSidebar ? "translate-x-[300px]" : ""
                } transition-transform dura tion-300 ease-in-out h-screen bg-bgmain shadow-md lg:z-0 z-20`}
            >
                <Link href={href} className="hidden lg:flex">
                    <img
                        src="/logos/logo.svg"
                        className="h-14 cursor-pointer hover:scale-110 transition-all duration-300"
                        alt=""
                    />
                </Link>
                {/* nav options */}
                <section className="w-full flex flex-col gap-2 ">
                    {items.map((item, idx) => (
                        <NavItem key={idx} {...item} />
                    ))}
                </section>
            </div>
        </>
    );
}
