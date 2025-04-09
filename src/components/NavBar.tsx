"use client";

import { useRouter } from "next/navigation"; // Importa useRouter
import Link from "next/link";
import { useState } from "react";

export function NavBar() {
    const router = useRouter(); // Initialize router

    const [showSidebar, setShowSidebar] = useState(false); // Estado para controlar la visibilidad de la barra lateral

    const onMathClick = () => {
        sessionStorage.setItem(
            "filters",
            JSON.stringify([
                {
                    name: "school",
                    value: "Escuela de Matemática",
                    label: "Escuela de Matemática",
                },
            ])
        );
        router.push("/students/browse?school=Escuela+de+Matemática"); // Redirige a la página de búsqueda con los filtros aplicados
        setShowSidebar(false); // Cierra la barra lateral
    };

    const onCustomClick = () => {
        sessionStorage.setItem("filters", JSON.stringify([])); // Guarda los filtros en sessionStorage
        router.push("/students"); // Redirige a la página de búsqueda sin filtros
        setShowSidebar(false); // Cierra la barra lateral
    };

    return (
        <>
            <header className="w-full h-16 bg-bgmain shadow-md flex items-center justify-between px-4 fixed lg:hidden z-10">
                <Link href="/students">
                    <img
                        src="/consultec.svg"
                        className="h-8 cursor-pointer hover:scale-110 transition-all duration-300"
                        alt=""
                    />
                </Link>
                <button>
                    <img
                        src="/menu.svg"
                        className="w-6 hover:scale-110 hover:opacity-80 transition-all duration-300"
                        alt=""
                        onClick={() => setShowSidebar(!showSidebar)} // Cambia el estado de la barra lateral al hacer clic
                    />
                </button>
            </header>

            {/* Desktop NavBar */}
            <div
                className={`w-[330px]  border-r border-hr flex-col items-center top-0 -left-[330px] md:mt-0 mt-16 gap-6 p-6 fixed lg:flex lg:static ${
                    showSidebar ? "translate-x-[330px]" : ""
                } transition-transform duration-300 ease-in-out h-screen bg-bgmain shadow-md lg:z-0 z-20`}
            >
                <Link href="/students" className="hidden lg:flex">
                    <img
                        src="/logo.svg"
                        className="h-14 cursor-pointer hover:scale-110 transition-all duration-300"
                        alt=""
                    />
                </Link>
                {/* nav options */}
                <section className="w-full flex flex-col gap-2 ">
                    <button className="flex items-center gap-2 py-2 cursor-pointer px-4 w-full text-main bg-bghover rounded-md transition-all duration-300 ease-in-out group">
                        <div className="w-5 h-5 flex items-center justify-center rounded-sm group-hover:translate-x-2 transition-transform duration-400 ease-in-out">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M5 4h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                                <path d="M5 16h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
                                <path d="M15 12h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1" />
                                <path d="M15 4h4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1" />
                            </svg>
                        </div>
                        <span
                            className="font-medium text-lg group-hover:translate-x-2 transition-transform duration-400 ease-in-out"
                            onClick={onCustomClick}
                        >
                            Personalizada
                        </span>
                    </button>

                    <button className="flex items-center gap-2 py-2 cursor-pointer px-4 w-full hover:bg-bghover rounded-md transition-all duration-300 ease-in-out text-dim  hover:text-main group">
                        <div className="w-5 h-5  flex items-center justify-center rounded-sm group-hover:translate-x-2 transition-transform duration-400 ease-in-out">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                width="22"
                                height="22"
                                strokeWidth="2"
                            >
                                {" "}
                                <path d="M4 3m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>{" "}
                                <path d="M8 7m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z"></path>{" "}
                                <path d="M8 14l0 .01"></path>{" "}
                                <path d="M12 14l0 .01"></path>{" "}
                                <path d="M16 14l0 .01"></path>{" "}
                                <path d="M8 17l0 .01"></path>{" "}
                                <path d="M12 17l0 .01"></path>{" "}
                                <path d="M16 17l0 .01"></path>{" "}
                            </svg>
                        </div>
                        <span
                            className="font-medium text-lg group-hover:translate-x-2 transition-transform duration-400 ease-in-out"
                            onClick={onMathClick}
                        >
                            Matemática
                        </span>
                    </button>
                </section>
            </div>
        </>
    );
}
