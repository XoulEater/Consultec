"use client";
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
        {
            lastUpdate: new Date("2023-10-01"),
            teacher: "Alan Turing",
            school: "Catedra de Inteligencia Artificial",
            availability: [0, 0, 1, 1, 1],
        },
    ]);

    return (
        <div className="flex flex-col items-end gap-6">
            <div className="w-full flex flex-col gap-2">
                <div
                    className="grid grid-cols-4
                p-3 px-5  bg-[#F7F7F7] font-semibold rounded-t-md"
                >
                    {/* Headers */}
                    <div className=" text-[#797979] ">Impartido por</div>
                    <div className=" text-[#797979] ">Escuela/Catedra</div>
                    <div className=" text-[#797979] ">Disponibilidad</div>
                    <div className=" text-[#797979] ">Ultima Acualización</div>
                </div>
                {/* Data */}
                {teachers.map((teacher, index) => (
                    <div
                        className="grid grid-cols-4 gap-2 p-3 px-5 hover:bg-[#F7F7F7] transition-all duration-300 ease-in-out cursor-pointer"
                        key={index}
                    >
                        <div className="">{teacher.teacher}</div>
                        <div className="">{teacher.school}</div>
                        <div className=" gap-1 flex">
                            {teacher.availability.map((day, index) => (
                                <span
                                    key={index}
                                    className={`${
                                        day === 1
                                            ? "bg-[#7498FA]"
                                            : "bg-[#E5EAFE] opacity-50"
                                    } rounded-md font-semibold flex items-center pointer-events-none justify-center h-6 w-6  text-sm`}
                                >
                                    {days[index]}
                                </span>
                            ))}
                        </div>
                        <div className="text-[#797979] ">
                            <span className="font-semibold">
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
                    </div>
                ))}
            </div>
            <div>
                <h2>Paginator</h2>
            </div>
        </div>
    );
}
