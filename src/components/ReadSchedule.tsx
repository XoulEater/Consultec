import { Schedule } from "@/lib/types";

import { useState, useEffect } from "react";
import ScheduleModal from "./ScheduleModal";
import { MobileScheduleList } from "./MobileScheduleList";
import { DesktopScheduleGrid } from "./DesktopScheduleGrid";

export function ReadSchedule({ schedules }: { schedules: Schedule[] }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<string | null>(
        null
    );
    const [isMobile, setIsMobile] = useState(false);

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
    const intervalHeight = 26;

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 800);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleClickSchedule = (idx: number) => {
        setSelectedSchedule(schedules[idx].id); // This line remains unchanged
        setShowModal(true);
    };
    const handleClickScheduleById = (id: string) => {
        setSelectedSchedule(id);
        setShowModal(true);
    };

    return (
        <main className="min-w-80">
            {showModal && (
                <ScheduleModal
                    scheduleID={selectedSchedule}
                    onClose={() => setShowModal(false)}
                    onOk={() => setShowModal(false)}
                />
            )}
            {isMobile ? (
                <MobileScheduleList
                    schedules={schedules}
                    days={days}
                    onEventClick={handleClickScheduleById}
                />
            ) : (
                <DesktopScheduleGrid
                    schedules={schedules}
                    days={days}
                    startHour={startHour}
                    endHour={endHour}
                    intervalHeight={intervalHeight}
                    onEventClick={handleClickScheduleById}
                />
            )}
        </main>
    );
}
