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

    return (
        <main className="min-w-80">
            {showModal && (
                <ScheduleModal
                    scheduleID={selectedSchedule}
                    onClose={() => setShowModal(false)}
                    onOk={() => setShowModal(false)}
                />
            )}
            {/* Calendario semanal */}
            <div>
                <div className="grid grid-cols-6 md:ml-14 ml-[18px]   justify-items-center">
                    <span>
                        L<span className="hidden md:inline">unes</span>
                    </span>
                    <span>
                        M<span className="hidden md:inline">artes</span>
                    </span>
                    <span>
                        M<span className="hidden md:inline">iércoles</span>
                    </span>
                    <span>
                        J<span className="hidden md:inline">ueves</span>
                    </span>
                    <span>
                        V<span className="hidden md:inline">iernes</span>
                    </span>
                    <span>
                        S<span className="hidden md:inline">ábado</span>
                    </span>{" "}
                </div>
            </div>

            <div
                className="relative h-[84vh] overflow-y-auto pb-14 lg:pb-0
            "
            >
                <div className="absolute grid grid-cols-[18px_1fr_1fr_1fr_1fr_1fr_1fr]  md:grid-cols-[56px_1fr_1fr_1fr_1fr_1fr_1fr] grid-rows-[repeat(96,12px)] gap-0 z-10  w-full  ">
                    {schedules.map((schedule, index) => (
                        <div
                            onClick={() => handleClickSchedule(index)}
                            key={index + schedule.subject}
                            className={`${
                                schedule.type === "consultation"
                                    ? "bg-primary/80 border-blue-400/90"
                                    : schedule.type === "class"
                                    ? "bg-green-400/80 border-green-300/90"
                                    : schedule.type === "telecommuting"
                                    ? "bg-rose-400/80 border-rose-300/90"
                                    : "bg-gray-400/80 border-gray-300/90"
                            } m-[2px] text-white p-2  text-xs border-l-8  rounded-l-xs`}
                            style={{
                                gridColumnStart: `${schedule.day + 1}`,
                                gridRowStart: `${
                                    (schedule.starth - 7) * 6 +
                                    (schedule.startm + 1)
                                }`,
                                height: `${schedule.duration * 12 * 6}px`,
                            }}
                        >
                            <div className="justify-between  text-md hidden sm:flex flex-col">
                                <span className="">{schedule.subject}</span>
                                <span className="opacity-80 ">
                                    {schedule.starth +
                                        ":" +
                                        schedule.startm +
                                        "0"}
                                    <span className="mx-1 hidden md:inline">
                                        -
                                    </span>
                                    <br className="md:hidden inline" />
                                    {schedule.starth +
                                        schedule.duration +
                                        ":" +
                                        (schedule.startm === 0
                                            ? 5
                                            : schedule.startm - 1) +
                                        "0"}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-[18px_1fr_1fr_1fr_1fr_1fr_1fr]  md:grid-cols-[56px_1fr_1fr_1fr_1fr_1fr_1fr] gap-0  ">
                    {[...Array(16)].map((_, hour) => (
                        <>
                            <span
                                key={hour}
                                className="text-sm h-3 justify-self-end mr-1 -mt-1"
                            >
                                {7 + hour}
                                <span className="hidden md:inline">:00</span>
                            </span>
                            {[...Array(6).fill(null)].map((_, index) => (
                                <span
                                    onClick={() =>
                                        console.log(
                                            `${days[index]}(${7 + hour}:00)`
                                        )
                                    }
                                    key={`${days[index]}(${7 + hour}:00)`}
                                    className={`h-3 border-t border-x border-hr  ${
                                        index > 4 ? "bg-bghover" : ""
                                    }`}
                                ></span>
                            ))}

                            {[...Array(4)].map((_, rowIndex) => (
                                <Fragment key={`${hour}-${rowIndex}`}>
                                    <span
                                        key={`${hour}-${rowIndex}-space`}
                                    ></span>
                                    {[...Array(6).fill(null)].map(
                                        (_, index) => (
                                            <span
                                                onClick={() =>
                                                    console.log(
                                                        `${days[index]}(${
                                                            7 + hour
                                                        }-${rowIndex + 1}0)`
                                                    )
                                                }
                                                key={`${hour}-${rowIndex}-${
                                                    days[index]
                                                }(${7 + hour}-${
                                                    rowIndex + 1
                                                }0)`}
                                                className={`h-3 border-x border-hr  ${
                                                    index > 4
                                                        ? "bg-bghover"
                                                        : ""
                                                }`}
                                            ></span>
                                        )
                                    )}
                                </Fragment>
                            ))}
                            <span key={hour + "space"}></span>
                            {[...Array(6).fill(null)].map((_, index) => (
                                <span
                                    onClick={() =>
                                        console.log(
                                            `${days[index]}(${7 + hour}:50)`
                                        )
                                    }
                                    key={`${hour}-${days[index]}(${
                                        7 + hour
                                    }:50)`}
                                    className={`h-3 border-b border-x border-hr  ${
                                        index > 4 ? "bg-bghover" : ""
                                    }`}
                                ></span>
                            ))}
                        </>
                    ))}
                </div>
            </div>
        </main>
    );
}
