"use client";
import { useParams } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import type { Schedule } from "@/lib/types";
import { ReadSchedule } from "@/components/ReadSchedule";

export default function Home() {
    const { id } = useParams();

    const horario: Schedule[] = [
        {
            type: "consultation",
            subject: "Matemática",
            day: 2,
            starth: 7,
            startm: 3,
            duration: 2,
        },
        {
            type: "consultation",
            subject: "Matemática",
            day: 4,
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
                <h1 className="text-xl font-medium">{id}</h1>
            </header>
            <hr className="border-hr" />
            <ReadSchedule schedules={horario} />
        </div>
    );
}
