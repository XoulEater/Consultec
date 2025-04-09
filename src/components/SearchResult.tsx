"use client";
import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import PencilIcon from "@mui/icons-material/Create";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { lightBlue } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";

const days = ["L", "K", "M", "J", "V"];

export function SearchResult() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#1450AC",
            },
            secondary: lightBlue,
        },
    });

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
        <ThemeProvider theme={theme}>
            <div className="flex flex-col items-end gap-6">
                <button className="relative overflow-hidden rounded-md bg-gradient px-5 py-2 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90">
                    Registrar
                </button>

                <div className="w-full flex flex-col gap-2">
                    <div className="grid grid-cols-5 p-3 px-5 bg-[#F7F7F7] font-semibold rounded-t-md">
                        {/* Headers */}
                        <div className="text-[#797979]">Impartido por</div>
                        <div className="text-[#797979]">Escuela/Catedra</div>
                        <div className="text-[#797979]">Disponibilidad</div>
                        <div className="text-[#797979]">
                            Ultima Actualización
                        </div>
                        <div className="text-[#797979]">Acciones</div>
                    </div>
                    {/* Data */}
                    {teachers.map((teacher, index) => (
                        <div
                            className="grid grid-cols-5 gap-2 p-3 px-5 hover:bg-[#F7F7F7] transition-all duration-300 ease-in-out cursor-pointer"
                            key={index}
                        >
                            <div>{teacher.teacher}</div>
                            <div>{teacher.school}</div>
                            <div className="gap-1 flex">
                                {teacher.availability.map((day, dayIndex) => (
                                    <span
                                        key={`${teacher.teacher}-${dayIndex}`}
                                        className={`${
                                            day === 1
                                                ? "bg-[#7498FA]"
                                                : "bg-[#E5EAFE] opacity-50"
                                        } rounded-md font-semibold flex items-center pointer-events-none justify-center h-6 w-6 text-sm`}
                                    >
                                        {days[dayIndex]}
                                    </span>
                                ))}
                            </div>
                            <div className="text-[#797979]">
                                <span className="font-semibold">
                                    {teacher.lastUpdate.toLocaleString(
                                        "es-ES",
                                        {
                                            month: "short",
                                            day: "2-digit",
                                            year: "numeric",
                                        }
                                    )}
                                </span>
                                {", " +
                                    teacher.lastUpdate.toLocaleTimeString(
                                        "es-ES",
                                        {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }
                                    )}
                            </div>
                            <div className="flex gap-2">
                                <IconButton aria-label="edit" size="medium">
                                    <PencilIcon
                                        fontSize="inherit"
                                        color="primary"
                                    />
                                </IconButton>
                                <IconButton aria-label="delete" size="medium">
                                    <DeleteIcon
                                        fontSize="inherit"
                                        color="error"
                                    />
                                </IconButton>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <h2>Paginator</h2>
                </div>
            </div>
        </ThemeProvider>
    );
}
