import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Schedule } from "../lib/types";

const tabs = [
    { key: "class", label: "Clase" },
    { key: "consultation", label: "Consulta" },
    { key: "telecommuting", label: "Teletrabajo" },
    { key: "other", label: "Otro" },
];

interface NewEventModalProps {
    show: boolean;
    newEventData?: {
        day: number;
        start: number;
        x: number;
        y: number;
    };
    editEvent?: Schedule;
    onClose: () => void;
    onSubmit: (data: Schedule) => void;
    onFormChange?: (data: Partial<Schedule>) => void;
    intervals: number;
    events: Schedule[];
}

const NewEventModal: React.FC<NewEventModalProps> = ({
    show,
    newEventData,
    editEvent,
    onClose,
    onSubmit,
    onFormChange,
    intervals,
    events,
}) => {
    const subjects = [
        "Matemáticas",
        "Física",
        "Química",
        "Historia",
        "Lengua",
        "Inglés",
        "Programación",
    ];

    // Estado para la duración máxima (debe ir antes de cualquier return)
    const [maxDuration, setMaxDuration] = React.useState(intervals);

    const { register, handleSubmit, setValue, watch, reset } =
        useForm<Schedule>({
            defaultValues: {
                type: "class",
                subject: "",
                name: "",
                day: newEventData?.day ?? 0,
                start: newEventData?.start ?? 0,
                duration: 3,
                location: "",
                modality: "presencial",
                link: "",
            },
        });

    // Tabs
    const currentType = watch("type") || "class";
    const modalidad = watch("modality") || "presencial";
    const start = watch("start");
    const day = watch("day");

    // Live update form values to parent
    useEffect(() => {
        if (!show) return;
        const subscription = watch((values) => {
            if (onFormChange) {
                onFormChange(values);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, onFormChange, show]);

    useEffect(() => {
        if (show) {
            if (editEvent) {
                reset({
                    ...editEvent,
                    day: newEventData?.day ?? editEvent.day,
                    start: newEventData?.start ?? editEvent.start,
                });
            } else {
                reset({
                    type: "class",
                    subject: "",
                    name: "",
                    day: newEventData?.day ?? 0,
                    start: newEventData?.start ?? 0,
                    duration: 3,
                    location: "",
                    modality: "presencial",
                    link: "",
                });
            }
        }
    }, [show, newEventData, editEvent, reset]);

    // Recalcular duración máxima dinámicamente
    useEffect(() => {
        if (events && start !== undefined && day !== undefined) {
            const nextEvent = events
                .filter((ev: Schedule) => ev.day === day && ev.start > start)
                .sort((a: Schedule, b: Schedule) => a.start - b.start)[0];
            let newMax = intervals;
            if (nextEvent) {
                newMax = nextEvent.start - start;
            } else {
                newMax = intervals - start;
            }
            if (newMax < 1) newMax = 1;
            setMaxDuration(newMax);
            // Si la duración actual supera el máximo, ajusta el valor
            const currentDuration = watch("duration");
            if (currentDuration > newMax) {
                setValue("duration", newMax);
            }
        }
    }, [events, start, day, intervals, setValue, watch]);

    if (!show) return null;

    // Tab change
    const handleTabChange = (type: Schedule["type"]) => {
        setValue("type", type);
        // Clear fields not relevant
        setValue("modality", undefined);
        setValue("location", undefined);
        setValue("link", undefined);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/20 z-50" onClick={onClose} />
            <form
                className={`fixed bg-bgmain rounded shadow-md w-[390px] flex flex-col gap-2 z-50 border-t-4 ${
                    currentType === "class"
                        ? "border-green-500"
                        : currentType === "consultation"
                        ? "border-primary"
                        : currentType === "telecommuting"
                        ? "border-yellow-500"
                        : "border-gray-500"
                }`}
                style={{
                    left: newEventData
                        ? Math.min(newEventData.x + 10, window.innerWidth - 320)
                        : 100,
                    top: newEventData
                        ? Math.min(newEventData.y, window.innerHeight - 350)
                        : 100,
                }}
                onSubmit={handleSubmit(onSubmit)}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Tabs */}
                <div className="flex w-full ">
                    {tabs.map((tab) => (
                        <button
                            type="button"
                            key={tab.key}
                            className={` flex-1 py-2  ${
                                currentType === tab.key
                                    ? currentType === "class"
                                        ? "bg-green-500"
                                        : currentType === "consultation"
                                        ? "bg-primary"
                                        : currentType === "telecommuting"
                                        ? "bg-yellow-500"
                                        : "bg-gray-500"
                                    : "bg-bghover "
                            }`}
                            onClick={() =>
                                handleTabChange(tab.key as Schedule["type"])
                            }
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <section className="flex flex-col gap-2 p-4 max-h-[400px] overflow-y-auto">
                    {/* Common fields */}

                    <label>
                        <span className="text-dim">Nombre:</span>
                        <input
                            type="text"
                            placeholder="Nombre del evento"
                            required
                            {...register("name")}
                            className="w-full text-white border-1 rounded-lg border-hr focus:outline-secondary p-1"
                        />
                    </label>
                    <label>
                        <span className="text-dim">Duración:</span>
                        <input
                            type="number"
                            min={1}
                            max={maxDuration}
                            {...register("duration", {
                                valueAsNumber: true,
                                min: 1,
                                max: maxDuration,
                            })}
                            className="w-full text-white border-1 rounded-lg border-hr focus:outline-secondary p-1"
                        />
                    </label>

                    {/* Fields by type */}
                    {(currentType === "consultation" ||
                        currentType === "class") && (
                        <>
                            <label>
                                <span className="text-dim">Materia:</span>
                                <select
                                    {...register("subject", { required: true })}
                                    className="w-full p-2 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer focus:outline-secondary"
                                >
                                    <option value="">
                                        Selecciona una materia
                                    </option>
                                    {subjects.map((subject) => (
                                        <option key={subject} value={subject}>
                                            {subject}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <span className="text-dim">Modalidad:</span>
                                <select
                                    {...register("modality")}
                                    className="w-full p-2 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer focus:outline-primary"
                                >
                                    <option value="presencial">
                                        Presencial
                                    </option>
                                    <option value="virtual">Virtual</option>
                                </select>
                            </label>
                            {modalidad === "presencial" && (
                                <label>
                                    <span className="text-dim">Lugar:</span>
                                    <input
                                        type="text"
                                        {...register("location")}
                                        className="w-full text-white border-1 rounded-lg border-hr focus:outline-secondary p-1"
                                    />
                                </label>
                            )}
                            {modalidad === "virtual" && (
                                <label>
                                    <span className="text-dim">
                                        Enlace (opcional):
                                    </span>
                                    <input
                                        type="text"
                                        {...register("link")}
                                        className="w-full text-white border-1 rounded-lg border-hr focus:outline-secondary p-1"
                                    />
                                </label>
                            )}
                        </>
                    )}
                    <div className="flex gap-2 mt-2">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                            Crear
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 text-white px-3 py-1 rounded"
                        >
                            Cancelar
                        </button>
                    </div>
                </section>
            </form>
        </>
    );
};

export default NewEventModal;
