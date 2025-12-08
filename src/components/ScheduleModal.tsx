import { codeToName, Schedule, ScheduleDetail } from "@/lib/types";
import { getScheduleById } from "@/services/schedule.service";
import { useEffect, useRef, useState } from "react";

const translateType = {
    class: "Clase",
    consultation: "Consulta",
    telecommuting: "Teletrabajo",
    extern: "Externo",
    other: "Otro",
};

type Props = {
    onClose: () => void;
    onOk: () => void;
    schedule?: Schedule | null;
};

const DAYS = [, "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

function ScheduleModal({ onClose, onOk, schedule }: Props) {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
        ) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (!schedule) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
            <div
                ref={modalRef}
                className={`bg-bgmain/90  backdrop-blur-md border-t-4 pb-10 p-6 
                    ${
                        schedule.type === "consultation"
                            ? "border-primary/90"
                            : schedule.type === "class"
                            ? "border-green-400/90"
                            : schedule.type === "telecommuting"
                            ? "border-rose-400/90"
                            : schedule.type === "extern"
                            ? "border-gray-400/90"
                            : "border-red-400/90"
                    } rounded-md ring-black/10 ring-2  flex flex-col gap-6  w-full max-w-lg`}
            >
                <header className="text-xl font-medium flex justify-between items-start">
                    <span>{`${translateType[schedule.type]}: ${
                        codeToName[schedule.subject] || schedule.subject
                    }`}</span>
                    <button
                        className="cursor-pointer"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        <img src="/icons/close.svg" alt="" />
                    </button>
                </header>

                {schedule.link && (
                    <>
                        <hr className="border-hr" />
                        <section className="">
                            <a
                                className="group relative inline-flex py-2  items-center justify-center overflow-hidden rounded-md bg-primary px-4 font-medium text-neutral-200 duration-70000"
                                href={schedule.link}
                                target="_blank"
                            >
                                <div className="relative inline-flex -translate-x-0 items-center transition group-hover:translate-x-6">
                                    <div className="absolute -translate-x-4 opacity-0 transition group-hover:-translate-x-6 group-hover:opacity-100">
                                        <img src="/icons/meet.svg" alt="" />
                                    </div>
                                    <span className="pr-8 pl-2">Unirse</span>
                                    <div className="absolute right-0 translate-x-0 opacity-100 transition group-hover:translate-x-4 group-hover:opacity-0">
                                        <img src="/icons/open.svg" alt="" />
                                    </div>
                                </div>
                            </a>
                        </section>
                    </>
                )}
                <hr className="border-hr" />
                <section className="pl-6 flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                        <img src="/icons/time.svg" alt="" />
                        <span>
                            {`${DAYS[schedule.day]},
                             de ${Math.floor(schedule.start / 2) + 7}:${
                                schedule.start % 2 === 0 ? "00" : "30"
                            }`}{" "}
                            a{" "}
                            {`${Math.floor(
                                schedule.start / 2 + schedule.duration / 2 + 7
                            )}:${
                                Math.floor(schedule.start + schedule.duration) %
                                    2 ===
                                0
                                    ? "00"
                                    : "30"
                            }`}
                        </span>
                    </div>
                    <hr className="border-hr" />
                    <div className="flex flex-row gap-4">
                        <img src="/icons/location.svg" alt="" />
                        <span>
                            {schedule.location} {schedule.modality}
                        </span>
                    </div>
                </section>
                <span className="self-end text-xs text-hr/70 -mb-4">
                    {schedule._id}
                </span>
            </div>
        </div>
    );
}

export default ScheduleModal;
