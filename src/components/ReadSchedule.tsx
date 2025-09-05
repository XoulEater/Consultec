import { Schedule } from "@/lib/types";
import { Fragment, useState } from "react";
import ScheduleModal from "./ScheduleModal";

export function ReadSchedule({ schedules }: { schedules: Schedule[] }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<string | null>(
        null
    );
    const handleClickSchedule = (idx: number) => {
        setSelectedSchedule(schedules[idx].id);
        setShowModal(true);
    };
    const days = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
    ];
    const startHour = 7;
    const endHour = 22;
    const intervalHeight = 26; // px per half-hour
    // Group events by day

    console.log(schedules);

    const eventsByDay = days.map((_, i) =>
        schedules.filter((ev) => ev.day === i)
    );
    return (
        <main className="min-w-80">
            {showModal && (
                <ScheduleModal
                    scheduleID={selectedSchedule}
                    onClose={() => setShowModal(false)}
                    onOk={() => setShowModal(false)}
                />
            )}
            {/* Days row */}
            <div className="grid grid-cols-[80px_repeat(6,1fr)] max-h-screen">
                <div className="h-12" />
                {days.map((day) => (
                    <div
                        key={day}
                        className="border border-neutral-800 h-12 text-center flex flex-col items-center justify-center py-1"
                    >
                        {day}
                        <div className="text-xs relative w-fit text-neutral-500"></div>
                    </div>
                ))}
                {/* Time column */}
                <div>
                    {Array.from({ length: endHour - startHour }).map((_, i) => (
                        <div
                            key={i}
                            style={{ height: intervalHeight * 2 }}
                            className="border-b border-neutral-800 text-xs text-right pr-1 text-neutral-300 flex items-start"
                        >
                            {`${startHour + i}:00`}
                        </div>
                    ))}
                </div>
                {/* Schedule grid */}
                {days.map((day, dayIndex) => (
                    <div
                        key={day}
                        className="border-l border-r border-neutral-800"
                        style={{
                            position: "relative",
                            minHeight: `${
                                (endHour - startHour) * intervalHeight * 2
                            }px`,
                        }}
                    >
                        {Array.from({ length: endHour - startHour }).map(
                            (_, i) => (
                                <div
                                    key={i}
                                    style={{ height: intervalHeight * 2 }}
                                    className="border-b border-neutral-600"
                                />
                            )
                        )}
                        {/* Events for this day */}
                        {eventsByDay[dayIndex].map((schedule, index) => {
                            // Calculate top and height based on start and duration
                            const top =
                                (schedule.start - startHour) *
                                intervalHeight *
                                2;
                            const height =
                                schedule.duration * intervalHeight * 2;
                            return (
                                <div
                                    onClick={() =>
                                        handleClickSchedule(
                                            schedules.indexOf(schedule)
                                        )
                                    }
                                    key={schedule.id}
                                    className={`${
                                        schedule.type === "consultation"
                                            ? "bg-primary/80 border-blue-400/90"
                                            : schedule.type === "class"
                                            ? "bg-green-400/80 border-green-300/90"
                                            : schedule.type === "telecommuting"
                                            ? "bg-rose-400/80 border-rose-300/90"
                                            : "bg-gray-400/80 border-gray-300/90"
                                    } m-[2px] text-white p-2 text-xs border-l-8 rounded-l-xs absolute cursor-pointer`}
                                    style={{
                                        top,
                                        left: 0,
                                        right: 0,
                                        height,
                                        zIndex: 10,
                                    }}
                                >
                                    <div className="justify-between text-md hidden sm:flex flex-col">
                                        <span className="">
                                            {schedule.subject}
                                        </span>
                                        <span className="opacity-80 ">
                                            {`${schedule.start}:00`}
                                            <span className="mx-1 hidden md:inline">
                                                -
                                            </span>
                                            <br className="md:hidden inline" />
                                            {`${
                                                schedule.start +
                                                schedule.duration
                                            }:00`}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </main>
    );
}
