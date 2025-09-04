"use client";
import { BackButton } from "@/components/BackButton";
import { ReadSchedule } from "@/components/ReadSchedule";
import { useParams } from "next/navigation";
import type { Schedule } from "@/lib/types";
import { useEffect, useState} from "react";
import { getScheduleByTeacherId } from "@/services/schedule.service";
import WeeklyCalendar from "@/components/InteractiveSchedule";

export default function Schedule() {
    const { id } = useParams();
    console.log(id);
    const teacherId : string = "680f083ea4c49105539a8ffa"


        /* {
        type: "consultation" | "class" | "telecommuting" | "other";
        subject: string;
        day: number;
        starth: number;
        startm: number;
        duration: number;

        }, */

    const [horario, setHorario] = useState<Schedule[]>([]);


    const fetchSchedule = async () => {
        try {
            const response = await getScheduleByTeacherId(teacherId) as Schedule[];
            console.log(response);
            setHorario(response); // Assuming response.data contains the schedule data
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    }
    useEffect(() => {
        fetchSchedule();
    }
    , []); // Empty dependency array to run only once on mount


    return (
        <div className=" flex flex-col gap-2 ">
            <header className="flex gap-4 items-center">
                <BackButton />
                {/* TODO: Add name */}
                <h1 className="text-xl font-medium"></h1>
            </header>
            <hr className="border-hr" />
            <WeeklyCalendar  />
        </div>
    );
}
