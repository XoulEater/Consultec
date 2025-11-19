import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Schedule } from "../lib/types";
import SubjectSelect from "./SubjectSelect";

const tabs = [
    { key: "class", label: "Clase" },
    { key: "consultation", label: "Consulta" },
    { key: "telecommuting", label: "Teletrabajo" },
    { key: "other", label: "Otro" },
    { key: "extern", label: "Externo" },

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
const subjects = [
    {
        code: "EM1600",
        name: "Tecnologías digitales aplicadas a la matemática educativa I",
    },
    { code: "EM1606", name: "Fundamentos de matemática II" },
    { code: "EM1607", name: "Didáctica de la geometría" },
    {
        code: "EM1613",
        name: "Tecnologías digitales aplicadas a la matemática educativa III",
    },
    { code: "EM1614", name: "Estadística inferencial" },
    { code: "EM2408", name: "Aprendizaje y didáctica de la matemática" },
    { code: "EM2603", name: "Cálculo y análisis I" },
    { code: "EM2604", name: "Geometría I" },
    { code: "EM2607", name: "Cálculo y análisis II" },
    {
        code: "EM2608",
        name: "Elementos de análisis de datos y probabilidad",
    },
    {
        code: "EM3048",
        name: "Atención a la diversidad en la enseñanza y el aprendizaje de la matemática",
    },
    { code: "EM3409", name: "Práctica docente" },
    { code: "EM3608", name: "Cálculo y análisis III" },
    { code: "EM4010", name: "Programación lineal" },
    { code: "EM4612", name: "Métodos numéricos" },
    { code: "MA0101", name: "Matemática general" },
    { code: "MA1102", name: "Cálculo diferencial e integral" },
    { code: "MA1103", name: "Cálculo y álgebra lineal" },
    { code: "MA1303", name: "Matemática básica para administración" },
    { code: "MA1304", name: "Cálculo para administración" },
    { code: "MA1403", name: "Matemática discreta" },
    { code: "MA2104", name: "Cálculo superior" },
    { code: "MA2105", name: "Ecuaciones diferenciales" },
    { code: "MA2117", name: "Cálculo y geometría analítica" },
    { code: "MA2404", name: "Probabilidades" },
    { code: "MA3106", name: "Métodos numéricos" },
    { code: "MA3405", name: "Estadística" },
];

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
    // Estado para la duración máxima (debe ir antes de cualquier return)
    const [maxDuration, setMaxDuration] = React.useState(intervals);

    const { register, control, handleSubmit, setValue, watch, reset } =
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
            // Si el tipo es extern u other, sincronizar el campo subject con name
            if (
                (values.type === "extern" || values.type === "other") &&
                values.name !== undefined &&
                values.subject !== values.name
            ) {
                // Actualiza el valor del form para que al enviar venga en subject
                setValue("subject", values.name as any);
            }
            if (onFormChange) {
                onFormChange(values);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, onFormChange, show, setValue]);

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
                        : currentType === "other"
                        ? "border-red-500"
                        : "border-gray-500"
                }`}
                style={{
                    left: newEventData
                        ? Math.min(newEventData.x + 10, window.innerWidth - 320)
                        : 100,
                    top: newEventData
                        ? Math.min(newEventData.y, window.innerHeight - 535)
                        : 100,
                }}
                onSubmit={handleSubmit((data) => {
                    // Al enviar, si el tipo es extern u other, guardar name en subject
                    if ((data.type === "extern" || data.type === "other") && data.name) {
                        data.subject = data.name;
                    }
                    onSubmit(data);
                })}
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
                                    ? tab.key === "class"
                                        ? "bg-green-500"
                                        : tab.key === "consultation"
                                        ? "bg-primary"
                                        : tab.key === "telecommuting"
                                        ? "bg-yellow-500"
                                        : tab.key === "other"
                                        ? "bg-red-500"
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
                <section className="flex flex-col gap-2 p-4 max-h-[400px] ">
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
                    {(currentType === "consultation" ||
                        currentType === "class") && (
                        <SubjectSelect
                            control={control}
                            name={"subject"}
                            subjects={subjects}
                            rules={{ required: true }}
                        />
                    )}
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
                </section>
                <div className="flex gap-2 mt-2 w-full justify-end p-4">
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
            </form>
        </>
    );
};

export default NewEventModal;
