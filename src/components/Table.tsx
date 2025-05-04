"use client";
import { TeachersTable } from "@/lib/types";
import Link from "next/link";
import { useState } from "react";

const days = ["L", "K", "M", "J", "V", "S"];

interface TableProps {
    teachers: TeachersTable[] | undefined;
}

export function Table({ teachers }: TableProps) {
    if (teachers === undefined) {
        return (
            <div className="flex items-center justify-center pt-10 w-full bg-bgmain">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-secondary"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between items-center  gap-6">
            <div className="w-full flex flex-col gap-2">
                <div
                    className=" hidden lg:grid grid-cols-4
                p-3 px-5 bg-bghover  font-semibold rounded-t-lg"
                >
                    {/* Headers */}
                    <div className=" text-dim ">Impartido por</div>
                    <div className=" text-dim ">Escuela/Catedra</div>
                    <div className=" text-dim ">Disponibilidad</div>
                    <div className=" text-dim ">Ultima Acualización</div>
                </div>
                {/* Data */}
                {teachers.length === 0 && (
                    <span className="text-center text-dim font-semibold p-3 px-5 bg-bghover rounded-lg">
                        No se ha encontrado ningun profesor que cumpla con los
                        criterios de busqueda
                        <br />
                        Por favor, intenta con otros criterios de busqueda
                    </span>
                )}
                {teachers.map((teacher, index) => (
                    <Link
                        className="grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-2 p-3 px-5 bg-bghover lg:bg-transparent lg:hover:bg-bghover transition-all duration-300 ease-in-out cursor-pointer relative"
                        key={index}
                        href={`browse/${teacher.id}`}
                    >
                        <div className="lg:col-span-1  line-clamp-1">
                            {teacher.teacher}
                        </div>
                        <div className="lg:order-none order-3 line-clamp-1 lg:col-span-1 col-span-2 text-sm text-dim lg:text-base lg:text-main">
                            {teacher.school}
                        </div>
                        <div className=" sm:gap-1 flex overflow-hidden justify-self-end lg:justify-self-auto  rounded-md sm:rounded-none w-fit h-fit">
                            {teacher.availability.map((day, dayIndex) => (
                                <span
                                    key={`${teacher.teacher}-${dayIndex}`}
                                    className={`${
                                        day === 1 ? "bg-primary" : "bg-dim/30"
                                    } sm:rounded-lg font-semibold flex items-center pointer-events-none text-xs leading-tide justify-center h-5 min-w-5 `}
                                >
                                    {days[dayIndex]}
                                </span>
                            ))}
                        </div>
                        <div className="text-dim lg:block hidden">
                            <span className=" font-semibold">
                                {new Date(teacher.lastUpdate).toLocaleString(
                                    "es-ES",
                                    {
                                        month: "short", // Abbreviated month (e.g., "Oct")
                                        day: "2-digit", // Day with leading zero if needed
                                        year: "numeric", // Full year (e.g., "2024")
                                    }
                                )}
                            </span>

                            {", " +
                                new Date(teacher.lastUpdate).toLocaleTimeString(
                                    "es-ES",
                                    {
                                        hour: "2-digit", // 2-digit hours
                                        minute: "2-digit", // 2-digit minutes
                                    }
                                )}
                        </div>

                        <div className="absolute right-3 bottom-0 lg:top-1/2 lg:-translate-y-1/2">
                            <img src="/icons/info.svg" alt="edit" />
                        </div>
                    </Link>
                ))}
            </div>
            <div>
                <div className="flex flex-col  items-center">
                    <span className="text-sm ">
                        Página <span className="font-semibold">1</span> de{" "}
                        <span className="font-semibold">10</span>
                    </span>
                    <div className="inline-flex mt-2 xs:mt-0">
                        <button className="flex items-center justify-center px-3 h-8 text-sm font-medium   rounded-s hover:bg-gray-700 bg-bghover border-hr">
                            <svg
                                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 5H1m0 0 4 4M1 5l4-4"
                                />
                            </svg>
                            Prev
                        </button>
                        <button className="flex items-center justify-center px-3 h-8 text-sm font-medium   border-0 border-s  rounded-e  bg-bghover border-hr  hover:bg-gray-700">
                            Next
                            <svg
                                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
