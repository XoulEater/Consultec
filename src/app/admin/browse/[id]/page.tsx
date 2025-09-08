"use client";
import { BackButton } from "@/components/BackButton";
import { ReadSchedule } from "@/components/ReadSchedule";
import { useParams } from "next/navigation";
import type { Schedule } from "@/lib/types";
import { getScheduleByTeacherId } from "@/services/schedule.service";
import { useEffect, useState } from "react";
import { getTeacherById } from "@/services/teacher.service";

export default function Home() {
    const { id } = useParams();
    const [name, setName] = useState<string>("");
    const [schedule, setSchedule] = useState<Schedule[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                // sleep for 1 second to simulate loading

                const data = await getScheduleByTeacherId(id as string);
                setSchedule(data);
                console.log("Fetched schedule:", data); // Debugging line

                // overwrite with dummy data

                setSchedule([
                    {
                        id: "680ece6b0434de873a5f61ca",
                        subject: "Matemáticas",
                        start: 8,
                        duration: 2,
                        type: "class",
                        day: 0,
                    },
                    {
                        id: "680ece6b0434de873a5f61ca",
                        subject: "Matemáticas",
                        start: 10,
                        duration: 6,
                        type: "class",
                        day: 0,
                    },
                    {
                        id: "2",
                        subject: "Historia",
                        start: 10,
                        duration: 1,
                        type: "class",
                        day: 1,
                    },
                    {
                        id: "3",
                        subject: "Consulta con estudiante",
                        start: 14,
                        duration: 1,
                        type: "consultation",
                        day: 2,
                    },
                ]);

                setLoading(false); // Set loading to false after fetching
            } catch (error) {
                console.error("Failed to fetch schedule:", error);
            }
        };
        const fetchName = async () => {
            try {
                const data = await getTeacherById(id as string);
                setName(data.name);
            } catch (error) {
                console.error("Failed to fetch name:", error);
            }
        };

        fetchName();
        fetchSchedule();
    }, [id]); // Trigger effect on id change

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-full bg-bgmain">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-secondary"></div>
            </div>
        );
    }

    return (
        <div className=" flex flex-col gap-2 ">
            <header className="flex gap-4 items-center">
                <BackButton />
                <h1 className="text-xl font-medium">{name}</h1>
            </header>
            <hr className="border-hr" />
            <ReadSchedule schedules={schedule} />
        </div>
    );
}
