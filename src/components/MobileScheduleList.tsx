import { codeToName, Schedule } from "@/lib/types";

export function MobileScheduleList({
    schedules,
    days,
    onEventClick,
}: {
    schedules: Schedule[];
    days: string[];
    onEventClick: (schedule: Schedule) => void;
}) {
    // Agrupar eventos por día
    const eventsByDay = days.map((_, i) =>
        schedules.filter((ev) => ev.day === i)
    );

    return (
        <div className="flex flex-col gap-4">
            {days.map((day, dayIdx) => (
                <div key={day}>
                    {eventsByDay[dayIdx].length > 0 && (
                        <>
                            <div className="font-bold text-lg text-primary mb-2 border-b border-hr pb-1">
                                {day}
                            </div>

                            <ul className="flex flex-col gap-2">
                                {eventsByDay[dayIdx].map((schedule, idx) => (
                                    <li
                                        key={schedule._id}
                                        className={`p-3 rounded border-l-4 shadow cursor-pointer transition hover:bg-neutral-100 ${
                                            schedule.type === "consultation"
                                                    ? "bg-primary/80 border-blue-400/90"
                                                    : schedule.type === "class"
                                                    ? "bg-green-400/80 border-green-300/90"
                                                    : schedule.type ===
                                                        "telecommuting"
                                                    ? "bg-rose-400/80 border-rose-300/90"
                                                    : schedule.type === "extern"
                                                    ? "bg-gray-400/80 border-gray-300/90"
                                                    : "bg-red-400/80 border-red-300/90"
                                        }`}
                                        onClick={() => onEventClick(schedule)}
                                    >
                                        <div className="font-semibold">
                                            {codeToName[schedule.subject]}
                                        </div>
                                        <div className="text-xs opacity-80">
                                            {`${
                                                Math.floor(schedule.start / 2) +
                                                7
                                            }:${
                                                schedule.start % 2 === 0
                                                    ? "00"
                                                    : "30"
                                            }`}
                                            <span className="mx-1">-</span>
                                            {`${Math.floor(
                                                schedule.start / 2 +
                                                    schedule.duration / 2 +
                                                    7
                                            )}:${
                                                Math.floor(
                                                    schedule.start +
                                                        schedule.duration
                                                ) %
                                                    2 ===
                                                0
                                                    ? "00"
                                                    : "30"
                                            }`}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
