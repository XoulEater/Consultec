"use client";
import Link from "next/link";
import { useState } from "react";

const days = ["L", "K", "M", "J", "V"];

export function Table() {
    const [teachers, setTeachers] = useState<
        {
            lastUpdate: Date;
            teacher: string;
            school: string;
            availability: Number[];
        }[]
    >([
        {
            lastUpdate: new Date("2023-01-01"),
            teacher: "Dimitri Ivanovich Mendeleiev",
            school: "Catedra de Quimica",
            availability: [1, 0, 1, 0, 1],
        },
        {
            lastUpdate: new Date("2023-02-15"),
            teacher: "Marie Curie",
            school: "Catedra de Fisica",
            availability: [1, 1, 0, 1, 0],
        },
        {
            lastUpdate: new Date("2023-03-10"),
            teacher: "Albert Einstein",
            school: "Catedra de Matematicas",
            availability: [0, 1, 1, 0, 1],
        },
        {
            lastUpdate: new Date("2023-04-05"),
            teacher: "Isaac Newton",
            school: "Catedra de Fisica",
            availability: [1, 0, 0, 1, 1],
        },
        {
            lastUpdate: new Date("2023-05-20"),
            teacher: "Charles Darwin",
            school: "Catedra de Biologia",
            availability: [0, 1, 1, 1, 0],
        },
        {
            lastUpdate: new Date("2023-06-12"),
            teacher: "Galileo Galilei",
            school: "Catedra de Astronomia",
            availability: [1, 1, 0, 0, 1],
        },
        {
            lastUpdate: new Date("2023-07-08"),
            teacher: "Ada Lovelace",
            school: "Catedra de Computacion",
            availability: [0, 1, 1, 1, 1],
        },
        {
            lastUpdate: new Date("2023-08-25"),
            teacher: "Nikola Tesla",
            school: "Catedra de Ingenieria",
            availability: [1, 0, 1, 1, 0],
        },
        {
            lastUpdate: new Date("2023-09-14"),
            teacher: "Rosalind Franklin",
            school: "Catedra de Biologia Molecular",
            availability: [1, 1, 0, 1, 1],
        },
    ]);

    return (
        <div className="flex flex-col items-end gap-6">
            <div className="w-full flex flex-col gap-2">
                <div
                    className=" hidden lg:grid grid-cols-4
                p-3 px-5  bg-[#F7F7F7] font-semibold rounded-t-lg"
                >
                    {/* Headers */}
                    <div className=" text-dim ">Impartido por</div>
                    <div className=" text-dim ">Escuela/Catedra</div>
                    <div className=" text-dim ">Disponibilidad</div>
                    <div className=" text-dim ">Ultima Acualización</div>
                </div>
                {/* Data */}
                {teachers.map((teacher, index) => (
                    <Link
                        className="grid grid-cols-3 lg:grid-cols-4 gap-1 lg:gap-2 p-3 px-5 lg:bg-white bg-[#F7F7F7] lg:hover:bg-[#F7F7F7] transition-all duration-300 ease-in-out cursor-pointer"
                        key={index}
                        href={`browse/${teacher.teacher}`}
                    >
                        <div className="lg:col-span-1 col-span-2 ">
                            {teacher.teacher}
                        </div>
                        <div className="lg:order-none order-3 lg:col-span-1 col-span-2 text-sm text-dim lg:text-base lg:text-main">
                            {teacher.school}
                        </div>
                        <div className=" gap-1 flex ">
                            {teacher.availability.map((day, index) => (
                                <span
                                    key={index}
                                    className={`${
                                        day === 1
                                            ? "bg-primary/50"
                                            : "bg-bghover opacity-50"
                                    } rounded-lg font-semibold flex items-center pointer-events-none justify-center h-6 w-6  text-sm`}
                                >
                                    {days[index]}
                                </span>
                            ))}
                        </div>
                        <div className="text-dim lg:block hidden">
                            <span className=" font-semibold">
                                {teacher.lastUpdate.toLocaleString("es-ES", {
                                    month: "short", // Abbreviated month (e.g., "Oct")
                                    day: "2-digit", // Day with leading zero if needed
                                    year: "numeric", // Full year (e.g., "2024")
                                })}
                            </span>

                            {", " +
                                teacher.lastUpdate.toLocaleTimeString("es-ES", {
                                    hour: "2-digit", // 2-digit hours
                                    minute: "2-digit", // 2-digit minutes
                                })}
                        </div>
                    </Link>
                ))}
            </div>
            <div>
                <nav aria-label="Page navigation example">
                    <ul className="flex items-center -space-x-px h-8 text-sm">
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
                            >
                                <span className="sr-only">Previous</span>
                                <svg
                                    className="w-2.5 h-2.5 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 1 1 5l4 4"
                                    />
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                            >
                                1
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                            >
                                2
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                aria-current="page"
                                className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-primary border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 "
                            >
                                3
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                            >
                                4
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                            >
                                5
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
                            >
                                <span className="sr-only">Next</span>
                                <svg
                                    className="w-2.5 h-2.5 rtl:rotate-180"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 6 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 9 4-4-4-4"
                                    />
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
