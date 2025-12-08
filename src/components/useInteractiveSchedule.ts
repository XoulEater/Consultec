import { useState, useRef, useEffect } from "react";
import {
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragStartEvent,
} from "@dnd-kit/core";

import { Schedule } from "@/lib/types";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const startour = 7;
const endHour = 22;
const intervalMinutes = 30;
const intervalHeight = 26;
const intervals = (endHour - startour) * (60 / intervalMinutes);

function hasCollision(
    events: Schedule[],
    day: number,
    start: number,
    duration: number,
    ignoreId: string
): boolean {
    return events.some((ev) => {
        if (ev.day !== day || ev._id === ignoreId) return false;
        return !(
            start + duration <= ev.start || start >= ev.start + ev.duration
        );
    });
}

interface props {
    schedule: Schedule[];
}

export function useInteractiveScheduleLogic({ schedule }: props) {
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [newEventData, setNewEventData] = useState<{
        day: number;
        start: number;
        x: number;
        y: number;
    } | null>(null);
    const [form, setForm] = useState({
        name: "",
        type: "class",
        duration: 2,
        subject: "",
        location: "",
        modality: "presencial",
        link: "",
    });
    const [events, setEvents] = useState<Schedule[]>(schedule);

    // Sincronizar events con schedule cada vez que schedule cambie
    useEffect(() => {
        // Solo actualizar si la longitud o el contenido realmente cambió
        if (
            schedule &&
            schedule.length >= 0 &&
            (events.length !== schedule.length ||
                JSON.stringify(events) !== JSON.stringify(schedule))
        ) {
            console.log(
                "Updating events from schedule:",
                schedule.length,
                "items"
            );
            setEvents(schedule);
        }
    }, [schedule]);

    // Evento temporal para edición en tiempo real
    const [tempForm, setTempForm] = useState<Partial<Schedule>>({});
    let tempEvent: Schedule | null = null;
    if (showNewEventModal && newEventData) {
        const source = Object.keys(tempForm).length ? tempForm : form;
        tempEvent = {
            _id: "temp",
            day: newEventData.day,
            start: newEventData.start,
            duration: source.duration || 1,
            name: source.name || "Nuevo evento",
            subject:
                source.type === "class" || source.type === "consultation"
                    ? source.subject || "Materia"
                    : "",
            type: [
                "class",
                "consultation",
                "telecommuting",
                "other",
                "extern",
            ].includes(source.type as string)
                ? (source.type as Schedule["type"])
                : "class",
            location: source.location ?? "",
            modality: source.modality ?? "presencial",
            link: source.link ?? "",
        };
    }
    const [activeId, setActiveId] = useState<string | null>(null);
    const columnRef = useRef<HTMLDivElement>(null);
    const [columnWidth, setColumnWidth] = useState<number>(150);

    useEffect(() => {
        function updateColumnWidth() {
            if (columnRef.current) {
                setColumnWidth(columnRef.current.offsetWidth);
            }
        }
        updateColumnWidth();
        window.addEventListener("resize", updateColumnWidth);
        return () => window.removeEventListener("resize", updateColumnWidth);
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        })
    );

    function handleDragStart(event: DragStartEvent) {
        setActiveId(event.active.id as string);
    }

    function handleDragEnd({ active, delta }: DragEndEvent) {
        setEvents((prev) => {
            return prev.map((ev) => {
                if (ev._id !== active.id) return ev;
                let newDay = ev.day + Math.round(delta.x / columnWidth);
                let newStart = ev.start + Math.round(delta.y / intervalHeight);
                newDay = Math.max(0, Math.min(days.length - 1, newDay));
                newStart = Math.max(
                    0,
                    Math.min(intervals - ev.duration, newStart)
                );
                if (
                    !hasCollision(prev, newDay, newStart, ev.duration, ev._id)
                ) {
                    return { ...ev, day: newDay, start: newStart };
                }
                return ev;
            });
        });
        setActiveId(null);
    }

    function handleResize(e: React.MouseEvent, delta: number, eventId: string) {
        if (!eventId) return;
        setEvents((prev) =>
            prev.map((ev) => {
                if (ev._id !== eventId) return ev;
                let newDuration = Math.max(1, ev.duration + delta);
                if (ev.start + newDuration > intervals) {
                    newDuration = intervals - ev.start;
                }
                if (
                    !hasCollision(prev, ev.day, ev.start, newDuration, ev._id)
                ) {
                    return { ...ev, duration: newDuration };
                }
                return ev;
            })
        );
    }

    function handleGridClick(
        dayIndex: number,
        e: React.MouseEvent<HTMLDivElement>
    ) {
        const rect = e.currentTarget.getBoundingClientRect();
        const side = dayIndex >= 3 ? rect.left - 493 : rect.right - 7;
        let y =
            rect.top +
            (e.clientY - rect.top) -
            ((e.clientY - rect.top) % intervalHeight);
        const x = Math.min(side, window.innerWidth - 320);
        const intervalIdx = Math.floor((y - rect.top) / intervalHeight);
        const hasEvent = events.some(
            (ev) =>
                ev.day === dayIndex &&
                intervalIdx >= ev.start &&
                intervalIdx < ev.start + ev.duration
        );
        if (hasEvent) return;
        setEditEventId(null); // Limpiar edición
        // Ajustar para que el modal no se salga por abajo
        let modalHeight = 390;
        const modal = document.querySelector("form.bg-bgmain");
        if (modal) {
            modalHeight = (modal as HTMLElement).offsetHeight || 390;
        }
        if (y + modalHeight > window.innerHeight) {
            y = window.innerHeight - modalHeight - 10;
            if (y < 0) y = 10;
        }
        setNewEventData({
            day: dayIndex,
            start: intervalIdx,
            x: x,
            y: y,
        });
        setForm({
            name: "",
            type: "class",
            duration: 2,
            subject: "",
            location: "",
            modality: "presencial",
            link: "",
        });
        setShowNewEventModal(true);
    }

    // Si editEventId está presente, se edita, si no, se crea
    const [editEventId, setEditEventId] = useState<string | null>(null);

    function handleNewEventSubmit(data: Schedule) {
        if (!newEventData) return;
        if (editEventId) {
            // Editar evento existente
            setEvents((prev) =>
                prev.map((ev) =>
                    ev._id === editEventId
                        ? {
                              ...ev,
                              ...data,
                              day: newEventData.day,
                              start: newEventData.start,
                              duration: data.duration,
                              type: ([
                                  "class",
                                  "consultation",
                                  "telecommuting",
                                  "extern",
                                  "other",
                              ].includes(data.type)
                                  ? data.type
                                  : "class") as Schedule["type"],
                          }
                        : ev
                )
            );
        } else {
            // Crear nuevo evento
            const newEvent: Schedule = {
                ...data,
                _id: Date.now().toString(),
                day: newEventData.day,
                start: newEventData.start,
                type: ([
                    "class",
                    "consultation",
                    "telecommuting",
                    "extern",
                    "other",
                ].includes(data.type)
                    ? data.type
                    : "class") as Schedule["type"],
            };
            if (
                !hasCollision(
                    events,
                    newEvent.day,
                    newEvent.start,
                    newEvent.duration,
                    newEvent._id
                )
            ) {
                setEvents((prev) => [...prev, newEvent]);
            }
        }
        setShowNewEventModal(false);
        setNewEventData(null);
        setEditEventId(null);
    }
    function handleEditEvent(id: string) {
        const ev = events.find((e) => e._id === id);
        if (!ev) return;
        setEditEventId(id);
        setForm({
            name: ev.name ?? "",
            type: ev.type,
            duration: ev.duration,
            subject: ev.subject,
            location: ev.location ?? "",
            modality: ev.modality ?? "presencial",
            link: ev.link ?? "",
        });
        setTimeout(() => {
            const el = document.querySelector(`[data-event-id='${id}']`);
            let modalHeight = 390;
            // Intentar obtener el alto real del modal si ya existe
            const modal = document.querySelector("form.bg-bgmain");
            if (modal) {
                modalHeight =
                    (modal as HTMLElement).offsetHeight || modalHeight;
            }
            if (el) {
                const rect = el.getBoundingClientRect();
                // Usar la misma lógica de lado que en handleGridClick
                const dayIndex = ev.day;
                const side = dayIndex >= 3 ? rect.left - 496 : rect.right - 3;
                const x = Math.min(side, window.innerWidth - 320);
                let y = rect.top;
                console.log(
                    "Modal height:",
                    modalHeight,
                    "Event top:",
                    window.innerHeight
                );
                if (y + modalHeight > window.innerHeight) {
                    y = window.innerHeight - modalHeight - 10;
                    if (y < 0) y = 10;
                }
                setNewEventData({
                    day: ev.day,
                    start: ev.start,
                    x,
                    y,
                });
            } else {
                setNewEventData({
                    day: ev.day,
                    start: ev.start,
                    x: 200,
                    y: 200,
                });
            }
            setShowNewEventModal(true);
        }, 0);
    }

    function handleDeleteEvent(id: string) {
        setEvents((prev) => prev.filter((ev) => ev._id !== id));
    }

    function handleDuplicateEvent(id: string) {
        setEvents((prev) => {
            const ev = prev.find((e) => e._id === id);
            if (!ev) return prev;
            // Buscar el siguiente hueco disponible en el mismo día
            let newStart = ev.start + ev.duration;
            while (
                prev.some(
                    (e) =>
                        e.day === ev.day &&
                        ((newStart >= e.start &&
                            newStart < e.start + e.duration) ||
                            (newStart + ev.duration > e.start &&
                                newStart + ev.duration <= e.start + e.duration))
                )
            ) {
                newStart++;
                if (newStart + ev.duration > intervals) {
                    // Si no hay espacio, no duplicar
                    return prev;
                }
            }
            return [
                ...prev,
                {
                    ...ev,
                    _id: Date.now().toString(),
                    start: newStart,
                },
            ];
        });
    }

    return {
        showNewEventModal,
        setShowNewEventModal,
        newEventData,
        setNewEventData,
        form,
        setForm,
        events,
        setEvents,
        tempEvent,
        setTempForm,
        activeId,
        setActiveId,
        columnRef,
        columnWidth,
        setColumnWidth,
        sensors,
        handleDragStart,
        handleDragEnd,
        handleResize,
        handleGridClick,
        handleNewEventSubmit,
        handleDeleteEvent,
        handleEditEvent,
        handleDuplicateEvent,
        setEditEventId,
        days,
        startour,
        endHour,
        intervalMinutes,
        intervalHeight,
        intervals,
        editEventId,
    };
}
