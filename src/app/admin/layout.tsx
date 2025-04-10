"use client";

import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const token = true;
    useEffect(() => {
        // const token = localStorage.getItem("token");

        // TODO: Remove this

        if (token) {
            setIsLoggedIn(true);
        }

        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-bgmain">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-secondary"></div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center h-full w-full gap-5 pb-24 absolute top-0 left-0 bg-bgmain">
                <img
                    className="h-56 transition-all duration-300 ease-in-out [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110 "
                    src="https://media.tenor.com/MYZgsN2TDJAAAAAM/this-is.gif"
                    alt=""
                />
                <h1 className="text-8xl font-bold">401</h1>
                <h2 className="text-2xl font-semibold">
                    Esta página es solo para administradores
                </h2>
                <section className="flex flex-row gap-4">
                    <Link href="/students">
                        <button className="bg-secondary  text-light font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110 cursor-pointer">
                            Regresar al inicio
                        </button>
                    </Link>
                    <Link href="/login">
                        <button className="bg-secondary  text-light font-bold py-2 px-4 rounded-md transition-all duration-300 ease-in-out [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110 cursor-pointer">
                            Iniciar sesión
                        </button>
                    </Link>
                </section>
            </div>
        );
    }

    return <>{children}</>;
}
