import React, { useState, useRef, useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

export type EventType = {
    name: string;
    type: "consultation" | "class" | "telecommuting" | "other";
    id: string;
    day: number;
    start: number;
    duration: number;
    disabled?: boolean;
    temp?: boolean; // para distinguir el evento temporal
};

interface DraggableEventProps {
    event: EventType;
    onResize: (e: React.MouseEvent, delta: number) => void;
    onDelete: (id: string) => void;
    onDuplicate?: (id: string) => void;
    onEdit?: (id: string) => void;
}

const intervalHeight = 30;
const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const DraggableEvent: React.FC<DraggableEventProps> = ({
    event,
    onResize,
    onDelete,
    onDuplicate,
    onEdit,
}) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: event.id,
        });
    const [isResizing, setIsResizing] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!transform) {
            if (isResizing) {
                const timer = setTimeout(() => {
                    setIsResizing(false);
                }, 200);
                return () => clearTimeout(timer);
            }
        } else {
            if (!isResizing) {
                setIsResizing(true);
            }
        }
    }, [transform, isResizing]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        }

        if (isDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isDropdownOpen]);

    const style: React.CSSProperties = {
        top: event.start * intervalHeight,
        height: event.duration * intervalHeight,
        transition: isResizing ? "none" : "top 0.2s ease, height 0.2s ease",
        transform: transform ? CSS.Translate.toString(transform) : undefined,
        zIndex: isDragging || event.temp ? 51 : 50 - event.start,
    };

    return (
        <div
            ref={setNodeRef}
            data-event-id={event.id}
            style={style}
            {...listeners}
            {...attributes}
            className={`absolute left-[2.5%] w-[95%] ${
                event.type === "consultation"
                    ? "bg-primary/90"
                    : event.type === "class"
                    ? "bg-green-500/90"
                    : event.type === "telecommuting"
                    ? "bg-yellow-500/90"
                    : "bg-gray-500/90"
            } ${event.disabled && " pointer-events-none"} 
                
             rounded-md shadow-md cursor-grab flex flex-col justify-between`}
        >
            <div className="relative h-full ">
                <div className="justify-between flex pr-1">
                    <div className="text-xs font-bold flex items-center p-2 overflow-hidden">
                        <p className="line-clamp-1">{event.name}</p>
                    </div>
                    {!event.disabled && (
                        <div className="relative min-w-fit" ref={dropdownRef}>
                            <header className=" hidden">
                                Evento {event.id}
                            </header>
                            <button
                                onClick={(e) => onResize(e, -1)}
                                className=" text-white border-0 rounded font-bold text-sm w-6 h-6 cursor-pointer"
                            >
                                -
                            </button>
                            <button
                                onClick={(e) => onResize(e, 1)}
                                className=" text-white border-0 rounded font-bold text-sm w-6 h-6 cursor-pointer"
                            >
                                +
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDropdownOpen(!isDropdownOpen);
                                }}
                                className="text-white p-1 px-3 cursor-pointer"
                                tabIndex={0}
                                aria-haspopup="menu"
                                aria-expanded={isDropdownOpen}
                            >
                                ⋮
                            </button>
                            <div
                                className={`absolute right-0 top-6 z-40 bg-neutral-800 border-0 rounded shadow-md min-w-[100px] transition-all duration-500 ease-in-out overflow-hidden ${
                                    isDropdownOpen
                                        ? "h-[110px] opacity-100"
                                        : "h-0 opacity-0 "
                                }`}
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(event.id);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700"
                                >
                                    Eliminar
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (onEdit) onEdit(event.id);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (onDuplicate) onDuplicate(event.id);
                                        setIsDropdownOpen(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-neutral-700"
                                >
                                    Duplicar
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DraggableEvent;
