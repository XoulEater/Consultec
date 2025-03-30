"use client";
<<<<<<< HEAD:src/app/components/NavBar.tsx
import { useState } from "react";
=======

import Link from "next/link";
>>>>>>> 6f18067bad88835ba354efc04c98168286939414:src/components/NavBar.tsx

export function NavBar() {
    // to do : dependiendo de la ruta y de la validacion mostrar opciones de administrador o de usuario
    const [role, setRole] = useState("admin"); // "admin" or "user"
    return (
        <div className="w-[330px] border border-r-2 border-gray-100 flex-col items-center  gap-6 p-6 hidden lg:flex">
            <Link href="/students">
                <img
                    src="/logo.png"
                    className="h-14 cursor-pointer hover:scale-110 transition-all duration-300"
                    alt=""
                />
            </Link>

            {/* nav options */}
            <section className="w-full flex flex-col gap-2 ">
<<<<<<< HEAD:src/app/components/NavBar.tsx
                <button className="flex items-center gap-2 py-2 cursor-pointer px-4 w-full bg-[#E5EAFE] rounded-md transition-all duration-300 ease-in-out group"
                    onClick={() => (window.location.href = "/Information")}
                >
                
=======
                <button className="flex items-center gap-2 py-2 cursor-pointer px-4 w-full bg-bghover rounded-md transition-all duration-300 ease-in-out group">
>>>>>>> 6f18067bad88835ba354efc04c98168286939414:src/components/NavBar.tsx
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
                    <span className="font-semibold text-lg group-hover:translate-x-2 transition-transform duration-400 ease-in-out">
                        Personalizada
                    </span>
                </button>

                <button className="flex items-center gap-2 py-2 cursor-pointer px-4 w-full hover:bg-bghover rounded-md transition-all duration-300 ease-in-out text-dim  hover:text-black group">
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
                    <span className="font-semibold text-lg group-hover:translate-x-2 transition-transform duration-400 ease-in-out">
                        Matemática
                    </span>
                </button>

                {window.location.pathname === "/Information" && (
                                    <button className="flex items-center gap-2 py-2 cursor-pointer px-4 w-full hover:bg-[#E5EAFE] rounded-md transition-all duration-300 ease-in-out text-[#797979]  hover:text-black group">
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
                                    <span className="font-semibold text-lg group-hover:translate-x-2 transition-transform duration-400 ease-in-out">
                                        Información
                                    </span>
                                </button>
                    )}
            </section>
        </div>
    );
}
