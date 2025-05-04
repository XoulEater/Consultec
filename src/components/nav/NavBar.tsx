"use client";
import Link from "next/link";
import { useState } from "react";

export function NavBar({
    children,
    href,
}: {
    children: React.ReactNode;
    href: string;
}) {
    const [showSidebar, setShowSidebar] = useState(false); // Estado para controlar la visibilidad de la barra lateral

    return (
        <>
            <header className="w-full h-16 bg-bgmain shadow-md flex items-center justify-between px-4 fixed lg:hidden z-10 ">
                <Link href={href}>
                    <img
                        src="/logos/consultec.svg"
                        className="h-8 cursor-pointer hover:scale-110 transition-all duration-300"
                        alt=""
                    />
                </Link>
                <button>
                    <img
                        src="/icons/menu.svg"
                        className="w-6 hover:scale-110 hover:opacity-80 transition-all duration-300"
                        alt=""
                        onClick={() => setShowSidebar(!showSidebar)} // Cambia el estado de la barra lateral al hacer clic
                    />
                </button>
            </header>

            {/* Desktop NavBar */}

            <div
                className={`border-r border-hr flex-col items-center top-0 -left-[300px] lg:mt-0 mt-16  gap-6 p-6 fixed lg:flex lg:static ${
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
                    {children}
                </section>
            </div>
        </>
    );
}
