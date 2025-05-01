"use client";
import { BackButton } from "@/components/BackButton";
import { ReadSchedule } from "@/components/ReadSchedule";
import { useParams } from "next/navigation";
import type { Schedule } from "@/lib/types";

export default function Schedule() {
    const { id } = useParams();

    const horario: Schedule[] = [
        // {
        //     type: "consultation",
        //     subject: "Matemática",
        //     day: 2,
        //     starth: 7,
        //     startm: 3,
        //     duration: 2,
        // },
        {
            type: "class",
            subject: "MA1103-Cálculo y algebra lineal",
            day: 3,
            starth: 7,
            startm: 3,
            duration: 2,
        },
        {
            type: "telecommuting",
            subject: "Teletrabajo",
            day: 2,
            starth: 13,
            startm: 3,
            duration: 2,
        },
        {
            type: "class",
            subject: "MA1103-Cálculo y algebra lineal",
            day: 4,
            starth: 13,
            startm: 3,
            duration: 2,
        },
        {
            type: "other",
            subject: "Consejo",
            day: 1,
            starth: 7,
            startm: 3,
            duration: 4,
        },

        {
            type: "other",
            subject: "Otro",
            day: 5,
            starth: 7,
            startm: 3,
            duration: 2,
        },
    ];

    return (
        <div className=" flex flex-col gap-2 ">
            <header className="flex gap-4 items-center">
                <BackButton />
                {/* TODO: Add name */}
                <h1 className="text-xl font-medium"></h1>
            </header>
            <hr className="border-hr" />
            <ReadSchedule schedules={horario} />
        </div>
    );
}
