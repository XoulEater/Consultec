import { useState, useRef, useEffect } from "react";
import {
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
    DragStartEvent,
} from "@dnd-kit/core";
import { EventType } from "./DraggableEvent";

const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const startHour = 7;
const endHour = 22;
const intervalMinutes = 30;
const intervalHeight = 30;
const intervals = (endHour - startHour) * (60 / intervalMinutes);

function hasCollision(
    events: EventType[],
    day: number,
    start: number,
    duration: number,
    ignoreId: string
): boolean {
    return events.some((ev) => {
        if (ev.day !== day || ev.id === ignoreId) return false;
        return !(
            start + duration <= ev.start || start >= ev.start + ev.duration
        );
    });
}

export function useWeeklyCalendarLogic() {
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
    });
    const [events, setEvents] = useState<EventType[]>(() => {
        const saved = sessionStorage.getItem("calendar-events");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                // fallback to default
            }
        }
        return [
            {
                id: "1",
                day: 1,
                start: 1,
                duration: 4,
                name: "Matemáticas",
                type: "class",
            },
            {
                id: "2",
                day: 0,
                start: 1,
                duration: 8,
                name: "Consejo",
                type: "other",
                disabled: true,
            },
        ];
    });
    // Guardar eventos en sessionStorage al cambiar
    useEffect(() => {
        sessionStorage.setItem("calendar-events", JSON.stringify(events));
    }, [events]);

    // Evento temporal para edición en tiempo real
    let tempEvent: EventType | null = null;
    if (showNewEventModal && newEventData) {
        tempEvent = {
            id: "temp",
            day: newEventData.day,
            start: newEventData.start,
            duration: form.duration || 1,
            name: form.name || "Nuevo evento",
            type: (["class", "consultation", "telecommuting", "other"].includes(
                form.type
            )
                ? form.type
                : "class") as EventType["type"],
            // Se pueden agregar más campos si se usan en DraggableEvent
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
                if (ev.id !== active.id) return ev;
                let newDay = ev.day + Math.round(delta.x / columnWidth);
                let newStart = ev.start + Math.round(delta.y / intervalHeight);
                newDay = Math.max(0, Math.min(days.length - 1, newDay));
                newStart = Math.max(
                    0,
                    Math.min(intervals - ev.duration, newStart)
                );
                if (!hasCollision(prev, newDay, newStart, ev.duration, ev.id)) {
                    return { ...ev, day: newDay, start: newStart };
                }
                return ev;
            });
        });
        setActiveId(null);
    }

    const handleResize = (e: React.MouseEvent, delta: number) => {
        console.log("Resizing by", delta);
        const eventId = (
            e.currentTarget.parentElement?.parentElement?.querySelector(
                "header"
            )?.textContent || ""
        ).replace("Evento ", "");

        setEvents((prev) =>
            prev.map((ev) => {
                if (ev.id !== eventId) return ev;
                let newDuration = Math.max(1, ev.duration + delta);
                if (ev.start + newDuration > intervals) {
                    newDuration = intervals - ev.start;
                }
                if (!hasCollision(prev, ev.day, ev.start, newDuration, ev.id)) {
                    return { ...ev, duration: newDuration };
                }
                return ev;
            })
        );
    };

    function handleGridClick(
        dayIndex: number,
        e: React.MouseEvent<HTMLDivElement>
    ) {
        const rect = e.currentTarget.getBoundingClientRect();
        const side = dayIndex >= 3 ? rect.left - 405 : rect.right;
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
        const modal = document.querySelector('form.bg-bgmain');
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
        setForm({ name: "", type: "class", duration: 2 });
        setShowNewEventModal(true);
    }

    // Si editEventId está presente, se edita, si no, se crea
    const [editEventId, setEditEventId] = useState<string | null>(null);

    function handleNewEventSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!newEventData) return;
        if (editEventId) {
            // Editar evento existente
            setEvents((prev) =>
                prev.map((ev) =>
                    ev.id === editEventId
                        ? {
                              ...ev,
                              ...form,
                              day: newEventData.day,
                              start: newEventData.start,
                              duration: form.duration,
                              type: (["class", "consultation", "telecommuting", "other"].includes(form.type)
                                  ? form.type
                                  : "class") as EventType["type"],
                          }
                        : ev
                )
            );
        } else {
            // Crear nuevo evento
            const newEvent: EventType = {
                id: Date.now().toString(),
                day: newEventData.day,
                start: newEventData.start,
                duration: form.duration,
                name: form.name || "Nuevo evento",
                type: form.type as EventType["type"],
            };
            if (
                !hasCollision(
                    events,
                    newEvent.day,
                    newEvent.start,
                    newEvent.duration,
                    newEvent.id
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
        const ev = events.find((e) => e.id === id);
        if (!ev) return;
        setEditEventId(id);
        setForm({ ...ev });
        setTimeout(() => {
            const el = document.querySelector(`[data-event-id='${id}']`);
            let modalHeight = 390;
            // Intentar obtener el alto real del modal si ya existe
            const modal = document.querySelector('form.bg-bgmain');
            if (modal) {
                modalHeight = (modal as HTMLElement).offsetHeight || modalHeight;
            }
            if (el) {
                const rect = el.getBoundingClientRect();
                // Usar la misma lógica de lado que en handleGridClick
                const dayIndex = ev.day;
                const side = dayIndex >= 3 ? rect.left - 405 : rect.right;
                const x = Math.min(side, window.innerWidth - 320);
                let y = rect.top;
                console.log("Modal height:", modalHeight, "Event top:", window.innerHeight );
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
        setEvents((prev) => prev.filter((ev) => ev.id !== id));
    }

    function handleDuplicateEvent(id: string) {
        setEvents((prev) => {
            const ev = prev.find((e) => e.id === id);
            if (!ev) return prev;
            // Buscar el siguiente hueco disponible en el mismo día
            let newStart = ev.start + ev.duration;
            while (
                prev.some(
                    (e) =>
                        e.day === ev.day &&
                        ((newStart >= e.start && newStart < e.start + e.duration) ||
                            (newStart + ev.duration > e.start && newStart + ev.duration <= e.start + e.duration))
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
                    id: Date.now().toString(),
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
        tempEvent, // nuevo
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
        days,
        startHour,
        endHour,
        intervalMinutes,
        intervalHeight,
        intervals,
    };
}
