"use client";
import { BackButton } from "@/components/BackButton";
import { ReadSchedule } from "@/components/ReadSchedule";
import { useParams } from "next/navigation";
import type { Schedule } from "@/lib/types";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { showAlert } from "@/store/alertSlice";
import AlertModal from "@/components/AlertModal";
import { getScheduleByTeacherId } from "@/services/schedule.service";
import WeeklyCalendar from "@/components/InteractiveSchedule";
import { set } from "react-hook-form";
import { json } from "stream/consumers";

export default function Schedule() {
    const { id } = useParams();
    const teacherId: string = "680f083ea4c49105539a8ffa";
    // Eliminar estado schedule, solo usar draft y original
    const [original, setOriginal] = useState<Schedule[] | null>(null);
    const [draft, setDraft] = useState<Schedule[] | null>(null);
    const [isUnsaved, setIsUnsaved] = useState(false);

    const fetchSchedule = async () => {
        try {
            const response = (await getScheduleByTeacherId(
                teacherId
            )) as Schedule[];
            const data: Schedule[] = [
                {
                    name: "Clase de Matemáticas",
                    id: "1",
                    subject: "Matemáticas",
                    start: 8,
                    duration: 4,
                    type: "class",
                    day: 0,
                },
                {
                    name: "Clase de Historia",
                    id: "2",
                    subject: "Historia",
                    start: 10,
                    duration: 4,
                    type: "class",
                    day: 1,
                },
            ];
            const draftStr = sessionStorage.getItem("calendar-draft");
            const originalStr = sessionStorage.getItem("calendar-original");
            let draftArr: Schedule[] = [];
            if (draftStr) {
                draftArr = JSON.parse(draftStr);
            }
            if (
                originalStr !== draftStr &&
                originalStr !== JSON.stringify(data)
            ) {
                setIsUnsaved(true);
            }
            if (
                originalStr === JSON.stringify(data) &&
                draftArr &&
                draftArr.length > 0
            ) {
                setDraft(draftStr ? draftArr : data);
                sessionStorage.setItem(
                    "calendar-original",
                    JSON.stringify(data)
                );
                setOriginal(data);
                return;
            }
            sessionStorage.setItem("calendar-original", JSON.stringify(data));
            sessionStorage.setItem("calendar-draft", JSON.stringify(data));
            setOriginal(data);
            setDraft(data);
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    };
    useEffect(() => {
        fetchSchedule();
    }, []);

    const dispatch = useAppDispatch();

    const handleReset = () => {
        dispatch(
            showAlert({
                message:
                    "¿Restablecer el horario? Se perderán los cambios no guardados.",
                type: "confirm",
                confirmText: "Restablecer",
                cancelText: "Cancelar",
                onConfirm: () => {
                    const data = JSON.parse(
                        sessionStorage.getItem("calendar-original") || "[]"
                    );
                    sessionStorage.setItem(
                        "calendar-draft",
                        JSON.stringify(data)
                    );
                    setDraft(data);
                    setIsUnsaved(false);
                    dispatch(
                        showAlert({
                            message:
                                "Borrador restablecido a los cambios originales.",
                            type: "info",
                        })
                    );
                },
            })
        );
    };

    const handleSave = () => {
        if (draft) setOriginal(draft);
        setIsUnsaved(false);
        dispatch(
            showAlert({
                message: "Cambios guardados exitosamente.",
                type: "info",
            })
        );
        // Aquí iría la lógica para guardar en backend si es necesario
    };

    const handleClean = () => {
        dispatch(
            showAlert({
                message:
                    "¿Limpiar el horario? Esta acción eliminará todos los eventos del horario.",
                type: "confirm",
                confirmText: "Limpiar",
                cancelText: "Cancelar",
                onConfirm: () => {
                    setDraft([]);
                    setIsUnsaved(true);
                    sessionStorage.setItem(
                        "calendar-draft",
                        JSON.stringify([])
                    );
                },
            })
        );
    };

    return (
        <div className=" flex flex-col gap-2 ">
            <AlertModal />
            <header className="flex gap-4 justify-between items-center pb-2">
                <h1 className="text-xl font-medium flex items-center  gap-2">
                    <BackButton />
                    Edición de Horario
                    {isUnsaved && (
                        <span className="text-yellow-500 text-lg font-semibold">
                            {" "}
                            Borrador (no guardado)
                        </span>
                    )}
                </h1>
                <div className="flex gap-4">
                    {draft && draft.length > 0 && (
                        <button
                            className=" px-2 py-2 rounded bg-gray-300 text-gray-800 hover:scale-105 hover:shadow-lg transition-all duration-200"
                            onClick={handleClean}
                        >
                            Limpiar
                        </button>
                    )}
                    {isUnsaved && (
                        <>
                            <button
                                className=" px-2 py-2 rounded bg-gray-300 text-gray-800 hover:scale-105 hover:shadow-lg transition-all duration-200"
                                onClick={handleReset}
                            >
                                Restablecer Cambios
                            </button>
                            <button
                                className=" px-2 py-2 rounded bg-primary text-white hover:scale-105 hover:shadow-lg transition-all duration-200"
                                onClick={() => {
                                    /* lógica pendiente */
                                }}
                            >
                                Guardar
                            </button>
                        </>
                    )}
                </div>
            </header>
            <hr className="border-hr" />
            {draft && (
                <WeeklyCalendar
                    schedule={draft}
                    onChange={(newDraft: Schedule[]) => {
                        if (
                            draft &&
                            JSON.stringify(draft) !==
                                JSON.stringify(newDraft) &&
                            original &&
                            JSON.stringify(original) !==
                                JSON.stringify(newDraft)
                        ) {
                            setDraft(newDraft);
                            sessionStorage.setItem(
                                "calendar-draft",
                                JSON.stringify(newDraft)
                            );
                            setIsUnsaved(true);
                        } else if (
                            original &&
                            JSON.stringify(original) ===
                                JSON.stringify(newDraft)
                        ) {
                            setIsUnsaved(false);
                        }
                    }}
                />
            )}
        </div>
    );
}
