import React, { useState } from "react";

import { EventType } from "./weeklyCalendar/DraggableEvent";

interface NewEventModalProps {
    show: boolean;
    newEventData: { day: number; start: number; x: number; y: number } | null;
    form: any;
    setForm: React.Dispatch<React.SetStateAction<any>>;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
    intervals: number;
    events: EventType[];
}

const NewEventModal: React.FC<NewEventModalProps> = ({
    show,
    newEventData,
    form,
    setForm,
    onClose,
    onSubmit,
    intervals,
    events,
}) => {
    if (!show) return null;

    // Tabs: class, consultation, telecommuting, other
    const tabs = [
        { key: "class", label: "Clase" },
        { key: "consultation", label: "Consulta" },
        { key: "telecommuting", label: "Teletrabajo" },
        { key: "other", label: "Otro" },
    ];

    // Si el form no tiene type, default a class
    const currentType = form.type || "class";

    // Manejar cambio de tab
    const handleTabChange = (type: string) => {
        setForm((f: any) => ({
            ...f,
            type,
            // Limpiar campos que no aplican
            modalidad: undefined,
            lugar: undefined,
            enlace: undefined,
            medio: undefined,
            curso: undefined,
        }));
    };

    // Calcular duración máxima posible sin colisión
    let maxDuration = intervals;
    if (newEventData && events) {
        const { day, start } = newEventData;
        // Buscar el siguiente evento en el mismo día después del inicio
        const nextEvent = events
            .filter((ev: EventType) => ev.day === day && ev.start > start)
            .sort((a: EventType, b: EventType) => a.start - b.start)[0];
        if (nextEvent) {
            maxDuration = nextEvent.start - start;
        } else {
            maxDuration = intervals - start;
        }
        // No permitir duración menor a 1
        if (maxDuration < 1) maxDuration = 1;
    }

    return (
        <>
            {/* Fondo oscuro */}
            <div className="fixed inset-0 bg-black/20 z-50" onClick={onClose} />
            {/* Modal posicionado */}
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
                onSubmit={onSubmit}
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
                            onClick={() => handleTabChange(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <section className="flex flex-col gap-2 p-4 max-h-[400px] overflow-y-auto">
                    {/* Campos comunes */}
                    <label>
                        <span className="text-dim">Nombre:</span>
                        <input
                            type="text"
                            value={form.name || ""}
                            onChange={(e) =>
                                setForm((f: any) => ({
                                    ...f,
                                    name: e.target.value,
                                }))
                            }
                            className="  w-full text-white border-1 rounded-lg  border-hr focus:outline-secondary p-1 "
                        />
                    </label>
                    <label>
                        <span className="text-dim">Duración:</span>
                        <input
                            type="number"
                            min={1}
                            max={maxDuration}
                            value={form.duration || 1}
                            onChange={(e) => {
                                let val = Number(e.target.value);
                                if (val > maxDuration) val = maxDuration;
                                if (val < 1) val = 1;
                                setForm((f: any) => ({
                                    ...f,
                                    duration: val,
                                }));
                            }}
                            className="  w-full text-white border-1 rounded-lg  border-hr focus:outline-secondary p-1 "
                        />
                    </label>

                    {/* Formulario por tipo */}
                    {currentType === "consultation" && (
                        <>
                            <label>
                                <span className="text-dim">Modalidad:</span>
                                <select
                                    value={form.modalidad || "presencial"}
                                    onChange={(e) =>
                                        setForm((f: any) => ({
                                            ...f,
                                            modalidad: e.target.value,
                                        }))
                                    }
                                    className="   w-full p-2 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer focus:outline-primary "
                                >
                                    <option value="presencial">
                                        Presencial
                                    </option>
                                    <option value="virtual">Virtual</option>
                                </select>
                            </label>
                            {form.modalidad === "presencial" && (
                                <label>
                                    <span className="text-dim">Lugar:</span>
                                    <input
                                        type="text"
                                        value={form.lugar || ""}
                                        onChange={(e) =>
                                            setForm((f: any) => ({
                                                ...f,
                                                lugar: e.target.value,
                                            }))
                                        }
                                        className="  w-full text-white border-1 rounded-lg  border-hr focus:outline-secondary p-1 "
                                    />
                                </label>
                            )}
                            {form.modalidad === "virtual" && (
                                <>
                                    <label>
                                        <span className="text-dim">
                                            Enlace (opcional):
                                        </span>
                                        <input
                                            type="text"
                                            value={form.enlace || ""}
                                            onChange={(e) =>
                                                setForm((f: any) => ({
                                                    ...f,
                                                    enlace: e.target.value,
                                                }))
                                            }
                                            className=" w-full text-white border-1 rounded-lg  border-hr focus:outline-secondary p-1"
                                        />
                                    </label>
                                    <label>
                                        <span className="text-dim">
                                            Medio (opcional):
                                        </span>
                                        <input
                                            type="text"
                                            value={form.medio || ""}
                                            onChange={(e) =>
                                                setForm((f: any) => ({
                                                    ...f,
                                                    medio: e.target.value,
                                                }))
                                            }
                                            className="  w-full text-white border-1 rounded-lg  border-hr focus:outline-secondary p-1 "
                                        />
                                    </label>
                                </>
                            )}
                            <label>
                                <span className="text-dim">Curso:</span>
                                <input
                                    type="text"
                                    value={form.curso || ""}
                                    onChange={(e) =>
                                        setForm((f: any) => ({
                                            ...f,
                                            curso: e.target.value,
                                        }))
                                    }
                                    className="  w-full text-white border-1 rounded-lg  border-hr focus:outline-secondary p-1 "
                                />
                            </label>
                        </>
                    )}
                    {currentType === "class" && (
                        <>
                            <label>
                                <span className="text-dim">Modalidad:</span>
                                <select
                                    value={form.modalidad || "presencial"}
                                    onChange={(e) =>
                                        setForm((f: any) => ({
                                            ...f,
                                            modalidad: e.target.value,
                                        }))
                                    }
                                    className="  w-full p-2 text-gray-500 bg-bgmain border border-hr rounded-lg cursor-pointer focus:outline-primary "
                                >
                                    <option value="presencial">
                                        Presencial
                                    </option>
                                    <option value="virtual">Virtual</option>
                                </select>
                            </label>
                            {form.modalidad === "presencial" && (
                                <label>
                                    <span className="text-dim">Lugar:</span>
                                    <input
                                        type="text"
                                        value={form.lugar || ""}
                                        onChange={(e) =>
                                            setForm((f: any) => ({
                                                ...f,
                                                lugar: e.target.value,
                                            }))
                                        }
                                        className="  w-full text-white border-1 rounded-lg  border-hr focus:outline-secondary p-1 "
                                    />
                                </label>
                            )}
                            <label>
                                <span className="text-dim">Curso:</span>
                                <input
                                    type="text"
                                    value={form.curso || ""}
                                    onChange={(e) =>
                                        setForm((f: any) => ({
                                            ...f,
                                            curso: e.target.value,
                                        }))
                                    }
                                    className="  w-full text-white border-1 rounded-lg  border-hr focus:outline-secondary p-1 "
                                />
                            </label>
                        </>
                    )}
                    {/* Teletrabajo y Externo no tienen campos extra */}

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
